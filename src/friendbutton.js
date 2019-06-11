import React, { useState, useEffect } from 'react';
import axios from './axios';


export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("");
    const [post, setPost] = useState("");
    // console.log("props in FriendButton",props.myId, props.otherId);
    let otherId = props.otherId;
    console.log("post", post);

    useEffect(() => {
        (async () => {
            console.log("before if ", otherId);
            if (otherId != undefined ) {
                console.log("i'm here");
                let { data } = await axios.get(`/getFriends/${otherId}`);
                setButtonMsg(data.button);
            }
        })();
    },[otherId]);

    function clickHandler(buttonMsg){
        setPost(buttonMsg);

    }

    return(
        <button onClick={e => clickHandler(buttonMsg)}>{buttonMsg}</button>
    );
}
