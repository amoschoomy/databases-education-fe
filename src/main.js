import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';


// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});


createApp(App).use(vuetify).use(router).use(createAuth0({
  domain: "dev-r6iy2mir688kz5ll.us.auth0.com",
  clientId: "y5yuuttKwVlwolrBGup752mvpHsKdKd8",
  authorizationParams: {
    redirect_uri: window.location.origin
  }
})).mount('#app');
