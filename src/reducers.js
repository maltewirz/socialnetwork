export function reducer(state = {}, action) {

    if (action.type == 'GET_LIST_FRIENDS_WANNABES') {
        return { ...state, listFriendsWannabes: action.listFriendsWannabes};
    }

    if (action.type == "ACCEPT_FRIEND") {
        return { ...state,
            listFriendsWannabes: state.listFriendsWannabes.map(
                person => {
                    if (person.id == action.otherId) {
                        return {
                            ...person, accepted: true}; // copies person object, take accept prop of obj and sets to true
                    } else {
                        return person;
                    }
                }
            )
        };
    }

    if (action.type == "END_FRIEND") {
        return { ...state,
            listFriendsWannabes: state.listFriendsWannabes.filter(
                person => !(person.id == action.otherId)
            )
        };
    }

    if (action.type == "GET_CHAT_MESSAGES") {
        return {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type == "ADD_CHAT_MESSAGE") {
        return {
            ...state,
            chatMessages: state.chatMessages.concat(action.chatMessage)
        };
    }

    if (action.type == "USERS_ONLINE") {
        return {
            ...state,
            usersOnline: action.usersOnline
        };
    }

    if (action.type == "ADD_PRIVATE_MESSAGE") {
        if (state.privateChatMessages == undefined) {
            return {
                ...state,
                privateChatMessages: [action.privateChatMessage]
            };
        } else {
            return {
                ...state,
                privateChatMessages: state.privateChatMessages.concat(action.privateChatMessage)
            };
        }
    }

    if (action.type == "LOAD_PRIVATE_MESSAGES") {
        return {
            ...state,
            privateChatMessages: action.privateMessages
        };
    }

    return state;
}
