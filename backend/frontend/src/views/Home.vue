<template>
  <v-container>
    <Header />
    <AddTodo v-on:add-todo="addTodo(todo)"/>
    <div v-for="todo in todos" v-bind:key="todo.id">
        <Todo v-bind:todo="todo" v-on:del-todo="deleteTodo(todo)" v-on:update-todo="updateTodo(todo)"/>
    </div>
  </v-container>
</template>

<script>
    import Todo from './Todo.vue'
    import Header from './Header.vue'
    import AddTodo from './AddTodo.vue'
    import {APIService} from '../APIService'
    
    const apiService = new APIService();
    
    export default {
        name: "Home",
        components: {
            Todo,
            Header,
            AddTodo,
        },
        methods: {
            deleteTodo(toDelete){
                apiService.deleteTodo(toDelete)
                this.todos = this.todos.filter(todo => todo.id !== toDelete.id)
            },
            getTodos(){
                apiService.getTodos().then((data) => {
                    this.todos = data
                })
            },
            addTodo(todo) {
                apiService.createTodo(todo)
                this.todos = [...this.todos, todo]
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
