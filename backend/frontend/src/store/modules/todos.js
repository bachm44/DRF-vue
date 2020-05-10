import axios from 'axios'

const API_URL = 'http://localhost:8000/api/todo/'

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
    }
}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.push(todo)
} 

export default {
    state,
    getters,
    actions,
    mutations
}

/*
getTodo(pk){
        const url = `${API_URL}/api/todo/${pk}`
        return axios.get(url)
    }
    getTodos(){
        const url = `${API_URL}/api/todo/`
        return axios.get(url)
    }
    createTodo(todo){
        const url = `${API_URL}/api/todo/`
        return axios.post(url, todo)
    }
    updateTodo(todo){
        const url = `${API_URL}/api/todo/${todo.id}/`
        return axios.put(url, todo)
    }
    deleteTodo(todo){
        const url = `${API_URL}/api/todo/${todo.id}/`
        return axios.delete(url)
    }
*/