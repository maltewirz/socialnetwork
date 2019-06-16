import React, { useState, useEffect } from 'react';
import axios from './axios';
import { ProfilePic } from "./profilepic";
import { Link } from 'react-router-dom';

export function FindPeople() {
    const [users, setUsers] = useState([]);
    const [currentQuery, setCurrentQuery] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                let { data }  = await axios.get('/users/latest');
                setUsers(data);
            } catch(err) {
                console.log("err in axios.get('/users/latest'", err);
            }
        })();
    },[]);

    useEffect(() => {
        (async () => {
            try {
                let { data } = await axios.post(`/users/search/`,{currentQuery});
                if (data.error) {
                    setError("No results");
                    setUsers(data);
                } else {
                    setError("");
                    setUsers(data);
                }
            } catch(err) {
                console.log("err in xios.post(`/users/search/`,{currentQuery})", err);
            }
        })();
    }, [currentQuery]);

    return (
        <div>
            <h1> Find people </h1>
            <input type="text" className="button" onChange={e => setCurrentQuery(e.target.value)}/>
            <h3>{currentQuery.length==0 && "Latest Users"} {currentQuery.length > 0 && "Search Results"}</h3>
            <p>{ error }</p>
            { users.length && users.map(  //users.length is important so that this runs when users has an actual length (bigger than empty arr)
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
                            <Link to={"/user/"+user.id}>
                                <div className="profileNameBox"> { user.first } { user.last }</div>
                                <div>{ user.bio } </div>
                            </Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
