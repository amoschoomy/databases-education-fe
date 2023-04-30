<template>
    <v-row class="d-flex align-center" no-gutters>
      <v-text-field label="Search"></v-text-field>
      <v-icon right @click="showAlert">mdi-magnify</v-icon>
    </v-row>
  </template>
  
  <script lang="ts">
  export default {
    name: 'SearchBar',
    methods: {
      showAlert() {
        alert('Search bar clicked!');
      },
    },
  };
  </script>