<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center">
        <h1 class="display-1 primary--text">VOWAID Foundation Volunteer Portal</h1>
        <v-divider class="mt-2 mb-4"></v-divider>
      </v-flex>
      <v-layout row wrap justify-center v-if="!userAuth">
        <v-flex xs12 class="text-xs-center">
          <h2 class="display-1 red--text mb-4">You must be signed in to proceed.</h2>
        </v-flex>
        <v-flex xs6 class="text-xs-center text-sm-right">
          <v-btn href="https://www.vowaidfoundation.org" large class="primary my-btn">Go Back</v-btn>
        </v-flex>
        <v-flex xs6 class="text-xs-center text-sm-left">
          <v-btn to="/signin" large class="primary my-btn">Sign In</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center v-if="userAuth">
        <v-flex xs6 class="text-xs-center text-sm-right">
          <v-btn to="/events" large class="primary my-btn">View Events</v-btn>
        </v-flex>
        <v-flex xs6 class="text-xs-center text-sm-left">
          <v-btn to="/create" large class="primary my-btn">Create Event</v-btn>
        </v-flex>
        <v-flex xs10 sm6 md6 lg5 class="mt-4">
          <v-img
            src="https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,q_100,w_705/v1535429145/VOWAID/vowaid-logo-dark-shadow.png"
            alt="logo"
          ></v-img>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    userAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.my-btn {
  width: 160px !important;
}
</style>
