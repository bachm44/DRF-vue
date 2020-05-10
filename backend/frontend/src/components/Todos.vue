<template>
  <v-container>
    <AddTodo />
    <div v-for="todo in allTodos.slice().reverse()" v-bind:key="todo.id">
        <Todo v-bind:todo="todo" v-on:del-todo="deleteTodo" v-on:update-todo="updateTodo(todo)"/>
    </div>
  </v-container>
</template>

<script>
    import Todo from './Todo.vue'
    import AddTodo from './AddTodo.vue'
    import { mapGetters, mapActions } from 'vuex'
    
    export default {
        name: "Todos",
        data: () => ({
        }),
        methods: {
            ...mapActions(['fetchTodos']),
            updateTodo(todo) {},
            deleteTodo(todo) {}
        },
        components: {
            Todo,
            AddTodo,
        },
        computed: mapGetters(['allTodos']),
        created() {
            this.fetchTodos()
        }
    }
</script>



<!--
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
        },
-->