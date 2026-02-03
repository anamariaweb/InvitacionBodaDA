<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  id?: string
  class?: string
  noFade?: boolean
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

  setTimeout(() => {
    if (sectionRef.value && observer) {
      observer.observe(sectionRef.value)
    }
  }, 100)
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
    :class="[$props.class, { visible: isVisible, 'no-fade': noFade }]"
  >
    <slot />
  </section>
</template>

<style scoped>
section {
  padding: 100px 0;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s ease, transform 0.8s ease;
  position: relative;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, rgba(245, 241, 232, 0.8), transparent);
  pointer-events: none;
  z-index: 2;
}

section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to top, rgba(245, 241, 232, 0.8), transparent);
  pointer-events: none;
  z-index: 2;
}

section.no-fade::before,
section.no-fade::after {
  display: none;
}

@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }

  section::before,
  section::after {
    height: 40px;
  }
}
</style>
