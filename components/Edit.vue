<template>
  <v-dialog width="350px" persistent>
    <v-btn fab class="primary" slot="activator">
      <v-icon class="white--text">fas fa-pencil-alt</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap justify-center>
          <v-flex xs12 class="text-xs-center">
            <h2 class="display-1 primary--text">Edit Event</h2>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-textarea
              name="description"
              label="Description"
              id="description"
              v-model="description"
              required
            ></v-textarea>
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-btn type="submit" large class="primary white--text">Update Event</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: "",
      time: ""
    };
  }
};
</script>