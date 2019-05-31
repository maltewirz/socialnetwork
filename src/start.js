import React from 'react';
import ReactDOM from 'react-dom';
import {Hello} from "./hello";
import {Welcome} from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />
} else {
    elem = <img src="logo.gif" />
}

ReactDOM.render(
    <Hello />,
    document.querySelector('main')
);
