<template>
  <v-container>
    <v-layout row justify-center v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular :size="70" color="primary" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg11 xl10 v-for="event in events" :key="event.id" class="my-4">
        <v-card>
          <v-container fluid>
            <v-layout row wrap justify-center align-center>
              <v-flex xs12 sm10 lg4 class="px-2">
                <v-img :src="event.imageUrl" alt="event" class="responsive-img"></v-img>
              </v-flex>
              <v-flex xs12 lg8 class="text-xs-center px-2">
                <h3 class="primary--text display-1">{{ event.title }}</h3>
                <v-divider class="mt-2 mb-3"></v-divider>
                <v-layout row wrap justify-center align-center>
                  <v-flex xs12 md6>
                    <p class="primary--text title font-weight-bold location">
                      <v-icon
                        size="25px"
                        class="primary--text mr-2 hidden-sm-and-down"
                      >fas fa-map-marker-alt</v-icon>
                      {{ event.location }}
                    </p>
                  </v-flex>
                  <v-flex xs12 md6>
                    <p class="primary--text title font-weight-bold">
                      <v-icon
                        size="25px"
                        class="primary--text mr-2 hidden-sm-and-down"
                      >fas fa-calendar-alt</v-icon>
                      {{ event.date }} {{ event.time }}
                    </p>
                  </v-flex>
                </v-layout>
                <p class="secondary--text subheading text-xs-left">{{ event.description }}</p>
                <p class="text-xs-center">
                  <v-btn large class="primary white--text">
                    <v-icon left size="20px">fas fa-user-plus</v-icon>Sign Up
                  </v-btn>
                  <v-btn large class="success white--text">
                    <v-icon left size="20px">fas fa-check</v-icon>Registered
                  </v-btn>
                </p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  computed: {
    events() {
      return this.$store.getters.loadedEvents;
    },
    userAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    // fetching events from firebase
    this.$store.dispatch("loadEvents");
    // signing in users with firebase auth tokens
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1263px) {
  h3 {
    margin-top: 30px;
  }
}
@media screen and (max-width: 500px) {
  .container {
    padding: 0px !important;
  }
}
.my-btn {
  width: 160px !important;
}
</style>
