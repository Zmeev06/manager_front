<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import vmIcon from "../assets/vmIcon.svg";
import DialogBlock from "./ui/DialogBlock.vue";
import { ref } from "vue";
import yoda from "../assets/on_yoda.png";
import VMModal from "./VMModal.vue";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import NewVmModal from "./NewVmModal.vue";
import { removeVm } from "../services/vmService";

interface info {
  cpus: number;
  id: number;
  mem_max: number;
  mem_used: number;
  name: string;
  state: number;
  uuid: string;
}

interface ServersBlockProps {
  currentTab: string | null;
  vms: info[];
  currentServer: string;
}

const isOpenModal = ref(false);
const idValue = ref();
const memMaxValue = ref();
const memUsedValue = ref();
const nameValue = ref();
const stateValue = ref();
const uuidValue = ref();
const cpusValue = ref();

const router = useRouter();

const openModal = (
  cpus: number,
  id: number,
  memMax: number,
  mem_used: number,
  name: string,
  state: number,
  uuid: string
) => {
  (idValue.value = id), (cpusValue.value = cpus);
  memMaxValue.value = memMax;
  memUsedValue.value = mem_used;
  nameValue.value = name;
  stateValue.value = state;
  uuidValue.value = uuid;
  isOpenModal.value = true;
};

const props = defineProps<ServersBlockProps>();

const openVm = (host: string) => {
  window.open(router.resolve(`/vm/${host.slice(5, host.length)}`).href);
};

const isOpenNewVM = ref(false);

const deleteVm = async (id: string, host: string) => {
  await removeVm(id, host);
};

const openNewVm = () => {
  isOpenNewVM.value = true;
};
</script>
<template lang="html">
  <div
    class="relative bg-white h-[100%] rounded-md py-[20px] px-[30px] duration-500"
    :class="props.currentTab === 'vm' ? 'w-full md:w-[75%]' : 'w-[20%]'"
    v-if="props.currentTab === 'vm'"
  >
    <div class="md:flex md:items-center gap-5">
      <div class="flex gap-5 max-h-[40px] items-center">
        <h2 class="text-[20px] md:text-[44px] text-mainBlue">
          Виртуальные машины
        </h2>
        <Button
          icon="pi pi-plus"
          severity="info"
          aria-label="User"
          size="small"
          @click="openNewVm"
        />
      </div>
    </div>
    <ul class="ml-6 mt-3 max-h-[78vh]" v-if="props.vms">
      <div
        class="w-fit flex gap-2 items-center"
        v-for="(item, index) in props.vms"
        :key="index"
      >
        <li
          class="cursor-pointer hover:underline-offset-1 hover:bg-[#00000010] p-1 rounded-md text-mainBlue/80 w-fit flex gap-2 items-center text-[20px]"
          @click="
            openModal(
              item.cpus,
              item.id,
              item.mem_max,
              item.mem_used,
              item.name,
              item.state,
              item.uuid
            )
          "
        >
          <InlineSvg :src="vmIcon" class="text-mainBlue w-[20px] h-[20px]" />
          <p>{{ item.name }}</p>
          <div class="border rounded-full p-[2px]">
            <div
              class="w-[15px] h-[15px] rounded-full"
              :style="{
                backgroundColor:
                  item.state === 1
                    ? '#008000'
                    : item.state === 4
                    ? '#FFFF00'
                    : '#FF0000',
              }"
            ></div>
          </div>
        </li>
        <Button
          icon="pi pi-globe"
          severity="info"
          aria-label="Exit"
          @click="openVm(props.currentServer)"
        />
        <Button
          icon="pi pi-delete-left"
          severity="info"
          aria-label="Exit"
          @click="deleteVm(item.uuid, props.currentServer)"
        />
      </div>
    </ul>
    <Button
      v-if="!props.vms"
      label="Добавить виртуальную машину"
      class="mt-5"
      @click="openNewVm"
    />
    <div
      v-if="!props.currentServer"
      class="mt-5 bg-[#FF0000] rounded-md w-fit p-[20px]"
    >
      <p class="text-[30px] text-mainBlue">Выберите сервер</p>
    </div>

    <div
      class="absolute right-30 md:right-20 bottom-0 р-[434px] flex flex-col justify-between"
    >
      <div class="h-[134px] w-[300px] md:w-auto">
        <DialogBlock
          text="На этой странице представлена информация о виртуальной машине. Так же здесь ты можешь ее включить"
        />
      </div>
      <img :src="yoda" class="w-[300px] h-[300px]" />
    </div>
  </div>
  <VMModal
    v-model:is-open="isOpenModal"
    :cpus="cpusValue"
    :name="nameValue"
    :id="idValue"
    :mem-max="memMaxValue"
    :mem-used="memUsedValue"
    :state="stateValue"
    :uuid="uuidValue"
    :host="props.currentServer"
  />
  <NewVmModal v-model:is-open="isOpenNewVM" :host="currentServer" />
</template>
<style lang="scss"></style>
