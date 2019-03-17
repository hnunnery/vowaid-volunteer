<template>
  <v-container class="pa-0">
    <v-layout row wrap justify-center align-center>
      <v-flex xs11 sm8 lg5>
        <v-card class="px-2 mt-4">
          <v-container>
            <form @submit.prevent="updateProfile">
              <v-layout row wrap justify-center>
                <v-flex xs12 class="text-xs-center">
                  <h4 class="display-1 primary--text my-2">Update Profile</h4>
                </v-flex>
                <v-flex xs12 class="my-1">
                  <v-text-field
                    name="first"
                    label="First Name"
                    id="first"
                    v-model="first"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="my-1">
                  <v-text-field
                    name="last"
                    label="Last Name"
                    id="last"
                    v-model="last"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="my-1">
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="my-1">
                  <v-text-field
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    v-model="phone"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 class="my-1">
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
                  <v-btn @click="onSaveChanges" large class="primary white--text">Update Profile</v-btn>
                </v-flex>
                <v-flex xs12>
                  <v-alert v-model="alert" dismissible type="success">Profile Updated Successfully</v-alert>
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
  middleware: "auth-guard",
  props: ["user"],
  data() {
    return {
      editDialog: false,
      alert: false,
      id: this.$store.getters.user.id,
      first: this.$store.getters.user.first,
      last: this.$store.getters.user.last,
      email: this.$store.getters.user.email,
      phone: this.$store.getters.user.phone,
      city: this.$store.getters.user.city
    };
  },
  methods: {
    onSaveChanges() {
      this.editDialog = false;
      this.$store.dispatch("updateUserData", {
        id: this.id,
        first: this.first,
        last: this.last,
        email: this.email,
        phone: this.phone,
        city: this.city
      });
      this.alert = true;
    }
  }
};
</script>