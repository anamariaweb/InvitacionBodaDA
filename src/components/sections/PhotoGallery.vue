<script setup lang="ts">
import { computed } from 'vue'
import SectionWrapper from '../ui/SectionWrapper.vue'
import { GOOGLE_DRIVE_FOLDER } from '../../config/constants'

const qrCodeUrl = computed(() => {
  const encodedUrl = encodeURIComponent(GOOGLE_DRIVE_FOLDER)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}&bgcolor=ffffff&color=385736`
})

function openDriveFolder() {
  window.open(GOOGLE_DRIVE_FOLDER, '_blank')
}
</script>

<template>
  <SectionWrapper id="gallery" class="gallery">
    <div class="container">
      <h2 class="section-title">Comparte tus Fotos</h2>

      <div class="gallery-content">
        <p class="gallery-subtitle">
          Escanea el código QR para subir tus fotos del evento
        </p>

        <div class="qr-container">
          <img :src="qrCodeUrl" alt="QR Code para subir fotos" class="qr-code">
        </div>

        <button class="drive-button" @click="openDriveFolder">
          📁 Abrir carpeta de fotos
        </button>

        <p class="gallery-note">
          Las fotos se subirán directamente a nuestra carpeta compartida
        </p>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.gallery {
  background: var(--secondary) url('/images/backgrounds/background2.png') center center / cover no-repeat;
  text-align: center;
}

.gallery-content {
  max-width: 500px;
  margin: 0 auto;
}

.gallery-subtitle {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  font-family: 'Lora', serif;
  font-style: italic;
}

.qr-container {
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  display: inline-block;
  box-shadow: 0 10px 40px rgba(56, 87, 54, 0.15);
  border: 3px solid var(--beige);
  margin-bottom: 2rem;
}

.qr-code {
  width: 200px;
  height: 200px;
  display: block;
}

.drive-button {
  background: var(--olive);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 5px 20px rgba(56, 87, 54, 0.3);
}

.drive-button:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(56, 87, 54, 0.4);
}

.gallery-note {
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
}
</style>
