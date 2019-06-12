import React, { useState, useEffect } from 'react';
import axios from './axios';


export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("");
    // const [post, setPost] = useState("");
    let otherId = props.otherId;

    useEffect(() => {
        (async () => {
            if (otherId != undefined ) {
                let { data } = await axios.get(`/getFriends/${otherId}`);
                console.log("data button in front",data.button);
                setButtonMsg(data.button);
            }
        })();
    },[otherId]);



    function clickHandler(buttonMsg){
        // setPost(buttonMsg);
        (async () => {
            console.log(buttonMsg);
            if (buttonMsg != "") {
                let { data } = await axios.post(`/addFriendRelation`, {otherId, buttonMsg});
                console.log("data from resp", data);
                setButtonMsg(data.button);
            }
        })();
    }

    return(
        <button onClick={e => clickHandler(buttonMsg)}>{buttonMsg}</button>
    );
}
