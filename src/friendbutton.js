import React, { useState, useEffect } from 'react';
import axios from './axios';


export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("");
    const [post, setPost] = useState("");
    let otherId = props.otherId;
    console.log("otherId in global", otherId);

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
                console.log("only now");
                await axios.post(`/addFriendRelation`, {otherId, post});
            }
        })();
    });

    function clickHandler(buttonMsg){
        setPost(buttonMsg);
    }

    return(
        <button onClick={e => clickHandler(buttonMsg)}>{buttonMsg}</button>
    );
}
