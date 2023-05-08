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
      </pre>
    <button>History</button>
    </div>
  </div>
</template>

<style scoped>
.profile {
  color: black;
}
</style>
  <script lang="ts">
    // Composition API
    import { useAuth0 } from '@auth0/auth0-vue';
  
    export default {
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
        return {
          user: this.$auth0.user,
          isAuthenticated: this.$auth0.isAuthenticated,
          isLoading: this.$auth0.isLoading,
        };
      },
      methods: {
        login() {
          this.$auth0.loginWithRedirect();
        }
      }
    };
  </script>