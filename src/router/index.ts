import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import { routerPaths } from "../constants";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: routerPaths.root,
    name: "Home",
    component: Home,
  },
  {
    path: routerPaths.user,
    name: "User",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
