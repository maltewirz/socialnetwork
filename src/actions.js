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
