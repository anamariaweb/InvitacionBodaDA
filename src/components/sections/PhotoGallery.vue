<script setup lang="ts">
import { ref } from 'vue'
import SectionWrapper from '../ui/SectionWrapper.vue'
import UploadModal from '../modals/UploadModal.vue'
import AdminModal from '../modals/AdminModal.vue'
import { useGalleryStore } from '../../stores/gallery'

const galleryStore = useGalleryStore()

const showUploadModal = ref(false)
const showAdminModal = ref(false)

function handleAdminClick() {
  if (galleryStore.isAdminMode) {
    galleryStore.logoutAdmin()
  } else {
    showAdminModal.value = true
  }
}

function handleDelete(id: string) {
  if (confirm('¿Seguro que quieres eliminar esta foto?')) {
    galleryStore.deletePhoto(id)
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <SectionWrapper id="gallery" class="gallery">
    <div class="container">
      <h2 class="section-title">Galería de Fotos</h2>
      <p class="gallery-subtitle">
        Comparte tus momentos favoritos de nuestra boda
      </p>

      <div class="gallery-upload">
        <button class="upload-button" @click="showUploadModal = true">
          📸 Subir Fotos
        </button>
        <p class="upload-note">
          Las fotos subidas aparecerán aquí para que todos las vean
        </p>
      </div>

      <div class="gallery-grid">
        <div v-if="galleryStore.isEmpty" class="gallery-placeholder">
          <div class="placeholder-icon">📷</div>
          <p>Aún no hay fotos</p>
          <p class="placeholder-sub">Sé el primero en compartir un momento especial</p>
        </div>

        <div
          v-for="photo in galleryStore.photos"
          :key="photo.id"
          class="gallery-item"
          :class="{ 'admin-mode': galleryStore.isAdminMode }"
        >
          <img :src="photo.data" :alt="photo.fileName">
          <div class="gallery-item-overlay">
            <div class="gallery-item-info">
              Subida por: {{ photo.uploaderName }}<br>
              {{ formatDate(photo.uploadDate) }}
            </div>
          </div>
          <button
            v-if="galleryStore.isAdminMode"
            class="gallery-item-delete"
            @click="handleDelete(photo.id)"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="admin-access">
        <button
          class="admin-button"
          :class="{ active: galleryStore.isAdminMode }"
          @click="handleAdminClick"
        >
          {{ galleryStore.isAdminMode ? '🔓 Modo Admin Activo' : '🔐 Acceso Admin' }}
        </button>
      </div>
    </div>

    <UploadModal v-model="showUploadModal" />
    <AdminModal v-model="showAdminModal" />
  </SectionWrapper>
</template>

<style scoped>
.gallery {
  background: var(--secondary);
}

.gallery-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 3rem;
  font-family: 'Lora', serif;
  font-style: italic;
}

.gallery-upload {
  text-align: center;
  margin-bottom: 3rem;
}

.upload-button {
  background: var(--olive);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 5px 20px rgba(56, 87, 54, 0.3);
}

.upload-button:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(56, 87, 54, 0.4);
}

.upload-note {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-light);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.gallery-placeholder {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background: var(--white);
  border-radius: 20px;
  border: 3px dashed var(--beige);
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.gallery-placeholder p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.placeholder-sub {
  font-size: 0.9rem !important;
  margin-top: 0.5rem;
}

.gallery-item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: var(--white);
  box-shadow: 0 5px 20px rgba(56, 87, 54, 0.15);
  transition: transform 0.3s ease;
  border: 4px solid var(--beige);
}

.gallery-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(56, 87, 54, 0.25);
}

.gallery-item img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.gallery-item-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(56, 87, 54, 0.9), transparent);
  padding: 1rem;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item-info {
  font-size: 0.9rem;
}

.gallery-item-delete {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: none;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.gallery-item.admin-mode .gallery-item-delete {
  display: flex;
}

.gallery-item-delete:hover {
  background: rgba(185, 28, 28, 1);
  transform: scale(1.1);
}

.admin-access {
  text-align: center;
  margin-top: 2rem;
}

.admin-button {
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--beige);
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
}

.admin-button:hover {
  background: var(--beige);
  color: var(--olive);
}

.admin-button.active {
  background: var(--olive);
  color: white;
  border-color: var(--olive);
}
</style>
