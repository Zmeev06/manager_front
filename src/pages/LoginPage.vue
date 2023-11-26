<script setup lang="ts">
import { useRouter } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import LoginFormVue from "../components/LoginForm.vue";
import { ref, onMounted } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import yoda from "../assets/funny_yoda.png";
import DialogBlock from "../components/ui/DialogBlock.vue";
import { getUser } from "../services/userService";

const router = useRouter();

const isLoading = ref(false);

onMounted(async () => {
  const { status } = await getUser();
  if (status === 200) {
    router.push("/");
  }
});
</script>
<template lang="html">
  <div class="px-[20px] pb-[20px] bg-mainBlue h-screen w-screen relative">
    <AppHeader />
    <div class="flex flex-col items-center justify-center h-[80%]">
      <LoginFormVue v-model:is-loading="isLoading" />

      <div class="flex gap-2 mt-3 items-center">
        <p class="text-white text-[14px]">Нет аккаунта?</p>

        <p
          class="bg-white p-[5px] rounded-md hover:text-white hover:bg-mainBlue border-mainBlue border hover:border-white duration-300 cursor-pointer"
          @click="router.push('registration')"
        >
          Регистрация
        </p>
      </div>
    </div>
    <div
      class="absolute right-20 р-[434px] md:flex flex-col justify-between bottom-0 hidden"
    >
      <div class="h-[134px]">
        <DialogBlock text="С возвращением!" />
      </div>
      <img :src="yoda" class="w-[300px] h-[300px]" />
    </div>
  </div>

  <Teleport to="body">
    <div
      class="absolute h-screen w-screen bg-[#00000030] flex items-center justify-center top-0"
      v-show="isLoading"
    >
      <ProgressSpinner />
    </div>
  </Teleport>
</template>
<style lang="scss"></style>
