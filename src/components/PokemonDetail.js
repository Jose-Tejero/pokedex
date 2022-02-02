import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {

    const { id } = useParams();
    const [ pokemon, setPokemon ] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => setPokemon(res.data));
    },[id])

    return (
        <section>
            <h1>PokemonDetail</h1>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites?.other?.dream_world?.front_default} alt="Pokémon desconocido" />
        </section>
    );
};

export default PokemonDetail;