import axios from 'axios'

const API_URL = 'http://localhost:8000'

export class APIService {
    constructor(){

    }
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
}