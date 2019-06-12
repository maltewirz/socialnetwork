import React from "react";
import axios from "./axios";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export class Registration extends React.Component {
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
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.userId) {
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
            <div className="regWrapper">
                <h1> Welcome to Hackspace</h1>
                <div>
                    <Logo />
                </div>
                <h2> Join the rebellion! </h2>
                <p> {this.state.error} </p>
                <input
                    name="first"
                    placeholder="first"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="pass"
                    placeholder="pass"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>submit</button>
                <p>
                    Already a member? <Link to="/login"> Login </Link>
                </p>
            </div>
        );
    }
}
