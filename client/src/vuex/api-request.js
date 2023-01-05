import axios from "axios";
const URL = 'http://localhost:3020/api/users/'

export default {
    GET_USERS_FROM_API({ commit }) {
        return axios(URL, {
            method: "GET"
        })
            .then((users) => {
                commit('SET_USERS_TO_STATE', users.data);
                return users;
            })
            .catch((error) => {
                console.log(error)
                return error;
            })
    },

    GET_USER_ID_FROM_API({ commit }, urlId) {

        return axios(URL + urlId, {
            method: "GET"
        })
            .then((user) => {
                commit('SET_USER_ID_TO_STATE', user.data);
                return user;
            })
            .catch((error) => {
                console.log(error)
                return error;
            })
    },
}