<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
import OptimizedImage from '../ui/OptimizedImage.vue'
</script>

<template>
  <SectionWrapper id="gifts" class="gifts">
    <div class="container">
      <h2 class="section-title">Regalos</h2>
      <div class="gifts-content">
        <p>
          Tu compañía es lo que más valoramos, pero si quieres contribuir a la luna de miel
          para consentir a los novios... busca el buzón en la fiesta
        </p>
        <div class="mailbox">
          <OptimizedImage src="/images/dresscode/sobres.png" alt="Lluvia de sobres" />
        </div>
        <p class="lluvia-title">💵 <strong>Lluvia de sobres</strong></p>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.gifts {
  background-color: var(--secondary);
  background-image: url('/images/backgrounds/background2.png');
  background-image: image-set(
    url('/images/backgrounds/background2.webp') type('image/webp'),
    url('/images/backgrounds/background2.png') type('image/png')
  );
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
}

.gifts-content {
  max-width: 700px;
  margin: 0 auto;
}

.mailbox {
  width: 280px;
  height: 280px;
  margin: 2rem auto;
  position: relative;
  animation: float 3s ease-in-out infinite;
}

.lluvia-title {
  font-size: 1.5rem;
  margin-top: 1rem;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.mailbox :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 40px rgba(56, 87, 54, 0.3));
}

.gifts p {
  font-size: 1.3rem;
  line-height: 2;
  color: var(--text-light);
  font-family: 'Lora', serif;
}

.gifts-content > p:first-child {
  margin: 0 35% 0 35%;
}

@media (max-width: 768px) {
  .gifts-content > p:first-child {
    margin: 0 10% 0 10%;
  }
}
</style>
