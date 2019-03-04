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
            <v-flex xs6 class="text-xs-center px-2">
              <v-text-field name="date" label="Date (2019-01-30)" id="date" v-model="date" required></v-text-field>
            </v-flex>
            <v-flex xs6 class="text-xs-center px-2">
              <v-text-field name="time" label="Time (1800 PST)" id="time" v-model="time" required></v-text-field>
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
            <v-flex xs12 class="text-xs-center">
              <v-btn type="submit" large class="primary white--text">Create Event</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: "auth-guard",
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      date: "",
      time: ""
    };
  },
  methods: {
    onCreateEvent() {
      const eventData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.date,
        time: this.time
      };
      this.$store.dispatch("createEvent", eventData);
      this.$router.push("/");
    }
  }
};
</script>
