<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-card>
          <v-container fluid>
            <v-layout row wrap justify-center align-center>
              <v-flex xs12 sm4 class="px-2">
                <v-card-media
                  src="https://res.cloudinary.com/missionwebdev/image/upload/c_scale,f_auto,q_80,w_800/v1551386116/VOWAID/oscars2019.jpg"
                  alt="event"
                ></v-card-media>
              </v-flex>
              <v-flex xs12 sm8 class="text-xs-center px-2">
                <h3 class="display-1 primary--text">Title of Event</h3>
                <v-divider class="mt-2 mb-3"></v-divider>
                <p class="title">Date of Event</p>
                <p
                  class="subheading text-xs-left"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptate quibusdam hic ipsa beatae sit fugiat aliquam ab repellat, iste est repellendus dolores eius culpa!</p>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "view-event",
  layout: "events"
};
</script>