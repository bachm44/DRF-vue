<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                name="login"
                type="text"
                class="form__input"
                v-model.trim="$v.user.username.$model"
                :error-messages="usernameErrors"
                required
                @input="$v.user.username.$touch()"
              ></v-text-field>
              <v-text-field
                :append-icon="showP1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP1 ? 'text' : 'password'"
                @click:append="showP1 = !showP1"
                id="password"
                label="Password"
                name="password"
                class="form__input"
                v-model.trim="$v.user.password.$model"
                :error-messages="passwordErrors"
                required
                @input="$v.user.password.$touch()"
              ></v-text-field>
              <v-text-field
                :append-icon="showP2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showP2 ? 'text' : 'password'"
                @click:append="showP2 = !showP2"
                id="repeatedPass"
                label="Repeated password"
                name="repeatedPass"
                class="form__input"
                v-model.trim="$v.user.repeatedPass.$model"
                :error-messages="repeatPassErrors"
                required
                @input="$v.user.repeatedPass.$touch()"
              ></v-text-field>
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
import { mapGetters, mapActions } from "vuex"
import router from '../router/index.js'

export default {
  name: "Register",
  data: () => ({
    submitted: false,
    user: {
      username: "",
      password: "",
      repeatedPass: ""
    },
    showP1: false,
    showP2: false
  }),
  methods: {
    ...mapGetters(["getCaptcha"]),
    ...mapActions(["recaptchaValidate"]),
    onRegister(e) {
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
    user: {
      username: { required },
      password: { required, minLength: minLength(6) },
      repeatedPass: { required, sameAsPassword: sameAs("password") }
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) return errors;
      !this.$v.user.username.required && errors.push("Username is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push("Password is required");
      !this.$v.user.password.minLength &&
        errors.push("Password must be at least 6 characters");
      return errors;
    },
    repeatPassErrors() {
      const errors = [];
      if (!this.$v.user.repeatedPass.$dirty) return errors;
      !this.$v.user.repeatedPass.required &&
        errors.push("Confirm password is required");
      !this.$v.user.repeatedPass.sameAsPassword &&
        errors.push("Passwords must match");
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