<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { VALID_CODES, TRANSPORT_OPTIONS } from '../../config/constants'

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

// Code validation state
const code = ref('')
const codeError = ref('')
const isCodeValid = ref(false)

// Form state
const formData = ref({
  nombre: '',
  acompanantes: 0,
  nombres_acompanantes: '',
  restricciones: '',
  transporte: '',
  celular: '',
  email: '',
})

const showCompanionNames = computed(() => formData.value.acompanantes > 0)

function verifyCode() {
  const upperCode = code.value.toUpperCase().trim()
  if (VALID_CODES.includes(upperCode)) {
    isCodeValid.value = true
    codeError.value = ''
  } else {
    codeError.value = 'Código inválido. Por favor verifica tu invitación.'
  }
}

async function handleSubmit() {
  const data = {
    ...formData.value,
    codigo: code.value.toUpperCase(),
  }

  // TODO: Add Google Sheets API integration here
  console.log('Form data:', data)

  alert('¡Gracias por confirmar! Nos vemos en la boda 🎉')
  resetAndClose()
}

function resetAndClose() {
  code.value = ''
  codeError.value = ''
  isCodeValid.value = false
  formData.value = {
    nombre: '',
    acompanantes: 0,
    nombres_acompanantes: '',
    restricciones: '',
    transporte: '',
    celular: '',
    email: '',
  }
  isOpen.value = false
}

// Reset when modal closes
watch(isOpen, (open) => {
  if (!open) {
    code.value = ''
    codeError.value = ''
    isCodeValid.value = false
  }
})
</script>

<template>
  <BaseModal v-model="isOpen">
    <!-- Code Input Section -->
    <div v-if="!isCodeValid" class="code-input-section">
      <h2>Ingresa tu código</h2>
      <p class="code-instruction">
        Por favor ingresa el código único que recibiste con tu invitación
      </p>
      <div class="form-group">
        <input
          v-model="code"
          type="text"
          placeholder="Ejemplo: AD001"
          maxlength="10"
          class="code-input"
          @keypress.enter="verifyCode"
        >
        <div v-if="codeError" class="code-error">{{ codeError }}</div>
      </div>
      <button class="submit-button" @click="verifyCode">Verificar</button>
    </div>

    <!-- RSVP Form -->
    <form v-else class="rsvp-form" @submit.prevent="handleSubmit">
      <h2>Confirmación de Asistencia</h2>

      <div class="form-group">
        <label>Nombre Completo *</label>
        <input v-model="formData.nombre" type="text" required>
      </div>

      <div class="form-group">
        <label>¿Cuántos acompañantes traerás?</label>
        <input
          v-model.number="formData.acompanantes"
          type="number"
          min="0"
          max="10"
        >
      </div>

      <div v-if="showCompanionNames" class="form-group">
        <label>Nombres de acompañantes</label>
        <textarea
          v-model="formData.nombres_acompanantes"
          placeholder="Escribe los nombres de tus acompañantes"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Restricciones alimentarias o alergias</label>
        <textarea
          v-model="formData.restricciones"
          placeholder="Si tienes alguna restricción alimentaria, cuéntanos aquí"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Transporte *</label>
        <select v-model="formData.transporte" required>
          <option
            v-for="option in TRANSPORT_OPTIONS"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Celular *</label>
        <input
          v-model="formData.celular"
          type="tel"
          required
          placeholder="+57 300 123 4567"
        >
      </div>

      <div class="form-group">
        <label>Email *</label>
        <input
          v-model="formData.email"
          type="email"
          required
          placeholder="tu@email.com"
        >
      </div>

      <button type="submit" class="submit-button">Confirmar Asistencia</button>
      <p class="deadline">
        Fecha límite: Agosto 2026
      </p>
    </form>
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

.code-input-section {
  text-align: center;
}

.code-instruction {
  margin-bottom: 2rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
  font-style: italic;
}

.code-input {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 1.3rem;
  font-weight: 600;
}

.code-error {
  color: #c62828;
  margin-top: 0.5rem;
  font-size: 0.95rem;
}

.rsvp-form {
  display: block;
}

.deadline {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
  font-style: italic;
}
</style>
