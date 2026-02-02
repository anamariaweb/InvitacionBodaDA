<script setup lang="ts">
import { computed } from 'vue'
import SectionWrapper from '../ui/SectionWrapper.vue'
import { SPOTIFY_PLAYLIST_ID } from '../../config/constants'

const embedUrl = computed(() =>
  `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`
)

const spotifyAppUrl = computed(() =>
  `spotify:playlist:${SPOTIFY_PLAYLIST_ID}`
)

const spotifyWebUrl = computed(() =>
  `https://open.spotify.com/playlist/${SPOTIFY_PLAYLIST_ID}`
)

function openSpotify() {
  window.location.href = spotifyAppUrl.value
  // Fallback to web if app doesn't open
  setTimeout(() => {
    window.open(spotifyWebUrl.value, '_blank')
  }, 2000)
}
</script>

<template>
  <SectionWrapper id="music" class="music">
    <div class="container">
      <h2 class="section-title">Nuestra Playlist</h2>
      <div class="leaf-decoration">🎵</div>
      <button class="spotify-button" @click="openSpotify">
        <span class="spotify-icon">🎧</span>
        Abrir en Spotify
      </button>
      <div class="spotify-embed">
        <iframe
          :src="embedUrl"
          width="100%"
          height="380"
          frameBorder="0"
          allowfullscreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.music {
  background: var(--secondary) url('/images/backgrounds/background2.png') center center / cover no-repeat;
  text-align: center;
}

.music :deep(.section-title) {
  margin-top: 50px;
  margin-bottom: 10px;
}

.leaf-decoration {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin: 10px 0 2rem 0;
}

.spotify-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #1DB954;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Raleway', sans-serif;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(29, 185, 84, 0.3);
}

.spotify-button:hover {
  background: #1ed760;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(29, 185, 84, 0.4);
}

.spotify-icon {
  font-size: 1.3rem;
}

.spotify-embed {
  max-width: 700px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(56, 87, 54, 0.15);
  border: 5px solid var(--beige);
}
</style>
