import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonInfo = ({ url }) => {

    const [ pokemon, setPokemon ] = useState({});

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data));
    },[url])

    return (
        <div>
            <Link to={`/pokemons/${pokemon.id}`} className='pokemon-card' >
                <img src={pokemon.sprites?.other?.dream_world?.front_default} alt="" />
                <p>{pokemon.name}</p>
            </Link>
        </div>
    );
};

export default PokemonInfo;