<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-alert v-model="alert" dismissible type="success">Profile Updated Successfully</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    };
  }
};
</script>