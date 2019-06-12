import React, { useState, useEffect } from 'react';
import axios from './axios';

export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("Send Friend Request");
    let otherId = props.otherId;

    useEffect(() => {
        try {
            (async () => {
                if (otherId != undefined ) {
                    let { data } = await axios.get(`/getFriends/${otherId}`);
                    setButtonMsg(data.button);
                }
            })();
        } catch(err) {
            console.log("err in useEffect", err);
        }
    },[otherId]);

    function clickHandler(buttonMsg) {
        try {
            (async () => {
                if (buttonMsg != "") {
                    let { data } = await axios.post(`/changeFriendRelation`, {otherId, buttonMsg});
                    setButtonMsg(data.button);
                }
            })();
        } catch(err) {
            console.log("err in", err);
        }
    }

    return(
        <button onClick={e => clickHandler(buttonMsg, e)}>{buttonMsg}</button>
    );
}
