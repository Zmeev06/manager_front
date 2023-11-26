<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import { useUserStore } from "../../store/userStore";
import Button from "primevue/button";
interface FAQModalProps {
  isOpen: boolean;
}

interface FAQModalEmits {
  (e: "update:isOpen", value: boolean): void;
}

const props = defineProps<FAQModalProps>();

const emit = defineEmits<FAQModalEmits>();

const modal = ref();

const store = useUserStore();

onClickOutside(modal, () => {
  emit("update:isOpen", false);
});

const copyText = async (text: string | undefined) => {
  try {
    if (text) {
      await navigator.clipboard.writeText(text);
      console.log("Текст успешно скопирован в буфер обмена");
    }
  } catch (err) {
    console.error("Ошибка при копировании текста:", err);
  }
};
const closeModal = () => {
  emit("update:isOpen", false);
};
</script>
<template lang="html">
  <Teleport to="body">
    <div
      class="w-screen h-screen absolute flex items-center justify-center bg-[#00000030] top-0"
      v-show="props.isOpen"
    >
      <div
        ref="modal"
        class="p-[20px] bg-white rounded-md w-[300px] md:w-[600px] flex flex-col items-center max-h-[70vh] overflow-auto"
      >
        <h2 class="text-mainBlue text-[28px] mb-3">Как добавить сервер?</h2>
        <div class="p-3 bg-[#e9e9e9] rounded-md flex gap-3 w-fit">
          <p class="w-fit md:w-[250px] overflow-hidden">
            {{ store.value?.pub_key }}
          </p>
          <Button
            icon="pi pi-copy"
            severity="info"
            aria-label="copy"
            @click="copyText(store.value?.pub_key)"
          />
        </div>
        <div class="flex flex-col items-center mt-3">
          <div>
            <p class="text-[20px] w-[300px] text-center">
              Выше предоставлен публичный SSH ключ. Чтоб подключить свой сервер
              к нашему сервису, вам нужно подвязать данный ключ к своему
              серверу.
            </p>
            <p class="text-[20px] w-[300px] text-center mt-3">
              Это делается через панель управления вашим сервером
            </p>
          </div>

          <h3 class="text-[25px] text-mainBlue font-medium my-3">
            Установка для дистрибутивов
          </h3>
          <div class="flex flex-col gap-3">
            <div class="p-3 bg-[#e9e9e9] rounded-md flex gap-3 w-fit">
              <p class="w-[250px] overflow-hidden">
                systemctl enable --now libvirt
              </p>
              <Button
                icon="pi pi-copy"
                severity="info"
                aria-label="copy"
                @click="copyText('systemctl enable --now libvirt')"
              />
            </div>
            <div class="p-3 bg-[#e9e9e9] rounded-md flex gap-3 w-fit">
              <p class="w-[250px] overflow-hidden">
                systemctl enable --now libvirt
              </p>
              <Button
                icon="pi pi-copy"
                severity="info"
                aria-label="copy"
                @click="copyText('systemctl enable --now libvirt-tcp.socket')"
              />
            </div>
            <div class="p-3 bg-[#e9e9e9] rounded-md flex gap-3 w-fit">
              <p class="w-[250px] overflow-hidden">
                vi ~root/.ssh/authorized_keys
              </p>
              <Button
                icon="pi pi-copy"
                severity="info"
                aria-label="copy"
                @click="copyText('vi ~root/.ssh/authorized_keys')"
              />
            </div>
          </div>
          <p class="text-[20px] w-[300px] text-center mt-3">
            Данные команды универсальны для любого из дистрибутивов линукс
          </p>
        </div>
        <div class="mt-3 self-end w-fit h-[40px]">
          <Button
            label="Закрыть"
            severity="danger"
            @click="closeModal"
            class="block"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style lang="scss"></style>
