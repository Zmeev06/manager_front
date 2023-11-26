<template>
  <div>
    <iframe :src="vncUrl" width="100%" height="100%"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Замените на данные вашего VNC-сервера
// const vncHost = "gooseteam.ru";
const vncPort = "5900";
const vncPassword = "";

const vncUrl = ref("");

const route = useRoute();
console.log(route.params);
onMounted(() => {
  const url = `vnc://${route.params.host}:${vncPort}`;
  const params = `?password=${vncPassword}`;
  vncUrl.value = `${url}${params}`;
});
</script>
