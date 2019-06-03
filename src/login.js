import React from "react";
import axios from "./axios";

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
                password: this.state.password
            })
            .then(resp => {
                if (resp.data.error) {
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
                <h1> Please Login</h1>
                <p> {this.state.error} </p>
                <input
                    name="email"
                    placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.submit()}> submit</button>
            </div>
        );
    }
}
