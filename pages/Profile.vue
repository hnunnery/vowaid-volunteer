<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center">
        <EditProfile/>
      </v-flex>

      <v-flex xs12 sm10 md8 lg6 lx5 class="mt-4">
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
import EditProfile from "@/components/EditProfile";

export default {
  middleware: "auth-guard",
  components: {
    EditProfile
  },
  data() {
    return {
      user: this.$store.getters.user
    };
  },
  watch: {
    user(value) {
      if (value === null || value === undefined) {
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