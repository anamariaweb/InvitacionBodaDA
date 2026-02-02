<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
import { TIMELINE_EVENTS } from '../../config/constants'
</script>

<template>
  <SectionWrapper id="itinerary" class="itinerary">
    <div class="container">
      <h2 class="section-title">Itinerario</h2>
      <ul class="timeline-list">
        <li v-for="(item, index) in TIMELINE_EVENTS" :key="index">
          <span class="time">{{ item.time }}</span>
          <span class="event">{{ item.event }}</span>
        </li>
      </ul>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.itinerary {
  background: var(--secondary) url('/images/backgrounds/background2.png') center center / cover no-repeat;
  text-align: center;
}

.timeline-list {
  max-width: 500px;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40' preserveAspectRatio='none'%3E%3Cpath d='M0,40 L0,30 L20,35 L40,25 L60,32 L80,20 L100,28 L120,18 L140,26 L160,15 L180,24 L200,12 L220,22 L240,14 L260,24 L280,16 L300,26 L320,18 L340,28 L360,20 L380,30 L400,22 L400,40 Z' fill='rgba(56,87,54,0.25)'/%3E%3Cpath d='M0,40 L0,34 L30,38 L60,30 L90,36 L120,26 L150,34 L180,24 L210,32 L240,22 L270,30 L300,24 L330,32 L360,26 L390,34 L400,28 L400,40 Z' fill='rgba(56,87,54,0.35)'/%3E%3C/svg%3E") bottom/100% 40px no-repeat,
    rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem 3rem;
  box-shadow: 0 10px 40px rgba(56, 87, 54, 0.1);
  border: 2px solid var(--beige);
}

.timeline-list li {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(56, 87, 54, 0.1);
}

.timeline-list li:last-child {
  border-bottom: none;
}

.timeline-list li::before {
  content: '•';
  color: var(--olive);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.time {
  font-weight: 600;
  color: var(--olive);
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  min-width: 80px;
  text-align: left;
}

.event {
  color: var(--text-dark);
  font-size: 1.05rem;
  text-align: left;
}

@media (max-width: 480px) {
  .timeline-list {
    padding: 1.5rem 2rem;
  }

  .timeline-list li {
    gap: 1rem;
  }

  .time {
    min-width: 70px;
    font-size: 1rem;
  }

  .event {
    font-size: 0.95rem;
  }
}
</style>
