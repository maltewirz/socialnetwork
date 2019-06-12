import React, { useState } from 'react';
import axios from './axios';
import { Logo } from './logo';
import { Link } from 'react-router-dom';

export function Registration() {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function submit() {
        try {
            let { data } = await axios.post("/register", {
                first, last, email, password
            });
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
                onChange={e => setFirst(e.target.value)}
            />
            <input
                name="last"
                placeholder="last"
                onChange={e => setLast(e.target.value)}
            />
            <input
                name="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                name="password"
                placeholder="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={() => submit()}> Submit </button>
            <p>
                Already a member? <Link to="/login"> Login </Link>
            </p>
        </div>
    );
}
