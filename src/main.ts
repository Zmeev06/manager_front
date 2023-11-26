import { createApp } from "vue";
import "./style.css";
import "./theme.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./config/router";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";
const store = createPinia();
import PrimeVue from "primevue/config";

createApp(App)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .use(store)
  .mount("#app");
