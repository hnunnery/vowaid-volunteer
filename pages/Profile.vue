<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Profile</h1>
      </v-flex>
      <v-flex xs12 v-for="(event, index) in registeredEvents" :key="index">
        <p>{{ event }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: "auth-guard",
  data() {
    return {
      registeredEvents: this.$store.getters.user.registeredEvents,
      loadedEvents: this.$store.getters.loadedEvents
    };
  }
};
</script>