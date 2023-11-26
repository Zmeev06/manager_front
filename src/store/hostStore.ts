import { defineStore } from "pinia";
import { ref } from "vue";

export const useHostStore = defineStore("host", () => {
  const value = ref('');

  function addData(data: string) {
    value.value = data;
  }

  return { value, addData };
});
