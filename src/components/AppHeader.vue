<script setup lang="ts">
import Button from "primevue/button";
import logo from "../assets/Logo.svg";
import { onMounted, ref } from "vue";
import { getUser } from "../services/userService";
import { useRoute, useRouter } from "vue-router";

const user = ref();
onMounted(async () => {
  const { data } = await getUser();
  user.value = data?.login;
});

const router = useRouter();
const route = useRoute();
console.log(route.path);

const logOut = () => {
  localStorage.removeItem("jwtToken");
  router.push("/auth");
};
</script>
<template lang="html">
  <div class="py-2 bg-mainBlue flex justify-between items-center">
    <img :src="logo" />
    <div class="flex items-center gap-2" v-show="route.path === '/'">
      <p v-show="user" class="text-white">{{ user }}</p>
      <Button
        icon="pi pi-sign-out"
        severity="info"
        aria-label="Exit"
        @click="logOut"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
