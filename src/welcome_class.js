import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Login } from "./login";
import { Registration } from "./registration";


export class Welcome extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        );
    }
}
