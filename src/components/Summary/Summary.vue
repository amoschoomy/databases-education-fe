<template>
    <div>
        <h1>History of Summaries (Total: {{ summaryCount }})</h1>
        <div class="grid-container">
            <div v-for="summary in summaries" :key="summary.content_id" class="grid-item">
                <h2>{{ summary.title }}</h2>
                <p>Content ID: {{ summary.content_id }}</p>
                <p>{{ summary.summary }}</p>
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
