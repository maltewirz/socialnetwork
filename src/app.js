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
    async componentDidMount() {
        try {
            let { data } = await axios.get("/user");
            this.setState(data);
        } catch(err) {
            console.log("err in axios get /user", err);
        }
    }
    render() {
        if (!this.state.id) {
            return <img src="/spinner.gif"/>;
        }
        return (
            <div>
                <div className="header">
                    <Logo />
                    <ProfilePic
                        imageUrl={this.state.pic_url}
                        first={this.state.first}
                        last={this.state.last}
                        clickHandler={e => this.setState({ uploaderVisible: true })}
                    />
                </div>
                <div className="uploader">
                    {this.state.uploaderVisible && <Uploader changeImage={img => this.setState({
                        pic_url: img,
                        uploaderVisible: false
                    })}/>}
                </div>
            </div>
        );
    }
}
