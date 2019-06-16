import React from "react";
import { Link } from 'react-router-dom';

export class Logo extends React.Component {
    render() {
        return (
            <Link to="/">
                <img className="logoPng" src="../logo.png" />
            </Link>
        );
    }
}
