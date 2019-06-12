import React, { useState } from 'react';
import axios from './axios';
import { Logo } from './logo';
import { Link } from 'react-router-dom';
import { useStatefulFields, useAuthSubmit } from './hooks';


export function Login() {
    const [values, handleChange] = useStatefulFields();
    const [error, setError] = useState('');

    async function submit() {
        try {
            let { data } = await axios.post("/login", values);
            if (data.error) {
                setError("Something went wrong, please try again!");
            } else {
                location.href = "/";
            }
        } catch(err) {
            console.log("err in submit login", err);
        }
    }

    return (
        <div className="regWrapper">
            <h1> Welcome to Hackspace</h1>
            <div>
                <Logo />
            </div>
            <h2> Please Login</h2>
            <p> { error } </p>
            <input
                name="email"
                placeholder="email"
                onChange={handleChange}
            />
            <input
                name="password"
                placeholder="password"
                type="password"
                onChange={handleChange}
            />
            <button onClick={() => submit()}> Submit </button>
            <p>
                Not yet a member? <Link to="/"> Registration </Link>
            </p>
        </div>
    );

}
