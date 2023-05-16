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
        <v-text-field
          label="Audio Description (Optional)"
          v-model="audioDescription"
        ></v-text-field>
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
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { uploadAudioFile } from './endpoint';

export default {

  
  name: 'UploadMP3',
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
  return {
    userSub
  }},
  data() {
    return {
      selectedFile: null,
      audioDescription: '',
    };
  },
  methods: {
    onFileChange(event: { target: { files: null[]; }; }) {
      console.log('File input changed');
      this.selectedFile = event.target.files[0];
    },
    async confirmUpload() {
      if (!this.selectedFile) return;

      const endpointURL = 'http://localhost:3000/video-summary/';

      try {
        const jsonResponse = await uploadAudioFile(this.userSub!,this.selectedFile, this.audioDescription, endpointURL);
        console.log(jsonResponse);
        this.$router.push({ name: 'ResultPage', query: { jsonResponse: jsonResponse } });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
  },
};
</script>

