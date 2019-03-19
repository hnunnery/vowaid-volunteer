<template>
  <v-container>
    <v-layout row wrap justify-center class="mb-5">
      <v-flex xs12 class="text-xs-center">
        <h1 class="primary--text">{{ eventTitle }}</h1>
        <v-btn @click="getRegisteredUsers" class="primary my-4" large>Generate Roster</v-btn>
      </v-flex>
      <v-flex xs12 lg10 xl8>
        <v-card>
          <v-list three-line>
            <div v-for="user in registeredUsers" :key="user.id">
              <v-divider></v-divider>
              <v-list-tile>
                <v-layout row wrap justify-center align-center>
                  <v-flex xs12 sm8 md4>
                    <p class="secondary--text">{{ user.first }} {{ user.last }}</p>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <p class="secondary--text">{{ user.phone }}</p>
                  </v-flex>
                  <v-flex xs12 sm12 md4>
                    <p class="secondary--text">{{ user.email }}</p>
                  </v-flex>
                </v-layout>
              </v-list-tile>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Registered",
  middleware: "auth-guard",
  data() {
    return {
      eventId: this.$route.params.eventId,
      eventTitle: this.$route.params.eventTitle,
      registeredUsers: [],
      allUsers: this.$store.getters.allUsers
    };
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
    }
  },
  methods: {
    getRegisteredUsers() {
      this.allUsers.forEach(user => {
        if (user.registrations) {
          let list = Object.values(user.registrations);
          // console.log(list);
          if (list.includes(this.eventId)) {
            this.registeredUsers.push(user);
          }
        }
      });
    }
  },
  created() {
    // fetching users from firebase
    this.$store.dispatch("loadAllUsers");
  }
};
</script>

<style lang="scss" scoped>
.v-list,
.v-list p {
  padding: 0;
  margin: 0;
}
</style>