import React from 'react';
import axios from 'axios';


export class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange({ target }) {
        this[target.name] = target.value;
    }

    submit() {
        axios.post("/register", {
            first: this.state.first,
            last: this.state.last
        }).then(
            ({data}) => {
                if (data.success) {
                    location.href = "/";
                } else {
                    this.setState({
                        error: true
                    })
                }
            }
        )
    }

    render() {
        return (
            <div>
                <h1> Welcome to Munity </h1>
                <img src="./logo.png" />
                <p> Join the rebellion! </p>
                <input className="first" onChange={e => this.handleChange(e)
                } />
                <input name="last" />
                <input name="email" />
                <input name="pass" />
                <button onClick={e => this.submit()}>submit</button>
                <a href="#"> Login </a>
            </div>
        )
    }
}
