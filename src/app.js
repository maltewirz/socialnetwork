import React, { useEffect, useState } from "react";
import axios from "./axios";
import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Logo } from "./logo";
import { Uploader } from "./uploader";
import { Profile } from "./profile";
import { ProfilePic } from "./profilepic";
import { BioEditor } from "./bioeditor";
import { OtherProfile } from "./otherprofile";
import { FindPeople } from './findpeople';
import Friends from './friends';


export function App() {
    const [state, setState] = useState({});

    useEffect(() => {
        let abort;
        (async () => {
            try {
                let { data } = await axios.get("/user");
                if (!abort) {
                    setState(data);
                }
            } catch(err) {
                console.log("err in axios get /user", err);
            }
        })();
        return () => {
            abort = true;
        };
    },[]);


    if (!state.id) {
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
                        imageUrl={state.pic_url}
                        first={state.first}
                        last={state.last}
                        clickHandler={() => setState({ uploaderVisible: true })}
                    />

                </div>
                <div className="content">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={state.first}
                                last={state.last}
                                profilePic={
                                    <ProfilePic
                                        imageUrl={state.pic_url}
                                        first={state.first}
                                        last={state.last}
                                        clickHandler={() => setState({ uploaderVisible: true })}
                                    />
                                }
                                bioEditor={
                                    <BioEditor
                                        bio={state.bio}
                                        bioVisible={state.bioVisible}
                                        setBio={bio => setState({
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
                                    myId={state.id}
                                />
                            </div>
                        )}
                    />
                    <Route path="/users" component={FindPeople} />
                    <Route path="/friends" component={Friends} />
                </div>
                <div className="uploader">
                    {state.uploaderVisible &&
                        <Uploader
                            changeImage={img => setState({
                                pic_url: img,
                                uploaderVisible: false
                            })}
                            closeModal={() => setState({
                                uploaderVisible: false
                            })}
                        />}
                </div>
            </div>
        </BrowserRouter>
    );
}
