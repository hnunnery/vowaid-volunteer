<template>
  <v-container>
    <v-layout row wrap justify-center class="mb-5">
      <v-flex xs12 class="text-xs-center">
        <h3 class="primary--text display-1">Create New Event</h3>
      </v-flex>
      <v-flex xs12 sm10 md8 xl6 class="mt-4 px-3">
        <form @submit.prevent="onCreateEvent">
          <v-layout row wrap justify-center>
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
            <v-flex xs12 class="text-xs-center px-2">
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="imageUrl"
                v-model="imageUrl"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs10 sm6>
              <v-img :src="imageUrl"></v-img>
            </v-flex>
            <v-layout row wrap justify-center align-center class="mb-3">
              <v-flex xs12 lg6 class="text-xs-center pa-2">
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>
              <v-flex xs12 lg6 class="text-xs-center pa-2">
                <v-time-picker v-model="time"></v-time-picker>
              </v-flex>
            </v-layout>
            <v-flex xs12 class="text-xs-center">
              <v-btn
                type="submit"
                large
                class="primary white--text"
                :disabled="!formIsValid"
              >Create Event</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "create-event",
  layout: "events",
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date(),
      time: new Date()
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    }
  },
  methods: {
    onCreateEvent() {
      const eventData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      };
      this.$store.dispatch("createEvent", eventData);
      this.$router.push("/volunteer/events");
    }
  }
};
</script>
