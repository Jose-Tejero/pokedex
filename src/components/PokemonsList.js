import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import PokemonInfo from './PokemonInfo';

const PokemonsList = () => {

    const name = useSelector(state => state.name);
    const [ pokemons, setPokemons ] = useState([]);
    const [ types, setTypes ] = useState([]);
    const [ pokemonSearched, setPokemonSearched ] = useState('');
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

    const search = () => navigate(`/pokemons/${pokemonSearched}`)

    return (
        <div className='grid-cards' >
            <h1>¡Hola {name}!</h1>
            <p>Todos los pokémon</p>
            <select defaultValue={'Por tipo'} onChange={e => filterTypes(e.target.value)} >
                <option value='Por tipo' disabled >Por tipo</option>
                {
                    types.map((type, i) => (
                        <option key={i} value={i}>{type.name}</option>
                    ))
                }
            </select>
            <input type="text" value={pokemonSearched} onChange={e => setPokemonSearched(e.target.value)} />
            <button onClick={search} >Submit</button>
            <ul className='pokemons-list' >
                {
                    pokemons.map(pokemon => (
                        <li key={pokemon.url} className='pokemon-column' >
                            <PokemonInfo url={pokemon.url} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default PokemonsList;