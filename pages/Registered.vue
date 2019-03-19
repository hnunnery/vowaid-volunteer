<template>
  <v-container>
    <v-layout row wrap justify-center class="mb-5">
      <v-flex xs12 class="text-xs-center mb-4">
        <v-layout row wrap justify-center>
          <v-flex xs12>
            <h1 class="primary--text">{{ eventTitle }}</h1>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-center text-sm-right px-2">
            <h2 class="secondary--text">{{ eventLocation }}</h2>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-center text-sm-left px-2">
            <h2 class="secondary--text">{{ eventDate }} - {{ eventTime }}</h2>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 v-if="loading" class="text-xs-center">
        <v-progress-circular :size="70" color="primary" indeterminate></v-progress-circular>
      </v-flex>
      <v-flex xs12 lg10 xl8 v-else>
        <v-card>
          <v-list three-line>
            <div v-for="user in registeredUsers" :key="user.id">
              <v-divider></v-divider>
              <v-list-tile>
                <v-layout row wrap justify-center align-center>
                  <v-flex xs12 sm8 md4>
                    <p class="secondary--text title pb-1">{{ user.first }} {{ user.last }}</p>
                  </v-flex>
                  <v-flex xs12 sm4 md4 class="text-xs-left text-sm-right text-md-center">
                    <p class="secondary--text">{{ user.phone }}</p>
                  </v-flex>
                  <v-flex xs12 sm12 md4 class="text-xs-left text-sm-right text-md-left">
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
      loading: true,
      eventId: this.$route.params.eventId,
      eventTitle: this.$route.params.eventTitle,
      eventLocation: this.$route.params.eventLocation,
      eventDate: this.$route.params.eventDate,
      eventTime: this.$route.params.eventTime,
      registeredUsers: [],
      allUsers: []
    };
  },
  computed: {
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
        if (
          this.$store.getters.user.id === "pCDpfVtvVqdzMvFBkZIvjY7gJSR2" ||
          this.$store.getters.user.id === "5Lg4ySQxUhXwp4dk8jThs2RZBtq2"
        ) {
          return true;
        }
      }
    }
  },
  // methods: {
  //   getRegisteredUsers() {
  //     this.allUsers.forEach(user => {
  //       if (user.registrations) {
  //         let list = Object.values(user.registrations);
  //         // console.log(list);
  //         if (list.includes(this.eventId)) {
  //           this.registeredUsers.push(user);
  //         }
  //       }
  //     });
  //     // console.log("Registered Users Created");
  //   }
  // },
  watch: {
    loading() {
      this.allUsers = this.$store.getters.allUsers;
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
  },
  mounted() {
    // allows async data to load
    setTimeout(() => {
      this.loading = false;
    }, 1500);
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