<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
import { useCountdown } from '../../composables/useCountdown'

const { days, hours, minutes, isFinished } = useCountdown()
</script>

<template>
  <SectionWrapper id="countdown" class="countdown">
    <div class="container">
      <h2 class="section-title">Cuenta Regresiva</h2>
      <p class="countdown-text">⏰ Tiempo restante para que Ana diga 'sí' (esperamos 😅)</p>
      <div v-if="isFinished" class="countdown-finished">
        <p>¡Es hoy! 🎉</p>
      </div>
      <div v-else class="countdown-timer">
        <div class="time-unit">
          <span class="time-value">{{ days }}</span>
          <span class="time-label">Días</span>
        </div>
        <div class="time-unit">
          <span class="time-value">{{ hours }}</span>
          <span class="time-label">Horas</span>
        </div>
        <div class="time-unit">
          <span class="time-value">{{ minutes }}</span>
          <span class="time-label">Minutos</span>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.countdown {
  background: linear-gradient(135deg, var(--olive) 0%, var(--primary-dark) 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.countdown::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.countdown .container {
  position: relative;
  z-index: 1;
}

.countdown :deep(.section-title) {
  color: white;
}

.countdown :deep(.section-title::after) {
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
}

.countdown-text {
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  margin-bottom: 3rem;
  font-style: italic;
  font-family: 'Lora', serif;
}

.countdown-timer {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.time-unit {
  background: rgba(255,255,255,0.15);
  padding: 2.5rem;
  border-radius: 20px;
  min-width: 130px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255,255,255,0.2);
}

.time-value {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  display: block;
}

.time-label {
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-top: 0.5rem;
  opacity: 0.95;
}

.countdown-finished p {
  font-size: 2rem;
}
</style>
