<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
import { useCountdown } from '../../composables/useCountdown'

const { days, hours, minutes, isFinished } = useCountdown()
</script>

<template>
  <SectionWrapper id="countdown" class="countdown" :noFade="true">
    <div class="container">
      <h2 class="section-title">Cuenta Regresiva</h2>
      <p class="countdown-text">⏰ Tiempo restante para que Ana diga 'sí' (esperemos 😅)</p>
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

.countdown .container {
  position: relative;
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
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 24px;
  min-width: 130px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.time-unit::before {
  content: '🌿';
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 1.2rem;
  opacity: 0.6;
}

.time-unit::after {
  content: '🌿';
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 1.2rem;
  opacity: 0.6;
  transform: rotate(180deg);
}

.time-unit:hover {
  transform: translateY(-5px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
}

.time-unit:hover::before,
.time-unit:hover::after {
  opacity: 0.9;
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
