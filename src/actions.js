import axios from './axios';

// all ajax requests will go in this file
export function getListOfAnimals() {
    return axios.get('/get-list-animals').then(({data}) => {
        console.log("data in get list animals", data);
        return {
            type: "ADD_LIST_ANIMALS",
            listAnimals: data
        };
    });
}

export async function getFriendsWannabes() {
    let { data } = await axios.get('/friends-wannabes');
    console.log(data);
    return {
        type: "GET_LIST_FRIENDS_WANNABES",
        listFriendsWannabes: data
    };
}

export async function acceptFriend(otherId) {
    let buttonMsg = "Accept Friend Request";
    await axios.post("/changeFriendRelation", {otherId, buttonMsg});
    return {
        type: "GET_LIST_FRIENDS_WANNABES",
        listFriendsWannabes: tbd
    }
}
