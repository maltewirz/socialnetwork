import React, { useState, useEffect } from 'react';
import axios from "./axios";
import { FriendButton } from './friendbutton';

export function OtherProfile(props) {
    const [error, setError] = useState("");
    const [state, setState] = useState({});

    useEffect(() => {
        (async () => {
            let otherId = props.match.params.id;
            try {
                let { data } = await axios.get(`/otherUser/${otherId}`);
                if (data.error) {
                    setError("Profile does not exist - 404");
                }
                if (data.sameUser) {
                    props.history.push('/');
                } else {
                    setState({
                        bio: data.bio,
                        first: data.first,
                        last: data.last,
                        pic_url: data.pic_url,
                        id: data.id
                    });
                }
            } catch(err) {
                console.log("err in OtherProfile", err);
            }
        })();
    }, []);


    return (
        <div>
            <h1> People Profile Viewer </h1>
            {error}
            {!error  &&
                <div className="profileBox">
                    <div>
                        <img src={state.pic_url} />
                    </div>
                    <div className="profileBoxBio">
                        <div className="profileNameBox">{state.first} {state.last}</div>
                        <div> {state.bio} </div>
                        <FriendButton
                            myId={props.myId}
                            otherId={state.id}
                        />
                    </div>
                </div>
            }
        </div>
    );
}
