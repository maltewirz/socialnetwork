import React from "react";
import axios from "./axios";
import { Logo } from "./logo";
import { ProfilePic } from "./profilepic";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
        });
    }
    render() {
        //when render is called only the diff will be rendered
        // if (!this.state.id) {
        //     return <img src="/spinner.gif"/>;
        // }
        return (
            <div>
                <Logo />
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={e => this.setState({ uploaderVisible: true })}
                />
            </div>
        );
    }
}
