<template>
    
   <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Todo app</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <div class="form-group" :class="{ 'form-group--error': submitted && $v.username.$error }">
                    <v-text-field
                      label="Login"
                      name="login"
                      type="text"
                      class="form__input"
                      v-model.trim="$v.username.$model"
                    ></v-text-field>
                    <div class="error" v-if="submitted && !$v.username.required">Field is required</div>
                  </div>
                  <div class="form-group" :class="{ 'form-group--error': submitted && $v.username.$error }">
                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      class="form__input"
                      v-model.trim="$v.password.$model"
                    ></v-text-field>
                    <div class="error" v-if="submitted && !$v.password.required">Field is required</div>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn id="button" color="primary" @click="onLogin">Login</v-btn>
                <router-link to="/register">
                  <v-btn color="green">Register</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    
    export default {
        name: 'Login',
        data: () => ({
            submitted: false,
            username: '',
            password: ''
        }),
        methods: {
            onLogin(e){
                this.submitted = true
                this.$v.$touch()
                if (this.$v.$invalid) {
                    return;
                } else {
                    //works
                }
            }
        },
        validations: {
            username: { required },
            password: { required },
        }
    }
</script>

<style scoped>
a {
  text-decoration: none;
}
#button {
  margin-right: 10px;
}
</style>