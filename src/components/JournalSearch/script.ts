// src/components/SearchBar/SearchBar.ts
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const searchTerm = ref('');

    const search = async () => {
      if (searchTerm.value.trim()) {
        console.log('Searching for:', searchTerm.value);
        // Perform your API request here using searchTerm.value as the query
      } else {
        console.log('Empty search query');
      }
    };

    return {
      searchTerm,
      search,
    };
  },
});
