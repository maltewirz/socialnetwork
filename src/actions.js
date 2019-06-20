import axios from './axios';

export async function getFriendsWannabes() {
    let { data } = await axios.get('/friends-wannabes');
    return {
        type: "GET_LIST_FRIENDS_WANNABES",
        listFriendsWannabes: data
    };
}

export async function acceptFriend(otherId) {
    let buttonMsg = "Accept Friend Request";
    await axios.post("/changeFriendRelation", {otherId, buttonMsg});
    return {
        type: "ACCEPT_FRIEND",
        otherId: otherId
    };
}

export async function endFriend(otherId) {
    let buttonMsg = "Unfriend";
    await axios.post("/changeFriendRelation", {otherId, buttonMsg});
    return {
        type: "END_FRIEND",
        otherId: otherId
    };
}

export async function chatMessages(msgs) {
    return {
        type: "GET_CHAT_MESSAGES",
        chatMessages: msgs
    };
}

export async function chatMessage(msg) {
    return {
        type: "ADD_CHAT_MESSAGE",
        chatMessage: msg
    };
}

export async function usersOnline(users) {
    console.log("getting usersOnline");
    return {
        type: "USERS_ONLINE",
        usersOnline: users
    };
}

export async function privateMessage(msg) {
    return {
        type: "ADD_PRIVATE_MESSAGE",
        privateChatMessage: msg

    };
}

export async function loadPrivateMessages(msgs) {
    return {
        type: "LOAD_PRIVATE_MESSAGES",
        privateMessages: msgs
    };
}
