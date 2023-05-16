<template>
  <v-row class="d-flex align-center" no-gutters>
    <v-text-field label="Search" v-model="keyword"></v-text-field>
    <v-icon right @click="retrieveDocument">mdi-magnify</v-icon>
  </v-row>
</template>

<script lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    let userSub = ref(null);
    watch(
      () => store.state.user,
      (newUser) => {
        if (newUser) {
          userSub.value = newUser.sub;
        }
      },
      { immediate: true } // This option will run the callback immediately with the current value
    );

    const keyword = ref('');

    return {
      keyword,
      userSub
    }
  },
  name: 'SearchBar',
  methods: {
    async retrieveDocument() {

      console.log(this.userSub);
      const response = await axios.post("http://localhost:3000/retrieve-documents", {
        uid: this.userSub,
        keyword: this.keyword,
      });
      console.log(response.data);
      this.$router.push({ name: 'SearchResult', query: { results: JSON.stringify(response.data) } });
    },

  },
};
</script>
