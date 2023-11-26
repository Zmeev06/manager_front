<script setup lang="ts">
import yoda from "../../assets/funny_yoda.png";
interface SuccessModalProps {
  isOpen: boolean;
}
const props = defineProps<SuccessModalProps>();
</script>
<template lang="html">
  <Teleport to="body">
    <div
      class="w-screen h-screen bg-[#00000030] absolute top-0 flex justify-center items-center"
      v-show="props.isOpen"
    >
      <div class="p-[20px] bg-white flex flex-col items-center rounded-md">
        <p class="text-[20px]">Успешно</p>
        <img :src="yoda" />
      </div>
    </div>
  </Teleport>
</template>
<style lang="scss"></style>
