<template>
    <div>
        <h1>Search Results</h1>
        <div class="grid-container">
            <div v-for="result in results" :key="result.document_id" class="grid-item">
                <h2>{{ result.title }}</h2>
                <p>
                    <span>Author(s): </span>
                    <span v-for="(author, index) in result.authors" :key="index">
                        {{ author }}<span v-if="index !== result.authors.length - 1">, </span>
                    </span>
                </p>
                <p>Doc ID: {{ result.document_id }}</p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
interface Result {
    title: string;
    authors: string[];
    document_id: number;
}

export default {
    name: 'SearchResults',
    data() {
        return {
            results: JSON.parse(this.$route.query.results as any) as Result[],
        };
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
  