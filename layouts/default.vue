<template>
  <v-app class="app">
    <v-toolbar app scroll-off-screen>
      <v-flex class="text-xs-center text-lg-left">
        <nuxt-link to="/">
          <img
            src="https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,w_160/v1534824485/VOWAID/navbar-logo.png"
            alt="logo"
            id="navbar-logo"
            class="pt-2"
          >
        </nuxt-link>
      </v-flex>
      <!-- NAVBAR FOR MEDIUM AND UP SCREEN SIZES -->
      <v-toolbar-items class="hidden-md-and-down">
        <v-btn v-if="first" flat to="/profile">
          <span class="nav-text primary--text">{{ first }} {{ last }}</span>
        </v-btn>
        <v-btn flat to="/">
          <v-icon class="primary--text navbar-icons">fas fa-calendar-alt</v-icon>&nbsp;
          <span class="nav-text primary--text">Events</span>
        </v-btn>
        <v-btn v-if="userIsAdmin" flat to="/create">
          <v-icon class="primary--text navbar-icons">fas fa-calendar-day</v-icon>&nbsp;
          <span class="nav-text primary--text">Create</span>
        </v-btn>
        <v-btn v-if="!userAuth" flat to="/signin">
          <v-icon class="primary--text navbar-icons">fas fa-sign-in-alt</v-icon>&nbsp;
          <span class="nav-text primary--text">Sign In</span>
        </v-btn>
        <v-btn v-if="!userAuth" flat to="signup">
          <v-icon class="primary--text navbar-icons">fas fa-user-plus</v-icon>&nbsp;
          <span class="nav-text primary--text">Sign Up</span>
        </v-btn>
        <v-btn @click="onLogout" v-if="userAuth" flat>
          <v-icon class="primary--text navbar-icons">fas fa-sign-out-alt</v-icon>&nbsp;
          <span class="nav-text primary--text">Sign Out</span>
        </v-btn>
        <v-btn v-if="userAuth" flat to="/profile">
          <v-icon class="primary--text navbar-icons">fas fa-user-circle</v-icon>&nbsp;
          <span class="nav-text primary--text">Profile</span>
        </v-btn>
        <v-btn flat href="https://www.vowaidfoundation.org">
          <v-icon class="primary--text navbar-icons">fas fa-home</v-icon>&nbsp;
          <span class="nav-text primary--text">Home</span>
        </v-btn>
      </v-toolbar-items>
      <!-- NAVBAR FOR SMALL AND EXTRA SMALL SCREEN SIZES -->
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" class="hidden-lg-and-up">
        <v-icon class="darkgrey--text">fas fa-bars</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      clipped
      temporary
      width="180"
      :right="right"
      v-model="rightDrawer"
      class="hidden-lg-and-up"
      fixed
      app
    >
      <v-list>
        <img
          src="https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,q_100,w_130/v1535429145/VOWAID/vowaid-logo-dark-shadow.png"
          alt="logo"
          class="responsive-img ml-4 my-3 text-xs-left"
        >
        <v-list-tile to="/" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-calendar-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Events</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAdmin" to="/create" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-calendar-day</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Create</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!userAuth" to="/signin" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Sign In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!userAuth" to="/signup" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-user-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Sign Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="onLogout" v-if="userAuth" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userAuth" to="/profile" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-user-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile href="https://www.vowaidfoundation.org" class="sidenav-element">
          <v-list-tile-action>
            <v-icon class="primary--text text-xs-center">fas fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text nav-font-size font-weight-medium">Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer height="auto" class="page-footer">
      <v-card flat tile color="#1C1C1C" class="flex">
        <v-layout row wrap justify-center align-center class="mt-2 mb-3">
          <v-flex xs12 class="text-xs-center">
            <v-layout row wrap>
              <v-flex xs12 md6>
                <p class="white--text">
                  Created by
                  <a href="https://www.codehunter.io" target="_blank">
                    <span class="b-align">code</span>
                    <span class="white--text font-weight-bold">Hunter</span>
                  </a> Web Design and Development
                </p>
              </v-flex>
              <v-flex xs12 md6>
                <p class="white--text">© 2019 Veterans of War Aid Foundation</p>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      first: "",
      last: ""
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
    },
    fetchName() {
      if (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      ) {
        return this.$store.getters.user.first;
      }
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
    fetchName() {
      this.first = this.$store.getters.user.first;
      this.last = this.$store.getters.user.last;
    },
    userAuth() {
      this.first = "";
      this.last = "";
    }
  }
};
</script>

<style lang="scss" scoped>
// NAVBAR - size logo
#navbar-logo {
  max-height: 45px;
  align-items: center;
  margin-left: 36px;
  padding-top: 2px;
  @media screen and (min-width: 1500px) {
    display: block;
    margin-left: 24px;
  }
}
.navbar-icons {
  font-size: 1.4em;
}
.nav-font-size {
  font-size: 1.3em;
}
.nav-text {
  padding-left: 5px;
  font-size: 1.4em;
  text-transform: capitalize;
}

// NAVBAR - raising fontawesome5 icons
.fa,
.fab,
.fal,
.far,
.fas {
  @media only screen and (max-width: 958px) {
    vertical-align: text-top;
  }
}
/* STYLE NAVIGATION DRAWER */
.v-list {
  padding: 0 !important;
  .fa-user,
  .fa-sign-out-alt,
  .fa-user-plus {
    margin-left: 2px;
  }
  .fa-calendar-alt,
  .fa-calendar-day {
    margin-left: 2px;
  }
  .fa-sign-in-alt,
  .fa-user-circle {
    margin-left: 1px;
  }
}

// FOOTER - bottom aligns text in codeHunter
.b-align {
  vertical-align: bottom;
  line-height: 18px;
  color: #22aa00;
  font-size: 0.85em;
  margin-right: -2px;
}
.page-footer {
  /* border-top: 1px solid #2a2968; */
  p {
    margin: 3px auto;
  }
}
</style>