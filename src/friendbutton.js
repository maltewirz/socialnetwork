import React, { useState, useEffect } from 'react';
import axios from './axios';


export function FriendButton(props) {
    const [buttonMsg, setButtonMsg] = useState("");
    // console.log("props in FriendButton",props.myId, props.otherId);
    let otherId = props.otherId;

    useEffect(() => {
        (async () => {
            if (otherId != undefined) {
                let { data } = await axios.get(`/getFriends/${otherId}`);
                console.log(data);
                setButtonMsg(data.button);
            }
        })();
    });

    return(
        <button className="friendReq">{buttonMsg}</button>
    );
}
