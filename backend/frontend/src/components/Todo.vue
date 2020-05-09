<template>
  <v-container>
    <div v-bind:class="{'is-complete': todo.isCompleted}">
        <input type="text" v-model="todo.text" :placeholder="todo.text" @keydown.enter="$event.target.blur(); updateTodo(todo)" >
        <input type="checkbox" v-model="todo.isCompleted" @change="updateTodo(todo)">
        <button @click="$emit('del-todo', todo)">Delete</button>
    </div>
    
  </v-container>
  
</template>

<script>
    export default {
        name: 'Todo',
        props: ["todo"],
        data: () => ({
            todoText:'',
        }),
        methods: {
            updateTodo(todo){
                this.$emit('update-todo', todo)
            }
        },
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
    }
</style>