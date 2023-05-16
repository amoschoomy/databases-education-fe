<template>
    <div>
        <h1>History of Summaries</h1>
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

    watch(
      () => store.state.user,
      async (newUser) => {
        if (newUser) {
            console.log('User logged in:', newUser);
          userSub.value = newUser.sub;
          await fetchSummaries();
        }
      },
      { immediate: true } // This option will run the callback immediately with the current value
    );

    return {
      userSub,
      summaries,
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
  