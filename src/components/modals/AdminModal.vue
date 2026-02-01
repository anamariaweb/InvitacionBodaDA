<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
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
const password = ref('')
const error = ref('')

function handleLogin() {
  if (galleryStore.loginAdmin(password.value)) {
    password.value = ''
    error.value = ''
    isOpen.value = false
  } else {
    error.value = 'Contraseña incorrecta'
  }
}

function handleKeypress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <BaseModal v-model="isOpen">
    <h2>Acceso Admin</h2>
    <p class="admin-subtitle">
      Ingresa la contraseña para administrar la galería
    </p>
    <div class="form-group">
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        @keypress="handleKeypress"
      >
      <div v-if="error" class="code-error">{{ error }}</div>
    </div>
    <button class="submit-button" @click="handleLogin">Entrar</button>
  </BaseModal>
</template>

<style scoped>
h2 {
  font-size: 2.8rem;
  color: var(--olive);
  margin-bottom: 2rem;
  text-align: center;
  font-style: italic;
}

.admin-subtitle {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
  font-style: italic;
}

.code-error {
  color: #c62828;
  margin-top: 0.5rem;
  font-size: 0.95rem;
}
</style>
