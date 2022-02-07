import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import PokemonInfo from './PokemonInfo';

const PokemonsList = () => {

    const name = useSelector(state => state.name);
    const actualPage = useSelector(state => state.page);
    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ pokemonSearched, setPokemonSearched ] = useState('');
    const [check, setCheck] = useState(false);
    const [ page, setPage ] = useState(actualPage);
    const [ pokemonPerPage, setPokemonPerPage ] = useState(8);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0')
            .then(res => setPokemons(res.data.results));
    },[]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setTypes(res.data.results));
    },[]);

    const filterTypes = i => {
        const found = types[i];
        axios.get(found.url)
            .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)));
    }

    const search = e => {
        e.preventDefault();
        if (paginatedPokemons.length === 1) {
            console.log(paginatedPokemons)
            navigate(`/pokemons/${paginatedPokemons[0].name}`)
        }
    };

    /* const filterPokemons = pokemons.filter(pokemon => pokemon.name === pokemonSearched); */
    
    const letterPokemons = pokemons.filter(e => {
        return (e.name.includes(pokemonSearched));
    });

    const lastPokemonIndex = page * pokemonPerPage;
    const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
    
    const paginatedPokemons = letterPokemons.slice(firstPokemonIndex, lastPokemonIndex);
    
    const totalPages = Math.ceil(letterPokemons.length / pokemonPerPage);

    return (
        <div className='grid-cards' >
            <h1>¡Hola {name}!</h1>
            <p>Todos los pokémon</p>
            <label>
                Pokémon por página:
                <input className='per-page' type="text" onChange={e => setPokemonPerPage(e.target.value)} />
            </label>
            <div className="center">
                <input type="checkbox" onChange={e => setCheck(e.target.checked)} />
            </div>
            {
                check ? (
                    <select
                        defaultValue={'Por tipo'}
                        onChange={e => {filterTypes(e.target.value); setPage(1)}}
                    >
                        <option value='Por tipo' disabled >Por tipo</option>
                        {
                            types.map((type, i) => (
                                <option key={i} value={i}>{type.name}</option>
                            ))
                        }
                    </select>
                ) : (
                    <form className='form-search'>
                        <input
                            placeholder='Por nombre'
                            className='input-name-pokemon'
                            type="text"
                            value={pokemonSearched}
                            onChange={e => setPokemonSearched(e.target.value)}
                        />
                        <button onClick={search} className='ir-button sing-in'></button>
                    </form>
                )
            }
            <div className="buttons-pag">
                {
                    page !== 1 ? (<button onClick={() => setPage(page - 1)} >Prev</button>) : (<button>Prev</button>) 
                }
                <p>{page}/{totalPages}</p>
                {
                    page !== totalPages ? (<button onClick={() => setPage(page + 1)}>Next</button>) : (<button>Next</button>)
                }
            </div>
            <ul className='pokemons-list' >
                {
                    paginatedPokemons.length ? (
                        paginatedPokemons.map(pokemon => (
                            <li key={pokemon.url} className='pokemon-column' >
                                <PokemonInfo url={pokemon.url} page={page}/>
                            </li>
                        ))
                    ) : (<div>No existe el pokemon</div>)
                }
            </ul>
        </div>
    );
};

export default PokemonsList;