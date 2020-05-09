<template>
  <v-container>
    <form @submit="addTodo">
    <input type="text" v-model="todoText" placeholder="Add new todo...">
    <input type="submit" value="Submit">
    </form>
  </v-container>
</template>

<script>
    export default {
        name: 'AddTodo',
        data: () => ({
            todoText:'',
        }),
        methods: {
            addTodo(e){
                e.preventDefault()
                const toAdd = {"text": this.todoText}
                this.$emit('add-todo', toAdd)
                this.todoText = ''
            }
        },
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
    }
</style>