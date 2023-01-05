import { createStore } from 'vuex'

import apiRequest from './api-request.js'


const actions = { ...apiRequest }


let store = createStore({
    state: {
        users: [],
        userById: {},
        userEvents: [],
    },
    mutations: {
        SET_USERS_TO_STATE: (state, users) => {
            state.users = users;
        },

        SET_USER_ID_TO_STATE: (state, userById, urlId) => {
            state.userById = userById
            state.userEvents = userById.events
        },
    },
    actions,
    getters: {
        USERS(state) {
            return state.users;
        },

        USERBYID(state) {
            return state.userById;
        },

        USEREVENTS(state) {
            return state.userEvents;
        },
    },
});

export default store;