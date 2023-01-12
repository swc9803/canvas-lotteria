import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Test1 from "../pages/Test1.vue";
import Test2 from "../pages/Test2.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/test1",
    name: "test1",
    component: Test1,
  },
  {
    path: "/test2",
    name: "test2",
    component: Test2,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
