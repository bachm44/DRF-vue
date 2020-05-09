<template>
  <v-container>
    <form @submit="onSubmit">
    <input type="text" v-model="todoText" placeholder="Add new todo...">
    <input type="submit" value="Submit">
    </form>
  </v-container>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'AddTodo',
        data: () => ({
            todoText:'',
        }),
        methods: {
            ...mapActions(['addTodo']),
            onSubmit(e){
                e.preventDefault()
                this.addTodo(this.todoText)
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