import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + 'auth/'

const state = {
    recaptchaResponse: false
}

const getters = {
    getCaptcha: (state) => state.recaptchaResponse
}

const actions = {
    async recaptchaValidate({ commit }, token) {
        token = {"token": token}
        const response = await axios.post((API_URL + 'recaptcha/'), token)
        commit('setRecaptcha', response.data)
    }
}

const mutations = {
    setRecaptcha: (state, response) => state.recaptchaResponse = response
} 

export default {
    state,
    getters,
    actions,
    mutations
}