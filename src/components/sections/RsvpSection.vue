<script setup lang="ts">
import { ref } from 'vue'
import SectionWrapper from '../ui/SectionWrapper.vue'
import RsvpModal from '../modals/RsvpModal.vue'

const showModal = ref(false)
</script>

<template>
  <SectionWrapper class="rsvp-section">
    <div class="container">
      <button class="rsvp-button" @click="showModal = true">
        Confirmar Asistencia
      </button>
    </div>

    <RsvpModal v-model="showModal" />
  </SectionWrapper>
</template>

<style scoped>
.rsvp-section {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--olive) 100%);
  padding: 100px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.rsvp-section::before {
  content: '🌿';
  position: absolute;
  font-size: 15rem;
  opacity: 0.1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg);
}

.rsvp-button {
  background: white;
  color: var(--olive);
  border: none;
  padding: 1.8rem 4.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
}

.rsvp-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .rsvp-section {
    padding: 60px 0;
  }
}
</style>
