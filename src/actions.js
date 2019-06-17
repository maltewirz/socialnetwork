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

export async function chatMessages() {
    let { data } = await axios.get("/chatMessages");
    return {
        type: "GET_CHAT_MESSAGES",
        chatMessages: data
    };
}
