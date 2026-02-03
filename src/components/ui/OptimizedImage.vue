<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  src: string
  alt: string
  loading?: 'lazy' | 'eager'
}>()

import { useAttrs } from 'vue'
const attrs = useAttrs()

// Convierte path de imagen a versión WebP
function toWebP(src: string): string {
  return src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
}
</script>

<template>
  <picture v-bind="attrs">
    <source :srcset="toWebP(src)" type="image/webp">
    <img :src="src" :alt="alt" :loading="loading || 'lazy'">
  </picture>
</template>

<style scoped>
picture {
  display: block;
}

picture img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
