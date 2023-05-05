<template>
  <div>
    <h1>Result Page</h1>
    <pre>{{ result }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    result: Object,
  },
});
</script>
