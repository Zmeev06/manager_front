<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import InlineSvg from "vue-inline-svg";
import close from "../../assets/close.svg";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import { addServer } from "../../services/addServer";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import SuccessModal from "./SuccessModal.vue";

interface NewModalProps {
  isOpen: boolean;
}

interface NewModalEmits {
  (e: "update:isOpen", value: boolean): void;
}

const props = defineProps<NewModalProps>();

const emit = defineEmits<NewModalEmits>();

const modal = ref();

const isSuccess = ref(false);

const closeModal = () => {
  emit("update:isOpen", false);
};

onClickOutside(modal, () => {
  emit("update:isOpen", false);
});

const serverIp = ref("");
const read = ref(false);
const statusValue = ref();

const toast = useToast();

const showWarn = () => {
  toast.add({
    severity: "warn",
    summary: "Произошла ошибка",
    detail: "Повторите попытку",
    life: 3000,
  });
};

const showSuccess = () => {
  isSuccess.value = true
};

const fetchAddServer = async () => {
  if (read) {
    const { status } = await addServer(serverIp.value);
    statusValue.value = status;
    if (statusValue.value === 200) {
      emit("update:isOpen", false);
      showSuccess();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      showWarn();
    }
  }
};
</script>
<template lang="html">
  <Teleport to="body">
    <Toast />
    <div
      class="fixed w-screen h-screen flex justify-center items-center bg-[#00000030] z-50 top-0 left-0"
      v-if="props.isOpen"
    >
      <div class="w-screen sm:w-[40%] bg-white rounded-md py-5" ref="modal">
        <div class="px-5 border-b flex justify-between border-[#333]">
          <p class="text-[24px] text-mainBlue">Добавление сервера</p>
          <InlineSvg
            :src="close"
            class="text-mainBlue hover:text-mainBlue/70 cursor-pointer"
            @click="closeModal"
          />
        </div>
        <div class="mt-[30px] px-5 flex flex-col gap-[25px]">
          <span class="p-float-label">
            <InputText
              id="username"
              v-model="serverIp"
              class="w-full"
              size="small"
            />
            <label for="username">IP сервера</label>
          </span>
          <div class="flex align-items-center">
            <Checkbox
              v-model="read"
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
            />
            <label for="ingredient1" class="ml-2">
              Я прочитал как добавлять сервер
            </label>
          </div>
        </div>
        <div class="px-5 mt-[20px] flex gap-[15px] justify-end">
          <Button
            label="Отмена"
            icon="pi pi-times"
            severity="danger"
            size="small"
            @click="closeModal"
          />
          <Button
            label="Добавить"
            icon="pi pi-check"
            severity="info"
            size="small"
            :disabled="!read"
            @click="fetchAddServer"
          />
        </div>
      </div>
    </div>
  </Teleport>
  <SuccessModal :isOpen="isSuccess" />
</template>
<style lang="scss"></style>
