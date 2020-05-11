<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                type="text"
                class="form__input"
                v-model.trim="$v.username.$model"
                :error-messages="usernameErrors"
                required
                @input="$v.username.$touch()"
              ></v-text-field>
              <v-text-field
                :append-icon="showP1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP1 ? 'text' : 'password'"
                @click:append="showP1 = !showP1"
                id="password"
                label="Password"
                name="password"
                class="form__input"
                v-model.trim="$v.password.$model"
                :error-messages="passwordErrors"
                required
                @input="$v.password.$touch()"
              ></v-text-field>
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
import { required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex"
import router from '../router/index.js'

export default {
  name: "Login",
  data: () => ({
    submitted: false,
    username: "",
    password: "",
    showP1: false
  }),
  methods: {
    ...mapGetters(["getCaptcha"]),
    ...mapActions(["recaptchaValidate"]),
    onLogin(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        if (!this.recaptcha()) {
          alert("Captcha failed");
          return
        }
        alert("Captcha success");
        router.push({ name: 'Home'})
      }
    },
    recaptcha() {
      this.$recaptcha("login").then(token => {
        this.recaptchaValidate(token);
      });
      return this.getCaptcha().success;
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
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