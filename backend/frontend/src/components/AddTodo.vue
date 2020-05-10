<template>
  <v-container>
    <!--
    <form @submit="onSubmit">
    <input type="text" v-model="todoText" placeholder="Add new todo...">
    <input type="submit" value="Submit">
    </form>
    -->
    <form @submit.prevent="onSubmit">
      <div class="form-group" :class="{ 'form-group--error': $v.todoText.$error }">
        <input class="form__input" v-model.trim="$v.todoText.$model" placeholder="Add new todo..."/>
      </div>
      <div class="error" v-if="submitStatus === 'ERROR'">Field is required</div>
      <button class="button" type="submit">Submit</button>
    </form>
  </v-container>
</template>

<script>
    import { mapActions } from 'vuex'
    import { required } from 'vuelidate/lib/validators'
    
    export default {
        name: 'AddTodo',
        data: () => ({
            todoText:'',
            submitStatus: null
        }),
        methods: {
            ...mapActions(['addTodo']),
            onSubmit(e){
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.addTodo(this.todoText)
                    this.todoText = ''
                    this.submitStatus = 'OK'
                }
            }
        },
        validations: {
            todoText: { 
                required,
            }
        }
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
    }
</style>