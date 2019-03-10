<template>
  <v-dialog max-width="500px" persistent v-model="editDialog">
    <v-btn large class="primary" slot="activator">
      <v-icon left class="white--text">fas fa-pencil-alt</v-icon>Update Profile
    </v-btn>
    <v-card>
      <v-container class="wrapper secondary">
        <v-layout row wrap justify-center align-center>
          <v-flex xs12>
            <v-card class="px-2">
              <v-container>
                <form @submit.prevent="updateProfile">
                  <v-layout row wrap justify-center>
                    <v-flex xs12 class="text-xs-center">
                      <h4 class="display-1 primary--text mt-2">Update Profile</h4>
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
                      <v-btn @click="editDialog = false" fab class="white--text grey darken-2">
                        <v-icon>fas fa-times</v-icon>
                      </v-btn>
                      <v-btn @click="onSaveChanges" large class="primary white--text">Update</v-btn>
                    </v-flex>
                  </v-layout>
                </form>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      editDialog: false,
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
    }
  }
};
</script>