<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>Profile</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: "auth-guard"
};
</script>