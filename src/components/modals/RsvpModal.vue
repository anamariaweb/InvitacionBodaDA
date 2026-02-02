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
  nombres: '',
  transporte: '',
  celular: '',
  email: '',
})

// Check if deadline has passed (August 31, 2026)
const deadlinePassed = computed(() => {
  const deadline = new Date('2026-08-31T23:59:59')
  return new Date() > deadline
})

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
    nombres: '',
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

    <!-- Deadline passed message -->
    <div v-else-if="deadlinePassed" class="deadline-passed">
      <h2>Confirmación de Asistencia</h2>
      <div class="deadline-message">
        <p>El plazo para confirmar asistencia ha finalizado.</p>
        <p>Por favor comunícate directamente con los novios.</p>
      </div>
    </div>

    <!-- RSVP Form -->
    <form v-else class="rsvp-form" @submit.prevent="handleSubmit">
      <h2>Confirmación de Asistencia</h2>

      <div class="form-group">
        <label>Tu nombre y el de tu acompañante *</label>
        <input
          v-model="formData.nombres"
          type="text"
          required
          placeholder="Ej: Ana Trujillo, Deimar Herrera"
        >
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

.deadline-passed {
  text-align: center;
}

.deadline-message {
  background: rgba(245, 241, 232, 0.9);
  padding: 2rem;
  border-radius: 15px;
  border: 2px dashed var(--olive);
}

.deadline-message p {
  color: var(--text-dark);
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-family: 'Lora', serif;
}

.deadline-message p:first-child {
  font-weight: 600;
  color: var(--olive);
}
</style>
