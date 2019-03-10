<template>
  <v-container class="wrapper">
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 sm8 lg6>
        <v-card class="px-2">
          <v-container>
            <form @submit.prevent="onSignUp">
              <v-layout row wrap justify-center>
                <v-flex xs8 sm6 class="ma-3">
                  <v-img
                    src="https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,q_100,w_500/v1535429145/VOWAID/vowaid-logo-dark-shadow.png"
                    alt="logo"
                  ></v-img>
                </v-flex>
                <v-flex xs12 class="text-xs-center">
                  <h4 class="headline primary--text mt-2">New User Registration</h4>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 lg8 class="text-xs-center" v-if="error">
                  <Alert @dismissed="onDismissed" :text="error.message"/>
                </v-flex>
                <v-flex xs12 class="my-2 text-xs-center">
                  <v-btn
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                    large
                    class="primary white--text"
                  >
                    Sign Up
                    <span slot="loader" class="custom-loader">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Alert from "@/components/Alert";

export default {
  components: {
    Alert
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  font-size: 16px !important;
}
@media screen and (min-height: 700px) {
  .wrapper {
    margin-top: 6vh !important;
  }
}
</style>