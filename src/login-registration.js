import React from "react";
import axios from "./axios"; // ./axios for CSURF support
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export const Login = wrapinAuthForm(LoginForm, "/login");
export const Registration = wrapinAuthForm(RegistrationForm, "/register");

function wrapinAuthForm(Component, url) {
    return class AuthForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.url = url;
        }
        handleInput({ target }) {
            this.setState({
                [target.name]: target.value
            });
        }
        handleSubmit(e) {
            axios
                .post(this.url, {
                    first: this.state.first,
                    last: this.state.last,
                    email: this.state.email,
                    pass: this.state.pass
                })
                .then(({ data }) => {
                    if (!data.error) {
                        location.href = "/";
                    } else if (data.error) {
                        this.setState({
                            error: "Something went wrong, please try again!"
                        });
                    }
                });
        }
        render() {
            return (
                <Component
                    error={this.state.error}
                    handleInput={e => this.handleInput(e)}
                    handleSubmit={e => this.handleSubmit(e)}
                />
            );
        }
    };
}

function LoginForm({ handleInput, handleSubmit, error }) {
    return (
        <div className="regWrapper">
            <h1> Welcome to Hackspace</h1>
            <div>
                <Logo />
            </div>
            <h2> Please Login</h2>
            <p> {error} </p>
            <input
                name="email"
                placeholder="email"
                onChange={e => handleInput(e)}
            />
            <input
                name="pass"
                placeholder="password"
                type="password"
                onChange={e => handleInput(e)}
            />
            <button className="button" onClick={e => handleSubmit(e)}> submit</button>
            <p>
                Not yet a member? <Link to="/"> Registration </Link>
            </p>
        </div>
    );
}

function RegistrationForm({ handleInput, handleSubmit, error }) {
    return (
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
                onChange={e => handleInput(e)}
            />
            <input
                name="last"
                placeholder="last"
                onChange={e => handleInput(e)}
            />
            <input
                name="email"
                placeholder="email"
                onChange={e => handleInput(e)}
            />
            <input
                name="pass"
                placeholder="pass"
                type="password"
                onChange={e => handleInput(e)}
            />
            <button className="button" onClick={e => handleSubmit(e)}>submit</button>
            <p>
                Already a member? <Link to="/login"> Login </Link>
            </p>
        </div>
    );
}
