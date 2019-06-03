import React from "react";
import axios from "./axios"; // changed to ./axios for CSURF support
import { Logo } from "./logo";

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
                    console.log("hasId", data.userId);
                    location.href = "/";
                } else if (data.error) {
                    console.log("hasNoId");
                    this.setState({
                        error: "Oops! Something went wrong, please try again!"
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
                <p> Join the rebellion! </p>

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
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={e => this.submit()}>submit</button>
                <p>
                    Already a member? <a href="#"> Login </a>
                </p>
            </div>
        );
    }
}
