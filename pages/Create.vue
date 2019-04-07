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
            <v-flex xs12 class="text-xs-center mt-3">
              <v-btn @click="onPickFile" small class="secondary">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              >
            </v-flex>
            <v-flex xs6 class="mb-4">
              <v-img :src="imageUrl"></v-img>
            </v-flex>
            <v-flex xs12 class="text-xs-center">
              <v-btn
                type="submit"
                large
                class="primary white--text"
                :disabled="loading"
                :loading="loading"
              >
                Create Event
                <span slot="loader" class="custom-loader">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </span>
              </v-btn>
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
      time: "",
      image: null,
      ready: false
    };
  },
  methods: {
    onCreateEvent() {
      const eventData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.date,
        time: this.time
      };
      this.$store.dispatch("createEvent", eventData);
      this.ready = true;
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file.");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    loading() {
      if (this.ready && !this.loading) {
        this.$store.dispatch("loadEvents");
        this.$router.push("/");
      }
    }
  }
};
</script>
