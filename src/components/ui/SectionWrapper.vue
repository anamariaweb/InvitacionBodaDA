<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  id?: string
  class?: string
}>()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section
    :id="id"
    ref="sectionRef"
    :class="[$props.class, { visible: isVisible }]"
  >
    <slot />
  </section>
</template>

<style scoped>
section {
  padding: 100px 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

section.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }
}
</style>
