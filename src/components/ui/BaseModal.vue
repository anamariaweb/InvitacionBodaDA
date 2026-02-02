<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    close()
  }
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal"
        @click="handleBackdropClick"
      >
        <div class="modal-content">
          <button class="modal-close" @click="close">&times;</button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(56, 87, 54, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  padding: 3rem;
  border-radius: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  border: 5px solid var(--beige);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-light);
  transition: color 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: var(--olive);
}

/* Transition */
.modal-enter-active {
  animation: modalSlideIn 0.4s ease-out;
}

.modal-leave-active {
  animation: modalSlideIn 0.3s ease-out reverse;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 2rem 1.5rem;
  }
}
</style>
