<script lang="ts" setup>
import { VApp, VAppBar, VAppBarNavIcon, VToolbarTitle, VBtn, VIcon } from 'vuetify/components'
import SearchBar from './components/SearchBar/SearchBar.vue'
import UploadMP3 from './components/UploadMP3/UploadMP3.vue'
import Login from './components/Login/Login.vue'
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Academic Article and Video Summary</v-toolbar-title>
      <v-spacer></v-spacer>

      <Login />
      <v-btn @click="goToProfile" text>
        <v-icon left>mdi-account</v-icon>Profile
      </v-btn>

    </v-app-bar>
    <v-container fluid fill-height class="full-height">
      <v-row no-gutters class="full-height">
        <v-col cols="12" sm="4" class="text-left left-column">
        </v-col>
        <v-col cols="12" sm="4" class="text-center center-column">
          <v-row no-gutters>
            <SearchBar />
            <v-col cols="12" class="my-3">Or upload an audio file (less than 25MB)</v-col>
            <UploadMP3 />
          </v-row>
        </v-col>
        <v-col cols="12" sm="4" class="text-center right-column">
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
  
<script lang="ts">
export default {
  name: 'HomePage',
  methods: {
    goToProfile() {
      this.$router.push({ path: '/profile' });
    },
  },
};
</script>
<style scoped>
.full-height {
  height: calc(100vh - 64px);
  /* margin-right: 0%;
  margin-left: 0%; */
  /* Subtracting the height of the v-app-bar (default 64px) */
}

.title {
  text-align: center;
}

.left-column {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  word-break: break-word;
}

.center-column,
.right-column {
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
}
</style>