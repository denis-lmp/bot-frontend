import { createStore } from 'vuex'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:80/api'
axios.defaults.baseURL = 'https://testthat.xyz/api'

export default createStore({
    state: {
        user: null,
    },
    getters: {
        isLogged: state => !!state.user,
    },
    mutations: {
        setUserData (state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            localStorage.setItem('token', userData.token)
            axios.defaults.headers.common.Authorization = `Bearer ${userData.access_token}`
        },

        clearUserData () {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            axios.defaults.headers.common.Authorization = 'Bearer'
            location.reload()
        },
    },
    actions: {
        login ({ commit }, credentials) {
            return axios
                .post('/login', credentials)
                .then(({ data }) => {
                    commit('setUserData', data)
                })
        },

        logout ({ commit }) {
            commit('clearUserData')
        },
    },
    modules: {
    },
})
