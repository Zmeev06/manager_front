<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref, watch } from "vue";
import { loginUser } from "../services/authService";
import { useRouter } from "vue-router";

interface LoginFormEmits {
  (e: "update:isLoading", value: boolean): void;
}

const router = useRouter();

const emit = defineEmits<LoginFormEmits>();

const login = ref("");
const password = ref("");

const emptyData = ref(false);
const statusValue = ref();

const fetchLoginUser = async () => {
  if (password.value === "" || login.value === "") {
    emptyData.value = true;
  } else {
    emit("update:isLoading", true);
    const { status } = await loginUser(login.value, password.value);

    statusValue.value = status;
  }
};

watch(statusValue, () => {
  if (statusValue.value) {
    emit("update:isLoading", false);
    if (statusValue.value === 200) {
      router.push("/");
    }
  }
});

watch([login, password], () => {
  statusValue.value = 0;
  emptyData.value = false;
});
</script>
<template lang="html">
  <div class="h-[30px]">
    <p class="mb-3 text-[#e34234]" v-show="emptyData">
      Все поля должны быть заполнены
    </p>
    <p class="mb-3 text-[#e34234]" v-show="statusValue === 401">
      Неправильный пароль
    </p>
    <p class="mb-3 text-[#e34234]" v-show="statusValue === 404">
      Неправильный логин
    </p>
  </div>
  <div class="bg-white p-[20px] rounded-md w-[300px]">
    <div>
      <p class="text-mainBlue text-[20px]">Авторизация</p>
      <div class="flex flex-col gap-7 mt-7">
        <span class="p-float-label">
          <InputText id="username" v-model="login" class="w-full" />
          <label for="username">Логин</label>
        </span>
        <span class="p-float-label">
          <InputText
            id="username"
            v-model="password"
            class="w-full"
            type="password"
          />
          <label for="username">Пароль</label>
        </span>
      </div>
      <Button
        label="Войти"
        severity="info"
        class="w-full mt-[20px]"
        @click="fetchLoginUser"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
