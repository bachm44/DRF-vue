import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + 'auth/'

const state = {
    recaptchaResponse: false,
    isAuth: false,
    token: null,
}

const getters = {
    getCaptcha: (state) => state.recaptchaResponse,
    isAuthenticated: (state) => state.isAuth
}

const actions = {
    async recaptchaValidate({ commit }, token) {
        token = { "token": token }
        const response = await axios.post((API_URL + 'recaptcha/'), token)
        commit('setRecaptcha', response.data)
    },
    onRegister: ({ commit }, data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            axios.post('auth/users/', data)
                .then(({ data, status }) => {
                    if (status === 201) {
                        resolve(true)
                    }
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        reject(error.response.data)
                    }
                    else {
                        reject(error)
                    }
                })
        })
    },
    onLogin: ({ commit }, data) => {
        console.log(data)
        return new Promise((resolve, reject) => {
            axios.post('auth/jwt/create', data)
                .then(({ data, status }) => {
                    if (status === 200) {
                        console.log(data)
                        commit('setAuth', true)
                        commit('setToken', data.access_token)
                        resolve(true)
                    }
                })
                .catch(error => {
                    commit('setAuth', false)
                    reject(error)
                })
        })
    }
}

const mutations = {
    setRecaptcha: (state, response) => state.recaptchaResponse = response,
    setAuth: (state, response) => state.isAuth = response,
    setToken: (state, response) => state.token = response,
}

export default {
    state,
    getters,
    actions,
    mutations
}