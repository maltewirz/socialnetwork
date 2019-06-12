import React from "react";
import axios from "./axios";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.error) {
                    this.setState({
                        error: "Something went wrong, please try again!"
                    });
                } else {
                    location.href = "/";
                }
            });
    }

    render() {
        return (
            <div className="regWrapper">
                <h1> Welcome to Hackspace</h1>
                <div>
                    <Logo />
                </div>
                <h2> Please Login</h2>
                <p> {this.state.error} </p>
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="pass"
                    placeholder="password"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}> submit</button>
                <p>
                    Not yet a member? <Link to="/"> Registration </Link>
                </p>
            </div>
        );
    }
}
