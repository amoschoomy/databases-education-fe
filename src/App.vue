<script setup>
import FileUpload from './components/FileUpload/FileUpload.vue'
import JournalSearch from './components/JournalSearch/JournalSearch.vue'
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <div class="container">
    <FileUpload />
    <JournalSearch />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
