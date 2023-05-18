<template>
    <div>
      <v-btn @click="login" text v-if="!isAuthenticated">
        <v-icon left>mdi-login</v-icon>Login
      </v-btn>
      <Logout v-else />
    </div>
  </template>
  
  <script lang="ts">
  // Composition API
  import { useAuth0 } from '@auth0/auth0-vue';
  import Logout from '../Logout/Logout.vue';
  import axios from 'axios';
  import { watch } from 'vue';
  import { useStore } from 'vuex';

  export default {
    components: {
      Logout,
    },
    setup() {
        const store = useStore();

      const { isAuthenticated, loginWithRedirect, user,  } = useAuth0();
      console.log(isAuthenticated.value);
  
      // Watch for changes to isAuthenticated property
      watch(
        isAuthenticated,
        async (newVal) => {
          console.log("isAuthenticated changed:", newVal);
        }
      );
  
      // Watch for changes to user property
      watch(
        user,
        async (newVal) => {
          if (newVal) {
            console.log("user changed:", newVal);
            store.commit('setUser', newVal);
            await axios.post('http://localhost:3000/add-user', user.value);
          }
        }
      );
  
      return {
        login: loginWithRedirect,
        isAuthenticated,
      };
    },
  };
  </script>
  