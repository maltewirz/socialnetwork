export function reducer(state = {}, action) {

    if (action.type == 'ADD_LIST_ANIMALS') {
        //here we tell reducer how to add list of animals to global state
        console.log("action: ", action);
        //spread operator (...)
        //Object.assign()
        return { ...state, listAnimals: action.listAnimals };
    }
    console.log("state", state);
    return state;
}
