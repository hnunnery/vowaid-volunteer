<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md6 lg5 xl4 class="mt-4">
        <v-card class="pa-2 text-xs-center">
          <h2 class="my-3 primary--text headline">{{ user.first }} {{ user.last }}</h2>
          <p class="my-3 secondary--text subheading font-weight-bold">{{ user.email }}</p>
          <p class="my-3 secondary--text subheading font-weight-bold">{{ user.phone }}</p>
          <p class="my-3 secondary--text subheading font-weight-bold">{{ user.city }}</p>
          <v-btn to="/updateprofile" class="primary">
            <v-icon left small class="white--text">fas fa-pencil-alt</v-icon>Update Profile
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row justify-center class="my-5">
      <v-flex xs12 sm8 md6 lg5 xl4>
        <v-card>
          <v-list three-line>
            <div v-for="event in matchedEvents" :key="event.id">
              <v-divider></v-divider>
              <v-list-tile>
                <v-list-tile-avatar>
                  <img
                    v-if="event.imageUrl != null"
                    :src="event.imageUrl"
                    alt="event"
                    class="responsive-img mt-3"
                  >
                  <img
                    v-else
                    src="../static/icons/favicon-32x32.png"
                    alt="logo"
                    class="responsive-img mt-3"
                  >
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title class="primary--text font-weight-bold">{{ event.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="secondary--text body-2">{{ event.location }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title
                    class="secondary--text body-2"
                  >{{ event.date }} - {{ event.time }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon class="green white--text">
                    <v-icon>fas fa-check</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Register from "@/components/Register";

export default {
  middleware: "auth-guard",
  components: {
    Register
  },
  data() {
    return {
      user: this.$store.getters.user,
      events: this.$store.state.loadedEvents
    };
  },
  computed: {
    matchedEvents() {
      let filtered = [];
      if (this.user.registeredEvents) {
        this.events.forEach(event => {
          if (this.user.registeredEvents.includes(event.id)) {
            filtered.push(event);
          }
        });
      }
      return filtered;
    }
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
@media screen and (min-height: 700px) {
  .wrapper {
    margin-top: 6vh !important;
  }
}
.v-list {
  padding: 0;
}
</style>