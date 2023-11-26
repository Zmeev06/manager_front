
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface DialogBlockProps {
  text: string
}

const typingSpeed = 100;

const displayedText = ref('');
const currentIndex = ref(0);
const showCursor = ref(true);
const showDialog = ref(true);
let typingInterval: ReturnType<typeof setInterval>;



const props = defineProps<DialogBlockProps>()
const startTyping = () => {
  typingInterval = setInterval(() => {
    if (currentIndex.value < props.text.length) {
      displayedText.value += props.text[currentIndex.value];
      currentIndex.value += 1;
    } else {
      clearInterval(typingInterval);
      showCursor.value = false; // Скрыть курсор после завершения печати
    }
  }, typingSpeed);
};

onMounted(() => {
  startTyping();
});

onBeforeUnmount(() => {
  clearInterval(typingInterval);
});
</script>
<template>
  <div class="dialog-wrapper" v-if="showDialog">
    <div class="typing-message text-[14px] md:text-[16px]">
      <span v-if="showCursor" class="cursor">|</span>
      <span>{{ displayedText }}</span>
    </div>
  </div>
</template>
<style scoped>
.dialog-wrapper {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
  border-radius: 15px;
}

.typing-message {
  font-family: 'Arial', sans-serif;
 
  padding: 10px;
}

.cursor {
  animation: blinkCursor 0.7s infinite;
}

@keyframes blinkCursor {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
