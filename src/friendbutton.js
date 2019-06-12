import React, { useState, useEffect } from 'react';
import axios from './axios';


export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("");
    let otherId = props.otherId;

    useEffect(() => {
        (async () => {
            if (otherId != undefined ) {
                let { data } = await axios.get(`/getFriends/${otherId}`);
                setButtonMsg(data.button);
            }
        })();
    },[otherId]);



    function clickHandler(buttonMsg){
        (async () => {
            if (buttonMsg != "") {
                let { data } = await axios.post(`/addFriendRelation`, {otherId, buttonMsg});
                setButtonMsg(data.button);
            }
        })();
    }

    return(
        <button onClick={e => clickHandler(buttonMsg)}>{buttonMsg}</button>
    );
}
