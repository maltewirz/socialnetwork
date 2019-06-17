import React from "react";
import ReactDOM from "react-dom";
import * as io from 'socket.io-client';
import { Welcome } from "./welcome";
import { App } from "./app";
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducers';
import { Provider } from 'react-redux';

const socket = io.connect();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store = { store }>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
