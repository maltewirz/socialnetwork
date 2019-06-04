import React from "react";
import axios from "./axios";
import { Logo } from "./logo";
import { ProfilePic } from "./profilepic";
import { Uploader } from "./uploader";

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
        if (!this.state.id) { //is this correct?
            <img src="/spinner.gif"/>;
        }
        return (
            <div>
                <Logo />
                <ProfilePic
                    imageUrl={this.state.imageUrl}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={e => this.setState({ uploaderVisible: true })}
                />
                <Uploader />
            </div>
        );
    }
}
