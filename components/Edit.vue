<template>
  <v-dialog width="350px" persistent v-model="editDialog">
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
            <v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="editedLocation"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-text-field name="date" label="Date" id="date" v-model="editedDate" required></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-text-field name="time" label="Time" id="time" v-model="editedTime" required></v-text-field>
          </v-flex>
          <v-flex xs12 class="text-xs-center px-2">
            <v-textarea
              name="description"
              label="Description"
              id="description"
              v-model="editedDescription"
              required
            ></v-textarea>
          </v-flex>
          <v-flex xs12 class="text-xs-center">
            <v-btn @click="editDialog = false" fab class="white--text grey darken-2">
              <v-icon>fas fa-times</v-icon>
            </v-btn>
            <v-btn @click="onSaveChanges" large class="primary white--text">Update Event</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      editDialog: false,
      editedTitle: this.event.title,
      editedLocation: this.event.location,
      editedDescription: this.event.description,
      editedDate: this.event.date,
      editedTime: this.event.time
    };
  },
  methods: {
    onSaveChanges() {
      this.editDialog = false;
      this.$store.dispatch("updateEventData", {
        id: this.event.id,
        title: this.editedTitle,
        location: this.editedLocation,
        description: this.editedDescription,
        date: this.editedDate,
        time: this.editedTime
      });
    }
  }
};
</script>