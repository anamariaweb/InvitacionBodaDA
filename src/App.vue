<script setup lang="ts">
import { ref } from 'vue'
import EnvelopeAnimation from './components/envelope/EnvelopeAnimation.vue'
import VideoHero from './components/hero/VideoHero.vue'
import InvitationMessage from './components/sections/InvitationMessage.vue'
import PhotoCarousel from './components/sections/PhotoCarousel.vue'
import SpotifyPlayer from './components/sections/SpotifyPlayer.vue'
import CountdownTimer from './components/sections/CountdownTimer.vue'
import LocationMap from './components/sections/LocationMap.vue'
import DressCode from './components/sections/DressCode.vue'
import GiftSection from './components/sections/GiftSection.vue'
import Timeline from './components/sections/Timeline.vue'
import PhotoGallery from './components/sections/PhotoGallery.vue'
import RsvpSection from './components/sections/RsvpSection.vue'
import AppFooter from './components/layout/AppFooter.vue'

const isEnvelopeOpen = ref(false)

function handleEnvelopeOpened() {
  isEnvelopeOpen.value = true
}
</script>

<template>
  <EnvelopeAnimation @opened="handleEnvelopeOpened" />

  <div class="main-content" :class="{ visible: isEnvelopeOpen }">
    <VideoHero />
    <InvitationMessage />
    <PhotoCarousel />
    <SpotifyPlayer />
    <CountdownTimer />
    <LocationMap />
    <DressCode />
    <GiftSection />
    <Timeline />
    <PhotoGallery />
    <RsvpSection />
    <AppFooter />
  </div>
</template>

<style>
.main-content {
  opacity: 0;
  transition: opacity 1s ease;
}

.main-content.visible {
  opacity: 1;
}
</style>
