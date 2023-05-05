<template>
  <div>
    <h1>Result Page</h1>
    <div v-text="resultData"></div>
  </div>
</template>

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