// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import ResultsPage from '../components/ResultsPage/ResultsPage.vue';
import NotFound from '../components/NotFound/NotFound.vue';

import Home from '../Home.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/result',
    name: 'ResultPage',
    component: ResultsPage,
    props: (route: { query: { data: any; }; }) => ({ resultData: route.query.data })

  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
