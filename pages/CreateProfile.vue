<template>
  <v-container class="wrapper">
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 sm8 lg6>
        <v-card class="px-2">
          <v-container>
            <form @submit.prevent="onSaveChanges">
              <v-layout row wrap justify-center>
                <v-flex xs12 class="text-xs-center">
                  <h4 class="display-1 primary--text mt-2">User Profile</h4>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="first"
                    label="First Name"
                    id="first"
                    v-model="first"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="last"
                    label="Last Name"
                    id="last"
                    v-model="last"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    v-model="phone"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 lg8 class="my-1">
                  <v-text-field
                    name="city"
                    label="City and State"
                    id="city"
                    v-model="city"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="text-xs-center">
                  <v-btn
                    type="submit"
                    :disabled="loading"
                    :loading="loading"
                    large
                    class="primary white--text"
                  >
                    Save Profile
                    <span slot="loader" class="custom-loader">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      loading: false,
      id: this.$store.getters.user.id,
      first: "",
      last: "",
      email: "",
      phone: "",
      city: ""
    };
  },
  methods: {
    onSaveChanges() {
      this.$store.dispatch("updateUserData", {
        id: this.id,
        first: this.first,
        last: this.last,
        email: this.email,
        phone: this.phone,
        city: this.city
      });
      this.loading = true;
      setTimeout(() => {
        this.$router.push("/profile");
        this.loading = false;
      }, 1000);
    }
  }
};
</script>