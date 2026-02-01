<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
</script>

<template>
  <SectionWrapper id="gifts" class="gifts">
    <div class="container">
      <h2 class="section-title">Regalos</h2>
      <div class="gifts-content">
        <div class="mailbox">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mailboxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:rgb(56, 87, 54);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgb(40, 65, 38);stop-opacity:1" />
              </linearGradient>
            </defs>
            <!-- Mailbox body -->
            <rect x="50" y="80" width="100" height="80" rx="10" fill="url(#mailboxGradient)"/>
            <!-- Mailbox top -->
            <path d="M 50 80 Q 100 40 150 80" fill="rgb(90, 120, 88)"/>
            <!-- Flag -->
            <rect x="145" y="70" width="5" height="40" fill="rgb(40, 65, 38)"/>
            <path d="M 150 75 L 180 75 L 180 90 L 150 90 Z" fill="rgb(56, 87, 54)"/>
            <!-- Slot -->
            <rect x="70" y="110" width="60" height="5" rx="2" fill="#3a4a2f" opacity="0.3"/>
            <!-- Hearts -->
            <text x="100" y="135" font-size="24" text-anchor="middle" fill="white">💰</text>
          </svg>
        </div>
        <p>
          💵 <strong>Lluvia de sobres</strong><br><br>
          Tu compañía es lo que más valoramos, pero si quieres contribuir a la luna de miel
          para consentir a los novios... busca el buzón en la fiesta
        </p>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.gifts {
  background: var(--secondary);
  text-align: center;
}

.gifts-content {
  max-width: 700px;
  margin: 0 auto;
}

.mailbox {
  width: 220px;
  height: 220px;
  margin: 2rem auto;
  position: relative;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.mailbox svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 40px rgba(56, 87, 54, 0.3));
}

.gifts p {
  font-size: 1.3rem;
  line-height: 2;
  color: var(--text-light);
  font-family: 'Lora', serif;
}
</style>
