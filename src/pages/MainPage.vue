<script setup lang="ts">
import AppHeader from "../components/AppHeader.vue";
import ServersBlock from "../components/ServersBlock.vue";
import { ref, watch, onMounted } from "vue";
import VMSettings from "../components/VMSettings.vue";
import { getUser } from "../services/userService";
import { useRouter } from "vue-router";
import { getVm } from "../services/getVm";

const currentTab = ref<string | null>("servers");
const router = useRouter();
watch(currentTab, () => {
  if (currentTab.value) {
    localStorage.setItem("currentPage", currentTab.value);
  }
});

const currentServer = ref("");
const vms = ref();

watch(currentServer, async () => {
  if (currentServer) {
    const { data } = await getVm(currentServer.value);
    vms.value = data;
  }
});

onMounted(async () => {
  const { data, status } = await getUser();
  console.log(data, status);
  if (status !== 200) {
    router.push("/auth");
  }
  if (localStorage.getItem("currentPage")) {
    currentTab.value = localStorage.getItem("currentPage");
  }
});
</script>
<template lang="html">
  <div class="px-[20px] pb-[20px] bg-mainBlue h-screen w-screen relative test">
    <AppHeader />
    <div class="w-full h-[90%] flex justify-between">
      <ServersBlock
        v-model:currentTab="currentTab"
        v-model:currentServer="currentServer"
      />
      <VMSettings
        :current-tab="currentTab"
        :vms="vms"
        :current-server="currentServer"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
