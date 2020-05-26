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
                label="Email"
                name="email"
                type="text"
                class="form__input"
                v-model.trim="$v.user.email.$model"
                :error-messages="emailErrors"
                required
                @input="$v.user.email.$touch()"
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
            <v-btn id="button" color="green" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, sameAs, minLength, email } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import router from "../router/index.js";

export default {
  name: "Register",
  data: () => ({
    submitted: false,
    user: {
      username: "",
      password: "",
      email: "",
      repeatedPass: ""
    },
    showP1: false,
    showP2: false,
    error: false
  }),
  methods: {
    ...mapGetters(["getCaptcha"]),
    ...mapActions(["recaptchaValidate"]),
    register(e) {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        if (!this.recaptcha()) {
          alert("Captcha failed");
          return;
        }
        this.$store
          .dispatch("onRegister", {
            username: this.user.username,
            password: this.user.password,
            email: this.user.email
          })
          .then(success => {
            this.$router.push("/login");
          })
          .catch(error => {
            if (error.password !== null) console.log(error.password);
            if (error.email !== null) console.log(error.email);
            if (error.username !== null) console.log(error.username);

            this.error = true;
          });
      }
    },
    recaptcha() {
      this.$recaptcha("login").then(token => {
        this.recaptchaValidate(token);
      });
      return true; // this.getCaptcha();
    }
  },
  validations: {
    user: {
      username: { required },
      email: { required, email },
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
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.required && errors.push("Username is required");
      !this.$v.user.email.email && errors.push("Wrong email format");
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