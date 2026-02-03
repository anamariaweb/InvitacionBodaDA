<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseModal from '../ui/BaseModal.vue'
import { GUEST_CODES, TRANSPORT_OPTIONS } from '../../config/constants'

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
const guestName = ref('')
const isCodeConfirmed = ref(false)

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
  const guest = GUEST_CODES[upperCode]

  if (guest) {
    guestName.value = guest
    isCodeValid.value = true
    codeError.value = ''
  } else {
    codeError.value = 'Código inválido. Por favor verifica tu invitación.'
  }
}

function confirmGuest() {
  isCodeConfirmed.value = true
}

function rejectGuest() {
  isCodeValid.value = false
  code.value = ''
  guestName.value = ''
  codeError.value = 'Por favor ingresa el código correcto de tu invitación.'
}

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9Ds4Xr_kjD-QBOUoQdvKePPY0ZNJQZiIycY3wTmYS7vE5Eyxmi4Ungwcvi2HSttL2/exec'

async function handleSubmit() {
  isSubmitting.value = true
  submitError.value = ''

  const data = {
    codigo: code.value.toUpperCase(),
    nombres: guestName.value,
    transporte: formData.value.transporte,
    celular: formData.value.celular,
    email: formData.value.email,
  }

  try {
    // Construir URL con parámetros
    const params = new URLSearchParams(data)
    const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`

    // Usar imagen para enviar (método más confiable con CORS)
    const img = new Image()
    img.src = url

    // Esperar un momento para que se envíe
    await new Promise(resolve => setTimeout(resolve, 1500))

    submitSuccess.value = true
  } catch (error) {
    submitError.value = 'Error al enviar. Por favor intenta de nuevo.'
    console.error('Error:', error)
  } finally {
    isSubmitting.value = false
  }
}

function resetAndClose() {
  code.value = ''
  codeError.value = ''
  isCodeValid.value = false
  isCodeConfirmed.value = false
  guestName.value = ''
  submitSuccess.value = false
  submitError.value = ''
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
    isCodeConfirmed.value = false
    guestName.value = ''
    submitSuccess.value = false
    submitError.value = ''
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

    <!-- Guest confirmation -->
    <div v-else-if="isCodeValid && !isCodeConfirmed" class="guest-confirmation">
      <h2>Confirma tu identidad</h2>
      <p class="guest-label">Esta invitación es para:</p>
      <p class="guest-name">{{ guestName }}</p>
      <p class="guest-question">¿Eres tú?</p>
      <div class="confirmation-buttons">
        <button class="confirm-button yes" @click="confirmGuest">Sí, soy yo</button>
        <button class="confirm-button no" @click="rejectGuest">No, me equivoqué</button>
      </div>
    </div>

    <!-- Success message -->
    <div v-else-if="submitSuccess" class="success-message">
      <div class="success-icon">🎉</div>
      <h2>¡Gracias por confirmar!</h2>
      <p>Nos vemos en la boda</p>
      <button class="submit-button" @click="resetAndClose">Cerrar</button>
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
    <form v-else-if="isCodeConfirmed" class="rsvp-form" @submit.prevent="handleSubmit">
      <h2>Confirmación de Asistencia</h2>

      <div class="form-group">
        <label>Invitación para:</label>
        <div class="guest-name-display">{{ guestName }}</div>
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

      <div v-if="submitError" class="submit-error">{{ submitError }}</div>
      <button type="submit" class="submit-button" :disabled="isSubmitting">
        {{ isSubmitting ? 'Enviando...' : 'Confirmar Asistencia' }}
      </button>
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

.submit-error {
  color: #c62828;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  text-align: center;
  padding: 2rem 0;
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.success-message h2 {
  color: var(--olive);
  margin-bottom: 0.5rem;
}

.success-message p {
  font-size: 1.3rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
  margin-bottom: 2rem;
}

.guest-confirmation {
  text-align: center;
}

.guest-label {
  font-size: 1.1rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.guest-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--olive);
  font-family: 'Playfair Display', serif;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(135, 149, 107, 0.1);
  border-radius: 10px;
}

.guest-question {
  font-size: 1.2rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-family: 'Lora', serif;
}

.confirmation-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.confirm-button {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
  border: none;
}

.confirm-button.yes {
  background: var(--olive);
  color: white;
}

.confirm-button.yes:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.confirm-button.no {
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--beige);
}

.confirm-button.no:hover {
  background: var(--beige);
  color: var(--olive);
}

.guest-name-display {
  background: rgba(135, 149, 107, 0.15);
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--olive);
  font-family: 'Playfair Display', serif;
  text-align: center;
}
</style>
