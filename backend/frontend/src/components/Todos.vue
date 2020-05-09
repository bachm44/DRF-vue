<template>
  <v-container>
    <AddTodo v-on:add-todo="addTodo"/>
    <div v-for="todo in todos" v-bind:key="todo.id">
        <Todo v-bind:todo="todo" v-on:del-todo="deleteTodo" v-on:update-todo="updateTodo(todo)"/>
    </div>
  </v-container>
</template>

<script>
    import Todo from './Todo.vue'
    import AddTodo from './AddTodo.vue'
    import {APIService} from '../APIService'
    
    const apiService = new APIService();
    
    export default {
        name: "Todos",
        data: () => ({
            todos: []
        }),
        components: {
            Todo,
            AddTodo,
        },
        methods: {
            deleteTodo(toDelete){
                apiService.deleteTodo(toDelete)
                this.todos = this.todos.filter(todo => todo.id !== toDelete.id)
            },
            getTodos(){
                apiService.getTodos()
                .then(resp => {
                    this.todos = resp.data
                    console.log(this.todos)
                })
                .catch(err => console.log(err))
            },
            addTodo(todo) {
                apiService.createTodo(todo)
                .then(resp => {
                    this.todos = [...this.todos, resp.data]
                    })
                .catch(err => console.log(err))
            },
            updateTodo(todo) {
                apiService.updateTodo(todo)
            }
        },
        created(){
            this.getTodos()
        }
    }
</script>
