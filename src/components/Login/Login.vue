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

export default {
    components: {
        Logout,
    },
    setup() {
        const auth0 = useAuth0();

        return {
            login() {
                auth0.loginWithRedirect();
            },
            isAuthenticated: auth0.isAuthenticated,
        };
    },
};
</script>