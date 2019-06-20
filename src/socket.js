import * as io from "socket.io-client";
import { chatMessages, chatMessage, usersOnline, privateMessage, loadPrivateMessages } from './actions';

export let socket;

export function initSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));

        socket.on("usersOnline", users => {
            store.dispatch(usersOnline(users));
        });

        socket.on("privateMessage", msg => {
            store.dispatch(privateMessage(msg));
        });

        socket.on("loadPrivateMessages", msgs => {
            store.dispatch(loadPrivateMessages(msgs));
        });

    }
    return socket;
}
