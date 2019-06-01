import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {Registration} from "./registration";


export class Welcome extends React.Component {
    render() {
        return (
            <div>
                <Registration />
            </div>
        )
    }
}
