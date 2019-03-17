<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center">
        <v-btn to="/updateprofile" large class="primary">
          <v-icon left small class="white--text">fas fa-pencil-alt</v-icon>Update Profile
        </v-btn>
      </v-flex>
      <v-flex xs12 sm8 md6 lg5 xl4 class="mt-4">
        <v-card class="pa-2 text-xs-center">
          <h2 class="my-3 primary--text headline">{{ user.first }} {{ user.last }}</h2>
          <p class="my-3 secondary--text subheading font-weight-bold">{{ user.email }}</p>
          <p class="my-3 secondary--text subheading font-weight-bold">{{ user.phone }}</p>
          <p class="my-3 secondary--text subheading font-weight-bold">{{ user.city }}</p>
        </v-card>
      </v-flex>
      <v-flex xs12 v-for="(event, index) in user.registeredEvents" :key="index">
        <!-- <p>{{ event }}</p> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: "auth-guard",
  data() {
    return {
      user: this.$store.getters.user
    };
  },
  watch: {
    loggedIn(user) {
      if (user === null || user === undefined) {
        this.$router.push("/");
      }
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