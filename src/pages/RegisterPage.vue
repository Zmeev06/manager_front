<script setup lang="ts">
import { useRouter } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import RegisterForm from "../components/RegisterForm.vue";
import { ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import yoda from '../assets/coffee_yoda.png'
import DialogBlock from "../components/ui/DialogBlock.vue";

const router = useRouter();

const isLoading = ref(false);
</script>
<template lang="html">
  <div class="px-[20px] pb-[20px] bg-mainBlue h-screen w-screen relative">
    <AppHeader />
    <div class="flex flex-col items-center justify-center h-[80%]">
      <RegisterForm v-model:is-loading="isLoading" />

      <div class="flex gap-2 mt-3 items-center">
        <p class="text-white text-[14px]">Уже зарегистрированы?</p>

        <p
          class="bg-white p-[5px] rounded-md hover:text-white hover:bg-mainBlue border-mainBlue border hover:border-white duration-300 cursor-pointer"
          @click="router.push('/auth')"
        >
          Вход
        </p>
      </div>
    </div>
    <div
      class="absolute right-20 р-[434px] md:flex flex-col justify-between bottom-0 hidden"
    >
      <div class="h-[134px]">
        <DialogBlock text="Рад приветствовать! Присоединяйся :)" />
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
