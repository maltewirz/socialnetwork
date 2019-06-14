export function reducer(state = {}, action) {

    if (action.type == 'ADD_LIST_ANIMALS') {
        //here we tell reducer how to add list of animals to global state
        console.log("action: ", action);
        //spread operator (...)
        //Object.assign()
        return { ...state, listAnimals: action.listAnimals };
    }

    if (action.type == 'GET_LIST_FRIENDS_WANNABES') {
        return { ...state, listFriendsWannabes: action.listFriendsWannabes};
    }

    if (action.type == "ACCEPT_FRIEND") {
        console.log("action", action) ;
        console.log("state", state);
        return { ...state,
            listFriendsWannabes: state.listFriendsWannabes.map(
                person => {
                    if (person.id == action.otherId) {
                        return {
                            ...person, accepted : true};
                    } else {
                        return person;
                    }
                }
            )
        };
    }

    return state;
}
