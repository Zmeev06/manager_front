<script setup lang="ts">
import InlineSvg from "vue-inline-svg";
import serverIcon from "../assets/server.svg";
import NewModal from "./ui/NewModal.vue";
import DialogBlock from "./ui/DialogBlock.vue";
import { ref, onMounted } from "vue";
import yoda from "../assets/hello_yoda.png";
import Button from "primevue/button";
import { getUser } from "../services/userService";
import FAQModal from "./ui/FAQModal.vue";
import { useUserStore } from "../store/userStore";

interface ServersBlockProps {
  currentTab: string | null;
  currentServer: string;
}

interface ServersBlockEmits {
  (e: "update:currentTab", value: string): void;
  (e: "update:currentServer", value: string): void;
}

const emit = defineEmits<ServersBlockEmits>();

const isOpenModal = ref(false);
const isOpenFAQ = ref(false);

const openModal = () => {
  isOpenModal.value = true;
};

const props = defineProps<ServersBlockProps>();

const store = useUserStore();

const toServer = (name: string) => {
  emit("update:currentTab", "vm");
  emit("update:currentServer", name);
};

const backPage = () => {
  emit("update:currentTab", "servers");
};

const servers = ref<string[]>([]);

onMounted(async () => {
  const { data } = await getUser();
  servers.value = data.servers || [];
  store.addData(data);
});

const openFaq = () => {
  isOpenFAQ.value = true;
};
</script>
<template lang="html">
  <div
    class="relative bg-white h-[100%] rounded-md py-[20px] px-[30px] duration-500 md:flex flex-col justify-between"
    :class="
      props.currentTab === 'servers' ? 'w-full' : 'hidden md:w-[22%] md:flex'
    "
  >
    <div>
      <div class="md:flex md:items-center gap-5">
        <div class="flex gap-5 max-h-[40px] items-center">
          <h2 class="text-[20px] md:text-[44px] text-mainBlue">Серверы</h2>
          <Button
            icon="pi pi-plus"
            severity="info"
            aria-label="User"
            size="small"
            @click="openModal"
          />
        </div>
        <Button
          label="Как привязать сервер"
          icon="pi pi-question"
          iconPos="right"
          severity="info"
          size="small"
          v-show="props.currentTab === 'servers'"
          class="mt-3 md:mt-0"
          @click="openFaq"
        />
      </div>
      <div class="">
        <ul
          class="ml-6 mt-3 w-[250px] overflow-auto max-h-[68vh]"
          v-if="servers.length > 1"
        >
          <li
            class="cursor-pointer hover:bg-[#00000020] rounded-md p-2 text-mainBlue/80 w-fit flex gap-2 items-center text-[20px] duration-300"
            @click="toServer(item)"
            v-for="(item, index) in servers"
            :key="index"
            v-show="item !== ''"
          >
            <InlineSvg
              :src="serverIcon"
              class="text-mainBlue w-[20px] h-[20px]"
            />
            {{ item }}
          </li>
        </ul>
      </div>
      <Button
        icon="pi pi-plus"
        severity="info"
        aria-label="User"
        label="Добавить сервер"
        size="small"
        @click="openModal"
        class="mt-5"
        v-show="servers.length === 1"
      />
    </div>
    <div
      class="absolute right-30 md:right-20 bottom-0 р-[434px] flex flex-col justify-between"
      v-show="props.currentTab === 'servers'"
    >
      <div class="h-[134px] w-[300px] md:w-auto">
        <DialogBlock
          text="Привет, добро пожаловать в серверную. Кликай на сервер и продолжай работу с ним!"
        />
      </div>
      <img :src="yoda" class="w-[150px] h-[150px] md:w-[300px] md:h-[300px]" />
    </div>
    <Button
      label="Вернуться к серверам"
      v-show="props.currentTab !== 'servers'"
      size="small"
      @click="backPage"
    />
  </div>
  <NewModal v-model:is-open="isOpenModal" />
  <FAQModal v-model:is-open="isOpenFAQ" />
</template>
<style lang="scss"></style>
