import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useCarousel(totalSlides: number, autoAdvanceMs = 5000) {
  const currentSlide = ref(0)
  let intervalId: number | null = null

  const transform = computed(() => `translateX(-${currentSlide.value * 100}%)`)

  function goToSlide(index: number) {
    currentSlide.value = index
  }

  function nextSlide() {
    currentSlide.value = (currentSlide.value + 1) % totalSlides
  }

  function prevSlide() {
    currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
  }

  function startAutoAdvance() {
    if (intervalId) return
    intervalId = window.setInterval(nextSlide, autoAdvanceMs)
  }

  function stopAutoAdvance() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  onMounted(() => {
    startAutoAdvance()
  })

  onUnmounted(() => {
    stopAutoAdvance()
  })

  return {
    currentSlide,
    transform,
    goToSlide,
    nextSlide,
    prevSlide,
    startAutoAdvance,
    stopAutoAdvance,
  }
}
