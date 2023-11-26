<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import { ref, watch } from "vue";
import { getImages } from "../services/getImages";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { addVm } from "../services/addVm";
interface NewVmModalProps {
  isOpen: boolean;
  host: string;
}
interface NewVmModalEmits {
  (e: "update:isOpen", value: boolean): void;
}

const emit = defineEmits<NewVmModalEmits>();

const props = defineProps<NewVmModalProps>();
const currentDist = ref();
const dists = ref<string[]>([]);
const name = ref("");
const cpus = ref();
const cpusValues = [{ name: "1" }];

watch(
  async () => {
    if (props.isOpen) {
      const { data } = await getImages(props.host);
      // @ts-ignore
      dists.value = data.map((item) => ({ name: item }));
    }
  },
  //@ts-ignore
  { immediate: true }
);
const modal = ref();
const allChecked = ref(false);

watch([cpus, name, currentDist], () => {
  if (cpus.value && name.value) {
    allChecked.value = true;
  } else {
    allChecked.value = false;
  }
});
const closeModal = () => {
  emit("update:isOpen", false);
};

watch(cpus, () => {
  console.log(cpus.value);
});

const fetchAddVm = async () => {
  const cpusValue = +cpus.value.name;
  const imageValue = currentDist.value.name;
  await addVm(
    name.value,
    cpusValue,
    imageValue,
    props.host.slice(5, props.host.length)
  );
  closeModal();
  name.value = "";
  cpus.value = "";
  currentDist.value = "";
};
</script>
<template lang="html">
  <Teleport to="body">
    <div
      class="bg-[#00000030] flex justify-center items-center w-screen h-screen top-0 absolute"
      v-if="props.isOpen"
    >
      <div class="p-[20px] bg-white rounded-md" ref="modal">
        <div>
          <h2 class="text-[28px] text-mainBlue mb-5">
            Добавление виртуальной машины
          </h2>
        </div>

        <div class="flex flex-col gap-3">
          <InputText
            placeholder="Имя виртуальной машины"
            type="text"
            v-model="name"
            class="w-full"
          />
          <Dropdown
            v-model="currentDist"
            :options="dists"
            optionLabel="name"
            placeholder="Выберите образ диска"
            class="w-full md:w-14rem"
          />
          <Dropdown
            v-model="cpus"
            :options="cpusValues"
            optionLabel="name"
            placeholder="Выберите количество ядер"
            class="w-full md:w-14rem"
          />
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
            :disabled="!allChecked"
            @click="fetchAddVm"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style lang="scss"></style>
