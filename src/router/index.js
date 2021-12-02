import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Adverts from "../views/Adverts";

const routes = [
  {
    path: "/",
    name: "Adverts",
    component: () =>
      import("../views/Adverts"),
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/Home"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
