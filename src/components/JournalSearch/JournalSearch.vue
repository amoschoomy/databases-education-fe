<!-- src/components/SearchBar/SearchBar.vue -->
<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchTerm"
        @keydown.enter="search"
        placeholder="Type your search query..."
      />
      <button @click="search">Search</button>
    </div>
  </template>
  
  <script lang="ts" src="./script.ts"></script>
  <style src="./JournalSearch.css" scoped></style>
  