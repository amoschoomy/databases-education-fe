<template>
  <div>
  <h1>Summary</h1>
  <div v-text="resultData"></div>
  </div>
 </template>
 
 <style scoped>
 * {
  color: black;
 }
 </style>
 
 <script lang="ts">
 import { defineComponent } from 'vue';
 
 export default defineComponent({
  data() {
  return {
  resultData: this.$route.query.jsonResponse,
  };
  },
 });
 </script>
 