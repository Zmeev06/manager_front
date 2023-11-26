import { defineStore } from "pinia";
import { ref } from "vue";

interface userData {
  login: string;
  pub_key: string;
  servers: string[];
}

export const useUserStore = defineStore("user", () => {
  const value = ref<userData>();

  function addData(data: userData) {
    value.value = data;
  }

  return { value, addData };
});
