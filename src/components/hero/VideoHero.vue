<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import OptimizedImage from '../ui/OptimizedImage.vue'

const emit = defineEmits<{
  videoEnded: []
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const videoEnded = ref(false)
const showPlayButton = ref(false)
const isPlaying = ref(false)
const isReturningVisitor = ref(false)
let observer: IntersectionObserver | null = null
const pageLoadTime = Date.now()

const STORAGE_KEY = 'boda_video_watched'

function checkIfReturningVisitor(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function markVideoAsWatched() {
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // localStorage not available
  }
}

function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = ''
}

function handleVideoEnd() {
  videoEnded.value = true
  isPlaying.value = false
  unlockScroll()
  markVideoAsWatched()
  emit('videoEnded')
  // Auto-scroll a la siguiente sección
  setTimeout(() => {
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })
  }, 500)
}

function handleWheel(e: WheelEvent) {
  if (!videoEnded.value && !isReturningVisitor.value) {
    e.preventDefault()
  }
}

function handleTouch(e: TouchEvent) {
  if (!videoEnded.value && !isReturningVisitor.value) {
    e.preventDefault()
  }
}

function playVideo() {
  if (videoRef.value) {
    videoRef.value.currentTime = 0
    videoRef.value.play().then(() => {
      showPlayButton.value = false
      isPlaying.value = true
    }).catch(() => {
      showPlayButton.value = true
    })
  }
}

onMounted(() => {
  // Verificar si es visitante que regresa
  isReturningVisitor.value = checkIfReturningVisitor()

  // Si ya vio el video antes, no bloquear
  if (isReturningVisitor.value) {
    videoEnded.value = true
    showPlayButton.value = true
    emit('videoEnded')
  }

  // Listener para cuando el video termine y mostrar primer frame
  if (videoRef.value) {
    videoRef.value.addEventListener('ended', handleVideoEnd)
    // Mostrar primer frame del video
    videoRef.value.addEventListener('loadeddata', () => {
      if (videoRef.value) {
        videoRef.value.currentTime = 0.1
      }
    })
  }

  // Observar cuando el video es visible
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (videoRef.value) {
          if (entry.isIntersecting) {
            // Si es visitante que regresa, no bloquear
            if (isReturningVisitor.value) {
              showPlayButton.value = true
              return
            }
            // Si ha pasado más de 1 minuto, no bloquear
            const elapsedTime = Date.now() - pageLoadTime
            if (elapsedTime > 60000) {
              videoEnded.value = true
              emit('videoEnded')
              return
            }
            if (!videoEnded.value) {
              lockScroll()
              showPlayButton.value = true
            }
          } else {
            videoRef.value.pause()
          }
        }
      })
    },
    { threshold: 0.3 }
  )

  if (heroRef.value) {
    observer.observe(heroRef.value)
    heroRef.value.addEventListener('wheel', handleWheel, { passive: false })
    heroRef.value.addEventListener('touchmove', handleTouch, { passive: false })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (videoRef.value) {
    videoRef.value.removeEventListener('ended', handleVideoEnd)
  }
  if (heroRef.value) {
    heroRef.value.removeEventListener('wheel', handleWheel)
    heroRef.value.removeEventListener('touchmove', handleTouch)
  }
  unlockScroll()
})

</script>

<template>
  <div ref="heroRef" class="video-hero">
    <OptimizedImage
      v-if="!isPlaying"
      class="video-poster"
      src="/images/video/1.jpeg"
      alt="Video preview"
      loading="eager"
    />
    <video ref="videoRef" playsinline preload="auto" :class="{ visible: isPlaying }">
      <source src="/boda-video.mp4" type="video/mp4">
    </video>

    <button
      v-if="!isPlaying"
      class="play-button"
      @click="playVideo"
    >
      ▶
    </button>
  </div>
</template>

<style scoped>
.video-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: -webkit-fill-available;
  background: #000;
  overflow: hidden;
}

.video-poster {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.video-poster :deep(img) {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  object-fit: cover;
  object-position: center center;
}

.video-hero video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
}

.video-hero video.visible {
  opacity: 1;
}

@media (max-width: 768px) {
  .video-hero {
    height: 100vh;
    height: 100dvh;
    min-height: -webkit-fill-available;
  }

  .video-poster :deep(img) {
    height: 100vh;
    height: 100dvh;
    object-fit: cover;
  }

  .video-hero video {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    object-fit: cover;
    object-position: center center;
  }
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  border: 3px solid white;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  font-size: 3rem;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
}

.play-button:hover,
.play-button:active {
  transform: translate(-50%, -50%) scale(1.1);
  background: rgba(0, 0, 0, 0.7);
}
</style>
