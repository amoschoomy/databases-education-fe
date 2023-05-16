<template>
    <div>
      <h1 style="color:black">Search Results</h1>
      <h2 style="color:black">Click to generate summary</h2>
      <div class="grid-container">
        <div v-for="result in results" :key="result.document_id" class="grid-item" @click="itemClicked(result)">
          <h2>{{ result.title }}</h2>
          <p>
            <span>Author(s): </span>
            <span v-for="(author, index) in result.authors" :key="index">
              {{ author }}<span v-if="index !== result.authors.length - 1">, </span>
            </span>
          </p>
          <p>Doc ID: {{ result.document_id }}</p>
          <!-- Display the summary for this result -->
          <div v-if="result.summary">
            <h3>Summary</h3>
            <p>{{ result.summary }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  interface Result {
    title: string;
    authors: string[];
    document_id: number;
    summary?: string; // Add this to store the summary for each result
  }
  
  export default {
    name: 'SearchResults',
    data() {
      return {
        results: JSON.parse(this.$route.query.results as any) as Result[],
      };
    },
    methods: {
      async itemClicked(result: { title: string; authors: string[]; document_id: number; summary?: string }) {
        console.log(result.document_id);
        const response = await axios.post('http://localhost:3000/summarise-document', {document_id:result.document_id});
        result.summary = response.data; // Store the summary in the result
      },
    },
  };
  </script>
  
  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
    color: black;
  }
  
  .grid-item {
    border: 1px solid #ccc;
    padding: 20px;
  }
  </style>
  