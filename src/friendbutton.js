import React, { useState, useEffect } from 'react';
import axios from './axios';


export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("");
    const [post, setPost] = useState("");
    let otherId = props.otherId;

    useEffect(() => {
        (async () => {
            if (otherId != undefined ) {
                let { data } = await axios.get(`/getFriends/${otherId}`);
                setButtonMsg(data.button);
            }
        })();
    });

    useEffect(() => {
        (async () => {
            if (post != "") {
                let { data } = await axios.post(`/addFriendRelation`, {otherId, post});
                console.log("data from resp", data);
                setButtonMsg(data.button);
            }
        })();
    },[buttonMsg]);

    function clickHandler(buttonMsg){
        setPost(buttonMsg);
    }

    return(
        <button onClick={e => clickHandler(buttonMsg)}>{buttonMsg}</button>
    );
}
