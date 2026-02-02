import { ref, onMounted, onUnmounted } from 'vue'
import { WEDDING_DATE } from '../config/constants'

export function useCountdown() {
  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const isFinished = ref(false)

  let intervalId: number | null = null

  function updateCountdown() {
    const weddingDate = new Date(WEDDING_DATE).getTime()
    const now = new Date().getTime()
    const distance = weddingDate - now

    if (distance < 0) {
      isFinished.value = true
      days.value = 0
      hours.value = 0
      minutes.value = 0
      return
    }

    isFinished.value = false
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  }

  // Calcular inmediatamente
  updateCountdown()

  onMounted(() => {
    updateCountdown()
    intervalId = window.setInterval(updateCountdown, 1000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    days,
    hours,
    minutes,
    isFinished,
  }
}
