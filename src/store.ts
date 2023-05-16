// store.ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user: any) {
      state.user = user;
    },
  },
});
