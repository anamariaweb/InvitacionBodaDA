<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { useFileUpload } from '../../composables/useFileUpload'
import { useGalleryStore } from '../../stores/gallery'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const galleryStore = useGalleryStore()
const {
  selectedFiles,
  isDragging,
  addFiles,
  removeFile,
  clearFiles,
  handleDragOver,
  handleDragLeave,
  handleDrop,
} = useFileUpload()

const uploaderName = ref('')
const isUploading = ref(false)
const uploadProgress = ref(0)
const fileInputRef = ref<HTMLInputElement | null>(null)

const canSubmit = computed(() => selectedFiles.value.length > 0 && !isUploading.value)

function openFileDialog() {
  fileInputRef.value?.click()
}

async function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files) {
    const errors = await addFiles(target.files)
    if (errors.length > 0) {
      alert(errors.join('\n'))
    }
  }
}

async function handleDropEvent(e: DragEvent) {
  const errors = await handleDrop(e)
  if (errors.length > 0) {
    alert(errors.join('\n'))
  }
}

async function handleSubmit() {
  if (!canSubmit.value) return

  isUploading.value = true
  uploadProgress.value = 0

  const photos = []
  for (let i = 0; i < selectedFiles.value.length; i++) {
    const fileItem = selectedFiles.value[i]
    if (!fileItem) continue
    photos.push({
      data: fileItem.preview,
      uploaderName: uploaderName.value || 'Invitado',
      uploadDate: new Date().toISOString(),
      fileName: fileItem.file.name,
    })
    uploadProgress.value = Math.round(((i + 1) / selectedFiles.value.length) * 100)
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  galleryStore.addPhotos(photos)

  alert('¡Fotos subidas con éxito! 🎉')
  resetAndClose()
}

function resetAndClose() {
  clearFiles()
  uploaderName.value = ''
  isUploading.value = false
  uploadProgress.value = 0
  isOpen.value = false
}
</script>

<template>
  <BaseModal v-model="isOpen">
    <h2>Subir Fotos</h2>

    <div
      class="upload-area"
      :class="{ dragover: isDragging }"
      @click="openFileDialog"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDropEvent"
    >
      <div class="upload-area-icon">📷</div>
      <p><strong>Haz clic o arrastra fotos aquí</strong></p>
      <p class="upload-formats">Formatos: JPG, PNG, HEIC</p>
      <p class="upload-limit">Máximo 10 fotos a la vez</p>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      class="upload-input"
      accept="image/*"
      multiple
      @change="handleFileSelect"
    >

    <div v-if="selectedFiles.length > 0" class="upload-preview">
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        class="upload-preview-item"
      >
        <img :src="file.preview" alt="Preview">
        <button class="upload-preview-remove" @click="removeFile(index)">×</button>
      </div>
    </div>

    <div class="form-group" style="margin-top: 1.5rem;">
      <label>Tu nombre (opcional)</label>
      <input
        v-model="uploaderName"
        type="text"
        placeholder="¿Quién está compartiendo estas fotos?"
      >
    </div>

    <div v-if="isUploading" class="upload-progress">
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: `${uploadProgress}%` }">
          {{ uploadProgress }}%
        </div>
      </div>
    </div>

    <button
      class="submit-button"
      :disabled="!canSubmit"
      @click="handleSubmit"
    >
      Subir Fotos
    </button>
  </BaseModal>
</template>

<style scoped>
h2 {
  font-size: 2.5rem;
  color: var(--olive);
  margin-bottom: 2rem;
  text-align: center;
  font-style: italic;
}

.upload-area {
  border: 3px dashed var(--beige);
  border-radius: 15px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-light);
}

.upload-area:hover,
.upload-area.dragover {
  border-color: var(--olive);
  background: var(--secondary);
}

.upload-area.dragover {
  transform: scale(1.02);
}

.upload-area-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-area p {
  color: var(--text-light);
  font-size: 1.1rem;
}

.upload-formats {
  font-size: 0.9rem !important;
  margin-top: 0.5rem;
}

.upload-limit {
  font-size: 0.85rem !important;
  margin-top: 0.3rem;
  color: var(--text-light);
}

.upload-input {
  display: none;
}

.upload-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  max-height: 250px;
  overflow-y: auto;
}

.upload-preview-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--beige);
}

.upload-preview-item img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.upload-preview-remove {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(220, 38, 38, 0.9);
  color: white;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 30px;
  background: var(--bg-light);
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid var(--beige);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--olive));
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.submit-button {
  margin-top: 2rem;
}
</style>
