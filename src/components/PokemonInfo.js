import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PokemonInfo = ({ url, page }) => {

    const [ pokemon, setPokemon ] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data));
    },[url]);

    dispatch({type: 'HOLD_PAGE', payload: page});

    return (
        <Link to={`/pokemons/${pokemon.id}`}>
            <div className='pokemon-card'>
                <img src={pokemon.sprites?.other?.dream_world?.front_default} alt="" />
                <p>{pokemon.name}</p>
            </div>
        </Link>
    );
};

export default PokemonInfo;