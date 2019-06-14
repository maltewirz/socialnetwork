import React, { useEffect} from 'react';
import { Logo } from './logo';
import { Link } from 'react-router-dom';
import { useStatefulFields, useAuthSubmit, useEnterKeyforSubmitting} from './hooks';

export function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/login', values);

    useEffect(() => { // gives short term error message - fix
        window.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                submit();
            }
        });

        return () => {

        };
    });

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
