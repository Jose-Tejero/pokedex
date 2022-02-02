import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonInfo from './PokemonInfo';

const PokemonsList = () => {

    const name = useSelector(state => state.name);
    const [ pokemons, setPokemons ] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0')
            .then(res => setPokemons(res.data.results));
    },[])

    return (
        <div className='grid-cards' >
            <h1>¡Hola {name}!</h1>
            <p>Todos los pokémon</p>
            <input
                type="text"
            />
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