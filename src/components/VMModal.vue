<script setup lang="ts">
import InputSwitch from "primevue/inputswitch";
import { onClickOutside } from "@vueuse/core";
import { ref, watch } from "vue";
import Button from "primevue/button";
import { stopVm, startVm } from "../services/vmService";
import { useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";

interface VMModalProps {
  isOpen: boolean;
  name: string;
  state: number;
  id: number;
  memMax: number;
  memUsed: number;
  cpus: number;
  uuid: string;
  host: string;
}

interface VMModalEmits {
  (e: "update:isOpen", value: boolean): void;
}

const props = defineProps<VMModalProps>();

const emit = defineEmits<VMModalEmits>();

const modal = ref();

onClickOutside(modal, () => {
  emit("update:isOpen", false);
});

const closeModal = () => {
  emit("update:isOpen", false);
};
const onModal = ref(false);
const isDisabled = ref(false);
const router = useRouter();
watch(
  () => {
    if (props.state === 1) {
      onModal.value = true;
    } else if (props.state === 5) {
      onModal.value = false;
    }
  },
  //@ts-ignore
  { immediate: true }
);
// const vncHost = "gooseteam.ru";
// const vncPort = "5900";
// const vncPassword = "";

const vncUrl = ref("");
const statusValue = ref(null);
const isLoading = ref(false);
watch(onModal, async () => {
  if (onModal.value) {
    isLoading.value = true;
    const { status } = await startVm(props.uuid, props.host);

    statusValue.value = status;
    if (status === 200) {
      window.open(
        router.resolve(`/vm/${props.host.slice(5, props.host.length)}`).href
      );
    }
  } else {
    isLoading.value = true;
    const { status } = await stopVm(props.uuid, props.host);
    statusValue.value = status;
  }
});

watch(statusValue, () => {
  if (statusValue.value) {
    isLoading.value = false;
  }
});
</script>
<template lang="html">
  <Teleport to="body">
    <div
      class="absolute bg-[#00000030] h-screen w-screen top-0 flex items-center justify-center"
      v-if="props.isOpen"
    >
      <div class="w-[60%] bg-white rounded-md p-5 flex flex-col" ref="modal">
        <h2 class="text-mainBlue text-[30px]">
          {{ `Виртуальная машина ${props.name}` }}
        </h2>
        <div class="mt-3 flex gap-3">
          <p>Включить виртуальную машину</p>
          <InputSwitch v-model="onModal" :disabled="isDisabled" />
        </div>
        <div class="mt-3 bg-[#e9e9e9] rounded-md p-5">
          <h3 class="text-[25px] mb-2">Информация о ВМ</h3>
          <div>
            <div>
              <span class="text-[18px]">{{ `Количество ядер: ` }}</span>
              <span class="text-mainBlue text-[18px] font-medium">{{
                props.cpus
              }}</span>
            </div>
            <div>
              <span class="text-[18px]">{{ `Оперативная память: ` }}</span>
              <span class="text-mainBlue text-[18px] font-medium">{{
                props.memMax
              }}</span>
            </div>
            <div>
              <span class="text-[18px]">{{
                `Используемая оперативная память: `
              }}</span>
              <span class="text-mainBlue text-[18px] font-medium">{{
                props.memUsed
              }}</span>
            </div>
          </div>
        </div>
        <Button
          label="Закрыть"
          @click="closeModal"
          severity="danger"
          class="mt-2 self-end"
        />
      </div>
    </div>
  </Teleport>
  <Teleport to="body">
    <div
      class="bg-[#00000060] w-screen h-screen absolute top-0 flex justify-center items-center"
      v-if="isLoading"
    >
      <ProgressSpinner />
    </div>
  </Teleport>
  <iframe :src="vncUrl" class="w-0 h-0"></iframe>
</template>
<style lang="scss"></style>
