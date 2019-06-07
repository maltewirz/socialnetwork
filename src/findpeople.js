import React, { useState, useEffect } from 'react';
import axios from './axios';
import { ProfilePic } from "./profilepic";

export function FindPeople() {
    const [users, setUsers] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("");
    useEffect(() => {
        (async () => {
            let { data }  = await axios.get('/users/latest');
            setUsers(data);
        })();

    },[]); //this is not rerunning when empty arrray, or in this case a different currentQuery.

    useEffect(() => {
        (async () => {
            let { data } = await axios.post(`/users/search/`,{currentQuery});
            console.log("data", data);
            setUsers(data);
        })();
    },[currentQuery]);

    return (
        <div>
            <h1> Find people </h1>
            <input type="text" name="search" onChange={e => setCurrentQuery(e.target.value)}/>
            { users.length && users.map(  //users.length is important  so that this runs when users has an actual length (bigger than empty arr)
                user => (
                    <div key={user.id} className="profileBox">
                        <div>
                            <ProfilePic
                                imageUrl={user.pic_url}
                                first={user.first}
                                last={user.last}
                            />
                        </div>
                        <div className="profileBoxBio">
                            <div className="profileNameBox"> { user.first } { user.last }</div>
                            <div>{ user.bio } </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
