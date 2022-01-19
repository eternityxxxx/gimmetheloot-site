import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Adverts",
    component: () => import("../views/Adverts"),
  },
  {
    path: "/login",
    name: "Sing in",
    component: () => import("../views/Singin"),
  },
  {
    path: "/signup",
    name: "Sign up",
    component: () => import("../views/Signup"),
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: () => import("../views/Wishlist"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
