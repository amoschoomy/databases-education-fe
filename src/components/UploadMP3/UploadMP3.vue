<template>
    <v-file-input prepend-icon="" label="Upload MP3" accept="audio/mp3" @change="onFileChange"></v-file-input>
</template>

<script lang="ts">
  export default {
    name: 'SearchBar',
    methods: {
      onFileChange() {
        alert('Search bar clicked!');
      },
    },
  };
  </script>