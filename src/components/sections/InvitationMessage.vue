<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
</script>

<template>
  <SectionWrapper id="invitation" class="invitation">
    <div class="container">
      <div class="leaf-decoration">🌿</div>
      <h2 class="names">
        Ana Trujillo
        <span class="separator">&</span>
        Deimar Herrera
      </h2>
      <p class="message">
        ¡Lo hicimos oficial!<br>
        Bueno, casi... Nos falta la mejor parte: celebrar con las personas que amamos.<br>
        Así que guarda la fecha, alista tu mejor sonrisa y prepárate para una noche inolvidable.
      </p>
      <div class="leaf-decoration">🌿</div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.invitation {
  background: var(--secondary) url('/images/backgrounds/background2.png') center center / cover no-repeat;
  text-align: center;
  position: relative;
}

.invitation::before,
.invitation::after {
  content: '';
  position: absolute;
  width: 150px;
  height: 150px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 Q 30 30 10 50 Q 30 70 50 90 Q 70 70 90 50 Q 70 30 50 10' fill='none' stroke='%2387956b' stroke-width='0.5' opacity='0.2'/%3E%3C/svg%3E");
  opacity: 0.3;
}

.invitation::before {
  top: 20px;
  left: 20px;
}

.invitation::after {
  bottom: 20px;
  right: 20px;
  transform: rotate(180deg);
}

.names {
  font-size: clamp(3.5rem, 7vw, 6rem);
  margin-bottom: 2rem;
  color: var(--olive);
  line-height: 1.3;
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.separator {
  font-size: 2.5rem;
  color: var(--primary);
  margin: 0 1.5rem;
  font-family: 'Lora', serif;
}

.message {
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  line-height: 2;
  margin: 0 30% 2rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
}

@media (max-width: 768px) {
  .message {
    margin: 0 10% 2rem;
  }
}

.leaf-decoration {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin: 2rem 0;
}
</style>
