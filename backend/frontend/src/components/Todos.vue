<template>
  <v-container>
      
    <AddTodo />
    <FilterTodos />
    <div v-for="todo in allTodos.slice().reverse()" v-bind:key="todo.id">
        <Todo v-bind:todo="todo"/>
    </div>
    
  </v-container>
</template>

<script>
    import Todo from './Todo.vue'
    import AddTodo from './AddTodo.vue'
    import FilterTodos from './FilterTodos.vue'
    import { mapGetters, mapActions } from 'vuex'
    
    export default {
        name: "Todos",
        data: () => ({
        }),
        methods: {
            ...mapActions(['fetchTodos']),
        },
        components: {
            Todo,
            AddTodo,
            FilterTodos,
        },
        computed: mapGetters(['allTodos']),
        created() {
            this.fetchTodos()
        }
    }
</script>