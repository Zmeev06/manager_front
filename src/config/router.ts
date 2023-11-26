import { createRouter, createWebHashHistory } from "vue-router";
import MainPageVue from "../pages/MainPage.vue";
import LoginPageVue from "../pages/LoginPage.vue";
import RegisterPageVue from "../pages/RegisterPage.vue";
import VmPage from "../pages/VmPage.vue";

const routes = [
  { path: "/", component: MainPageVue },
  { path: "/auth", component: LoginPageVue },
  { path: "/registration", component: RegisterPageVue },
  { path: "/vm/:host", component: VmPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
