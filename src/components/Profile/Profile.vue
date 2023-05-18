<template>
  <div class="profile">
    <div v-if="isLoading">Loading ...</div>
    <div v-else>
      <h2>User Profile</h2>
      <button v-if="!isAuthenticated" @click="login">Log in</button>

      <pre v-if="isAuthenticated">
        <p>First Name: {{ user.given_name }}</p>
        <p>Last Name: {{ user.family_name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>UID: {{ user.sub }}</p>
      </pre>
      <Summary :user="user"></Summary>
      <button @click="groupDocsByYear">Count Document by Year</button>
    </div>
  </div>
</template>

<script lang="ts">
// Composition API
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios'
import Summary from '../Summary/Summary.vue';
import { useStore } from 'vuex';

export default {
  components: {
    Summary
  },
  setup() {
    const auth0 = useAuth0();

    return {
      login: () => auth0.loginWithRedirect(),
      user: auth0.user,
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
    };
  },
  data() {
    const store = useStore();
    store.commit('setUser', this.$auth0.user);
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
    };
  },
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },

    async groupDocsByYear() {
      try {
        const response = await axios.post('http://localhost:3000/group-docs-by-year', { uid: this.user.sub }); // replace with your actual endpoint
        const docsByYear = response.data;
        alert(JSON.stringify(docsByYear, null, 2)); // display the data in a popup
      } catch (error) {
        console.error('Error fetching docs by year:', error);
      }
    }
  }
};
</script>

<style scoped>
.profile {
  color: black;
}
</style>
