<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import SectionWrapper from '../ui/SectionWrapper.vue'
import OptimizedImage from '../ui/OptimizedImage.vue'
import { useCarousel } from '../../composables/useCarousel'
import { CAROUSEL_IMAGES } from '../../config/constants'

const images = CAROUSEL_IMAGES
const { currentSlide, transform, goToSlide, nextSlide, prevSlide, resetAndStart, stopAutoAdvance } = useCarousel(images.length)

const indicators = computed(() => images.map((_, index) => index))

const carouselRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resetAndStart()
        } else {
          stopAutoAdvance()
        }
      })
    },
    { threshold: 0.3 }
  )

  // Esperar al siguiente tick y obtener el elemento DOM del componente
  setTimeout(() => {
    const el = carouselRef.value?.$el || carouselRef.value
    if (el && observer) {
      observer.observe(el)
    }
  }, 100)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <SectionWrapper id="photos" ref="carouselRef" class="carousel">
    <div class="container">
      <h2 class="section-title">Nuestra Historia</h2>
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform }">
          <div
            v-for="(img, index) in images"
            :key="index"
            class="carousel-slide"
          >
            <OptimizedImage :src="img" :alt="`Foto ${index + 1}`" :loading="index === 0 ? 'eager' : 'lazy'" />
          </div>
        </div>
        <button class="carousel-button prev" @click="prevSlide">‹</button>
        <button class="carousel-button next" @click="nextSlide">›</button>
        <div class="carousel-indicators">
          <div
            v-for="index in indicators"
            :key="index"
            class="indicator"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.carousel {
  background-color: var(--secondary);
  background-image: url('/images/backgrounds/background2.png');
  background-image: image-set(
    url('/images/backgrounds/background2.webp') type('image/webp'),
    url('/images/backgrounds/background2.png') type('image/png')
  );
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.carousel :deep(.section-title) {
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
}

.carousel-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(56, 87, 54, 0.2);
  border: 8px solid var(--beige);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  position: relative;
}

.carousel-slide :deep(picture) {
  display: block;
  width: 100%;
  height: 600px;
}

.carousel-slide :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.95);
  border: 2px solid var(--olive);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--olive);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.carousel-button:hover {
  background: var(--olive);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-button.prev {
  left: 20px;
}

.carousel-button.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--olive);
}

.indicator.active {
  background: var(--olive);
  width: 30px;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .carousel-slide :deep(picture) {
    height: 400px;
  }
}
</style>
