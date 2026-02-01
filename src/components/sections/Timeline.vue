<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
import { TIMELINE_EVENTS } from '../../config/constants'
</script>

<template>
  <SectionWrapper id="itinerary" class="itinerary">
    <div class="container">
      <h2 class="section-title">Itinerario</h2>
      <div class="timeline">
        <div
          v-for="(item, index) in TIMELINE_EVENTS"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-content" :class="{ empty: index % 2 === 0 }">
            <template v-if="index % 2 !== 0">
              <div class="timeline-time">{{ item.time }}</div>
              <div class="timeline-event">{{ item.event }}</div>
            </template>
          </div>
          <div class="timeline-marker">{{ item.icon }}</div>
          <div class="timeline-content" :class="{ empty: index % 2 !== 0 }">
            <template v-if="index % 2 === 0">
              <div class="timeline-time">{{ item.time }}</div>
              <div class="timeline-event">{{ item.event }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.itinerary {
  background: var(--white);
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 100%;
  background: linear-gradient(to bottom, var(--primary), var(--olive));
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-content {
  background: var(--bg-light);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(56, 87, 54, 0.1);
  transition: transform 0.3s ease;
  border: 2px solid var(--beige);
}

.timeline-content.empty {
  background: transparent;
  box-shadow: none;
  border: none;
}

.timeline-content:not(.empty):hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(56, 87, 54, 0.2);
}

.timeline-time {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--olive);
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
}

.timeline-event {
  font-size: 1.15rem;
  color: var(--text-dark);
}

.timeline-marker {
  width: 60px;
  height: 60px;
  background: var(--olive);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  z-index: 1;
  box-shadow: 0 0 0 5px var(--white), 0 0 0 8px var(--olive);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }

  .timeline-item {
    grid-template-columns: 60px 1fr;
    gap: 1rem;
  }

  .timeline-content.empty {
    display: none;
  }

  .timeline-content:not(.empty) {
    order: 2;
  }

  .timeline-marker {
    order: 1;
  }
}
</style>
