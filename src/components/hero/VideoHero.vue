<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  videoEnded: []
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const videoEnded = ref(false)
const showPlayButton = ref(false)
const isPlaying = ref(false)
let observer: IntersectionObserver | null = null
const pageLoadTime = Date.now()

function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = ''
}

function handleVideoEnd() {
  videoEnded.value = true
  unlockScroll()
  emit('videoEnded')
  // Auto-scroll a la siguiente sección
  setTimeout(() => {
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' })
  }, 500)
}

// TEMPORALMENTE DESHABILITADO PARA EDICIÓN
function handleWheel(e: WheelEvent) {
  // if (!videoEnded.value) {
  //   e.preventDefault()
  // }
}

function handleTouch(e: TouchEvent) {
  // if (!videoEnded.value) {
  //   e.preventDefault()
  // }
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
            // Si ha pasado más de 1 minuto, no bloquear
            const elapsedTime = Date.now() - pageLoadTime
            if (elapsedTime > 60000) {
              videoEnded.value = true
              emit('videoEnded')
              return
            }
            if (!videoEnded.value) {
              // lockScroll() // TEMPORALMENTE DESHABILITADO PARA EDICIÓN
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
    <img
      v-if="!isPlaying"
      class="video-poster"
      src="/images/video/1.jpeg"
      alt="Video preview"
    />
    <video ref="videoRef" playsinline preload="auto" :class="{ visible: isPlaying }">
      <source src="/boda-video.MOV" type="video/quicktime">
      <source src="/boda-video.MOV" type="video/mp4">
    </video>

    <button
      v-if="showPlayButton && !videoEnded"
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
  min-height: 100vh;
  min-height: 100dvh;
  object-fit: cover;
  object-position: center center;
  z-index: 1;
}

@supports (height: 100dvh) {
  .video-poster {
    height: 100dvh;
  }
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

  .video-poster {
    object-fit: cover;
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
  }

  .video-hero video {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    object-fit: cover;
    object-position: calc(50% - 10px) center;
  }
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  font-size: 5rem;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 10;
  opacity: 0.9;
}

.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  opacity: 1;
}
</style>
