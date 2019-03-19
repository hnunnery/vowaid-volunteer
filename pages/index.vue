<template>
  <v-container>
    <v-layout row justify-center v-if="loading" class="mt-5">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular :size="70" color="primary" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center v-else>
      <v-flex xs12 class="text-xs-center mt-4" v-if="!userAuth">
        <nuxt-link to="/signin">
          <v-btn large class="primary">Sign In To Register for Events</v-btn>
        </nuxt-link>
      </v-flex>
      <v-flex xs12 class="text-xs-center mt-4" v-if="userAuth && !userHasProfileInfo && !delayed">
        <nuxt-link to="/profile">
          <v-btn large class="primary">Update Profile Before Registering</v-btn>
        </nuxt-link>
      </v-flex>
      <v-flex xs12 lg11 xl10 v-for="event in events" :key="event.id" class="my-4">
        <v-card>
          <v-container fluid>
            <v-layout row wrap justify-center align-center>
              <v-flex xs12 sm8 lg4 class="px-2">
                <v-img
                  v-if="event.imageUrl != null"
                  :src="event.imageUrl"
                  alt="event"
                  class="responsive-img"
                ></v-img>
                <v-img
                  v-else
                  src="https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,q_100,w_500/v1535429145/VOWAID/vowaid-logo-dark-shadow.png"
                  alt="logo"
                  class="vowaid-logo"
                ></v-img>
              </v-flex>
              <v-flex xs12 lg8 class="text-xs-center px-2">
                <h3 class="primary--text display-1">{{ event.title }}</h3>
                <v-divider class="mt-2 mb-3 mx-4"></v-divider>
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
                <p
                  class="secondary--text subheading text-xs-left description px-4"
                >{{ event.description }}</p>
                <div class="text-xs-center mb-2">
                  <Register
                    v-if="userAuth && !userIsAdmin && userHasProfileInfo"
                    :eventId="event.id"
                  />
                  <v-layout row wrap justify-center v-if="userIsAdmin">
                    <v-flex xs6 sm4>
                      <v-btn
                        @click="deleteEvent(event.id)"
                        flat
                        large
                        class="red--text text--darken-2"
                        slot="activator"
                      >
                        <v-icon small left class="red--text text--darken-2">fas fa-trash-alt</v-icon>Delete
                      </v-btn>
                    </v-flex>
                    <v-flex xs6 sm4>
                      <Edit :event="event"/>
                    </v-flex>
                    <v-flex xs6 sm4>
                      <nuxt-link :to="{ name: 'Registered', params: { eventId: event.id, eventTitle: event.title } }">
                        <v-btn large flat class="green--text">
                          <v-icon small left class="green--text">fas fa-clipboard-list</v-icon>Roster
                        </v-btn>
                      </nuxt-link>
                    </v-flex>
                  </v-layout>
                </div>
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
import Edit from "@/components/Edit";
import Register from "@/components/Register";

export default {
  components: {
    Edit,
    Register
  },
  props: ["id"],
  data() {
    return {
      registered: "",
      delayed: true
    };
  },
  methods: {
    deleteEvent(eventId) {
      if (confirm("Delete this event?")) {
        this.$store.dispatch("onDeleteEvent", eventId);
        this.$store.dispatch("loadEvents");
      }
    }
  },
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
    userIsAdmin() {
      if (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      ) {
        return this.$store.getters.user.id === "pCDpfVtvVqdzMvFBkZIvjY7gJSR2";
      }
    },
    userHasProfileInfo() {
      return (
        this.$store.getters.user.email !== "" &&
        this.$store.getters.user.phone !== "" &&
        this.$store.getters.user.first !== "" &&
        this.$store.getters.user.last !== "" &&
        this.$store.getters.user.city !== ""
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
        this.$store.dispatch("fetchUserData");
      }
    });
  },
  mounted() {
    // keeps update button from flashing upon page load
    setTimeout(() => {
      this.delayed = false;
    }, 1000);
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
    padding: 0px 7px !important;
  }
  .v-card {
    padding-top: 10px;
  }
  .description {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
.my-btn {
  width: 160px !important;
}
.vowaid-logo {
  max-width: 300px;
  margin: 0 auto !important;
}
</style>
