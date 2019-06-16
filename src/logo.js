import React from "react";
import { Link } from 'react-router-dom';

export function Logo() {
    return (
        <Link to="/">
            <img className="logoPng" src="../logo.png" />
        </Link>
    );
}
