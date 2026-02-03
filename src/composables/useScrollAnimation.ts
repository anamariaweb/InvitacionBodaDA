import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation(options: IntersectionObserverInit = {}) {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    ...options,
  }

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    }, defaultOptions)

    setTimeout(() => {
      const ref = elementRef.value as any
      const el = ref?.$el || ref
      if (el && observer) {
        observer.observe(el)
      }
    }, 100)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    elementRef,
    isVisible,
  }
}
