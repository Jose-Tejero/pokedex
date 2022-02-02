import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import ashback from '../images/ashback.jpg'

const NameForm = () => {

    const [ name, setName ] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = e => {
        e.preventDefault();
        dispatch({type: 'SET_NAME', payload: name});
        navigate('/pokemons');
    }

    return (
        <section>
            <h1>¡Bienvenido, entrenador pokémon!</h1>
            <form action="">
                <label>
                    <p>Escribe un nombre para accesar:</p>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <button className='sing-in' onClick={submit} ><i className="fas fa-sign-in-alt"></i></button>
            </form>
            <img className='background-form' src={ashback} alt="" />
        </section>
    );
};

export default NameForm;