import React, { useState } from 'react';
import axios from './axios';

export function useStatefulFields() {
    const [values, setValues] = useState({});

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };
    return [values, handleChange];
}

export function useAuthSubmit(url, values) {
    const [error, setError] = useState('');

    const submit = async () => {
        try {
            let { data } = await axios.post(url, values);
            if (data.error) {
                setError("Something went wrong, please try again!");
            } else {
                location.href = "/";
            }
        } catch(err) {
            console.log("err in submit Registration", err);
        }
    };
    return [submit, error];
}
