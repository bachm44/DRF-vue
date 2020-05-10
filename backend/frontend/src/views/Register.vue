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
              <div
                class="form-group"
                :class="{ 'form-group--error': submitted && $v.user.username.$error }"
              >
                <v-text-field
                  label="Login"
                  name="login"
                  type="text"
                  class="form__input"
                  v-model.trim="$v.user.username.$model"
                ></v-text-field>
                <div
                  class="error"
                  v-if="submitted && !$v.user.username.required"
                >Username is required</div>
              </div>
              <div
                class="form-group"
                :class="{ 'form-group--error': submitted && $v.user.password.$error }"
              >
                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  class="form__input"
                  v-model.trim="$v.user.password.$model"
                ></v-text-field>
                <div
                  class="error"
                  v-if="submitted && !$v.user.password.required"
                >Password is required</div>
                <div
                  class="error"
                  v-if="submitted && !$v.user.password.minLength"
                >Password must be at least 6 characters</div>
              </div>
              <div
                class="form-group"
                :class="{ 'form-group--error': submitted && $v.user.repeatedPass.$error }"
              >
                <v-text-field
                  id="repeatedPass"
                  label="Repeated password"
                  name="repeatedPass"
                  type="password"
                  class="form__input"
                  v-model.trim="$v.user.repeatedPass.$model"
                ></v-text-field>
                <div
                  class="error"
                  v-if="submitted && !$v.user.repeatedPass.required"
                >Confirm password is required</div>
                <div
                  class="error"
                  v-if="submitted && !$v.user.repeatedPass.sameAsPassword && $v.user.repeatedPass.required"
                >Passwords must match</div>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn id="button" color="green" @click="onRegister">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data: () => ({
    submitted: false,
    user: {
      username: "",
      password: "",
      repeatedPass: ""
    }
  }),
  methods: {
    onRegister(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        //works
      }
    }
  },
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) },
      repeatedPass: { required, sameAsPassword: sameAs("password") }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
#button {
  margin-right: 10px;
}
</style>