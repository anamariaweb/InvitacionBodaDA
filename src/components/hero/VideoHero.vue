<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showScrollIndicator = ref(false)

onMounted(() => {
  setTimeout(() => {
    showScrollIndicator.value = true
  }, 3000)
})

function scrollToInvitation() {
  document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="video-hero">
    <video autoplay muted playsinline loop>
      <source src="/boda-video.MOV" type="video/quicktime">
      <source src="/boda-video.MOV" type="video/mp4">
    </video>
    <div
      class="scroll-indicator"
      :class="{ show: showScrollIndicator }"
      @click="scrollToInvitation"
    >
      <span>Desliza para ver más</span>
      <div class="scroll-arrow"></div>
    </div>
  </div>
</template>

<style scoped>
.video-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
}

.video-hero video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 0.9rem;
  animation: fadeIn 1s ease-out 2s both;
  cursor: pointer;
  font-family: 'Lora', serif;
  font-style: italic;
}

.scroll-indicator.show {
  display: flex;
}

.scroll-arrow {
  width: 30px;
  height: 50px;
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
}

.scroll-arrow::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  animation: scrollDown 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scrollDown {
  0% { top: 8px; opacity: 1; }
  100% { top: 30px; opacity: 0; }
}
</style>
