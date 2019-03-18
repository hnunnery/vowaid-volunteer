<template>
  <v-dialog max-width="400px" v-model="registerDialog">
    <v-btn slot="activator" v-if="!userIsRegistered" large class="primary white--text">
      <v-icon left size="20px">fas fa-user-plus</v-icon>Register
    </v-btn>
    <v-btn slot="activator" v-if="userIsRegistered" class="success white--text">
      <v-icon left size="20px">fas fa-check</v-icon>Registered
    </v-btn>
    <v-btn slot="activator" v-if="userIsRegistered" class="grey darken-2 white--text">
      <v-icon left size="20px">fas fa-times</v-icon>Unregister
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex xs12 class="text-xs-center">
            <h3 v-if="userIsRegistered" class="display-1 primary--text">Unregister for Event?</h3>
            <h3 v-else class="display-1 primary--text">Register for Event?</h3>
            <v-divider class="mt-1 mb-2"></v-divider>
            <v-btn class="red--text text--darken-1" @click="registerDialog = false">Cancel</v-btn>
            <v-btn class="green--text text--darken-1" @click="onAgree">Confirm</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["eventId"],
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredEvents.findIndex(eventId => {
          return eventId === this.eventId;
        }) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromEvent", this.eventId);
      } else {
        this.$store.dispatch("registerUserForEvent", this.eventId);
      }
    }
  }
};
</script>