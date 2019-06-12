import React, { useState } from 'react';
import axios from './axios';
import { Logo } from './logo';
import { Link } from 'react-router-dom';
import { useStatefulFields } from './hooks';

export function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, setError] = useState('');

    async function submit() {
        try {
            let { data } = await axios.post("/register", {values});
            if (data.error) {
                setError("Something went wrong, please try again!");
            } else {
                location.href = "/";
            }
        } catch(err) {
            console.log("err in submit Registration", err);
        }
    }

    return(
        <div className="regWrapper">
            <h1> Welcome to Hackspace</h1>
            <div>
                <Logo />
            </div>
            <h2> Join the rebellion! </h2>
            <p> {error} </p>
            <input
                name="first"
                placeholder="first"
                onChange={handleChange}
            />
            <input
                name="last"
                placeholder="last"
                onChange={handleChange}
            />
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
                Already a member? <Link to="/login"> Login </Link>
            </p>
        </div>
    );
}
