import React from "react";
import axios from "./axios";
import { Logo } from "./logo";
import { Uploader } from "./uploader";
import { Profile } from "./profile";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";
import { OtherProfile } from "./otherprofile";
import { BrowserRouter, Route } from 'react-router-dom';
import { FindPeople } from './findpeople';
import Friends from './friends';
import { Link } from 'react-router-dom';

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
            <BrowserRouter>
                <div>
                    <div className="header">
                        <Logo />
                        <Link to="/users"> Find people </Link>
                        <Link to="/friends">  Friends</Link>
                        <a href="/logout"> Logout </a>
                        <ProfilePic
                            imageUrl={this.state.pic_url}
                            first={this.state.first}
                            last={this.state.last}
                            clickHandler={() => this.setState({ uploaderVisible: true })}
                        />

                    </div>
                    <div className="content">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    profilePic={
                                        <ProfilePic
                                            imageUrl={this.state.pic_url}
                                            first={this.state.first}
                                            last={this.state.last}
                                            clickHandler={() => this.setState({ uploaderVisible: true })}
                                        />
                                    }
                                    bioEditor={
                                        <BioEditor
                                            bio={this.state.bio}
                                            bioVisible={this.state.bioVisible}
                                            setBio={bio => this.setState({
                                                bio: bio
                                            })}
                                        />
                                    }
                                />
                            )}
                        />
                        <Route path="/user/:id"
                            render={props => (
                                <div>
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        myId={this.state.id}
                                    />

                                </div>
                            )}
                        />
                        <Route path="/users" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                    </div>
                    <div className="uploader">
                        {this.state.uploaderVisible && <Uploader changeImage={img => this.setState({
                            pic_url: img,
                            uploaderVisible: false
                        })}/>}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
