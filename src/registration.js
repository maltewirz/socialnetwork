import React from 'react';
import { Logo } from './logo';
import { Link } from 'react-router-dom';
import { useStatefulFields, useAuthSubmit } from './hooks';

export function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/register', values);

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
                name="password 8 char"
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
