<template>
  <div>
    <h1>History of Summaries (Total: {{ summaryCount }})</h1>
    <div class="grid-container">
      <div v-for="(summary, index) in summaries" :key="summary.content_id" class="grid-item"
        @click="toggleSelectedSummary(index)">
        <h2>{{ summary.title }}</h2>
        <p>Content ID: {{ summary.content_id }}</p>
        <p>{{ summary.summary }}</p>
        <div v-if="selectedSummaryIndex === index">
          <textarea v-model="editingSummary" @click.stop></textarea>
          <button @click.stop.prevent="updateSummary(summary, editingSummary)">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

interface Summary {
  content_id: number;
  title: string;
  summary: string;
}

export default {
  name: 'History',
  setup() {
    console.log('History setup');
    const store = useStore();
    let userSub = ref(null);
    let summaries = ref([] as Summary[]);
    let summaryCount = ref(0);
    let selectedSummary = ref<Summary | null>(null);

    const fetchSummaries = async () => {
      if (!userSub.value) return;
      try {
        console.log('Fetching summaries for user:', userSub.value);
        const response = await axios.post('http://localhost:3000/get-user-summaries', { uid: userSub.value });
        summaries.value = response.data;
        console.log('Summaries:', summaries.value);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    };

    const fetchSummaryCount = async () => {
      if (!userSub.value) return;
      try {
        console.log('Fetching summary count for user:', userSub.value);
        const response = await axios.post('http://localhost:3000/count-total-summary', { uid: userSub.value });
        summaryCount.value = response.data;
        console.log('Summary count:', summaryCount.value);
      } catch (error) {
        console.error('Error fetching summary count:', error);
      }
    };

    let selectedSummaryIndex = ref<number | null>(null);

    let editingSummary = ref('');

    const toggleSelectedSummary = (index: number) => {
      if (selectedSummaryIndex.value === index) {
        selectedSummaryIndex.value = null;
      } else {
        selectedSummaryIndex.value = index;
        editingSummary.value = summaries.value[index].summary;
      }
    };

    const updateSummary = async (summary: Summary, newSummary: string) => {
      if (!summary) return;
      try {
        console.log('Updating summary:', summary);
        await axios.post('http://localhost:3000/update-summary', { new_summary: newSummary, content_id: summary.content_id });
        summary.summary = newSummary;
        selectedSummaryIndex.value = null;
      } catch (error) {
        console.error('Error updating summary:', error);
      }
    };

    watch(
      () => store.state.user,
      async (newUser) => {
        if (newUser) {
          console.log('User logged in:', newUser);
          userSub.value = newUser.sub;
          await fetchSummaries();
          await fetchSummaryCount();
        }
      },
      { immediate: true } // This option will run the callback immediately with the current value
    );

    return {
      userSub,
      summaries,
      summaryCount,
      toggleSelectedSummary,
      updateSummary,
      selectedSummaryIndex,
      editingSummary,
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
  cursor: pointer;
}

textarea {
  display: block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
  /* Add this line */
}
</style>
