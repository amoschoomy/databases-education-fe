// src/components/FileUpload/FileUpload.ts
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    handleFileUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files ? input.files[0] : null;

      if (file) {
        console.log("File uploaded:", file);
        // Perform your desired actions with the file, e.g. send it to a server
      } else {
        console.log("No file selected");
      }
    },
  },
});
