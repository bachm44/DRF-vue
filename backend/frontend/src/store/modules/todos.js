import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL + 'todo/'

const state = {
    todos: []
}

const getters = {
    allTodos: (state) => state.todos
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get(API_URL)
        commit('setTodos', response.data)
    },
    async addTodo( { commit }, title) {
        const response = await axios.post(API_URL, { text: title })
        commit('newTodo', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(API_URL + `${id}/`)
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        const response = await axios.get(API_URL)
        commit('setTodos', response.data.results.slice(0, e))
    },
    async updateTodo({ commit }, toUpdate) {
        const response = await axios.post(API_URL, toUpdate)
        commit('updTodo', response.data)
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.push(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    updTodo: (state, toUpdate) => {
        const index = state.todos.findIndex(todo => todo.id === toUpdate.id)
        if(index !== -1) {
            state.todos.splice(index, 1, toUpdate)
        }
    }
} 

export default {
    state,
    getters,
    actions,
    mutations
}