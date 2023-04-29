<!-- src/components/FileUpload/FileUpload.vue -->
<template>
    <div class="file-upload">
      <label for="mp3-file" class="file-upload-label">
        Click here to upload an MP3 file
      </label>
      <input
        type="file"
        id="mp3-file"
        class="file-upload-input"
        @change="handleFileUpload"
        accept="audio/mp3"
      />
    </div>
  </template>
  
  <script src="./script.ts"></script>
  <style src="./design.css" scoped></style>
  