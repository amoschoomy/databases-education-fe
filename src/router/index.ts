// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import ResultsPage from "../components/ResultsPage/ResultsPage.vue";
import NotFound from "../components/NotFound/NotFound.vue";
import Profile from "../components/Profile/Profile.vue";
import SearchResultPage from "../components/SearchResult/SearchResult.vue";

import Home from "../Home.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },

  {
    path: "/result",
    name: "ResultPage",
    component: ResultsPage,
    props: (route: { query: { data: any } }) => ({
      resultData: route.query.data,
    }),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/search-result",
    name: "SearchResult",
    component: SearchResultPage,
    props: (route: { query: { data: any } }) => ({
      result: route.query.data,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
