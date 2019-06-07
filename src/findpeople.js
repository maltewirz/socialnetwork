import React, { useState, useEffect } from 'react';
import axios from './axios';

export function FindPeople() {
    useEffect(() => {
        (async () => {
            let { data } = await axios.get('/users/latest');
            console.log(data);
        })();
    });

    return (
        <div>Hello search </div>
        
    );
}
