import React, { useState, useEffect } from 'react';
import axios from './axios';
import { ProfilePic } from "./profilepic";

export function FindPeople() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        (async () => {
            let { data }  = await axios.get('/users/latest');
            setUsers(data);
        })();
    },[]);

    return (
        <div> Hello search
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
