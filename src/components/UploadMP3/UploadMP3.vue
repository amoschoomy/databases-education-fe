<template>
  <v-container>
    <v-row>
      <v-col>
        <v-file-input
          prepend-icon=""
          label="Upload MP3"
          accept="audio/mp3, audio/wav, audio/webm"
          @change="onFileChange"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="confirmUpload" :disabled="!selectedFile">Confirm Upload</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { uploadAudioFile } from './endpoint';

export default {
  name: 'UploadMP3',
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileChange(event: { target: { files: null[]; }; }) {
      console.log('File input changed');
      this.selectedFile = event.target.files[0];
    },
    async confirmUpload() {
      if (!this.selectedFile) return;

      const endpointURL = 'http://127.0.0.1:8000/summarise-audio/';

      try {
        const jsonResponse = await uploadAudioFile(this.selectedFile, endpointURL);
        console.log(jsonResponse);
        this.$router.push({ name: 'ResultPage', query: { jsonResponse: jsonResponse } });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
  },
};
</script>
