<script setup lang="ts">
import { computed } from 'vue'
import SectionWrapper from '../ui/SectionWrapper.vue'
import { SPOTIFY_PLAYLIST_ID } from '../../config/constants'

const embedUrl = computed(() =>
  `https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`
)
</script>

<template>
  <SectionWrapper id="music" class="music">
    <div class="container">
      <h2 class="section-title">Nuestra Playlist</h2>
      <div class="leaf-decoration">🎵</div>
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
  background: var(--white);
  text-align: center;
}

.leaf-decoration {
  text-align: center;
  color: var(--primary);
  font-size: 2rem;
  margin: 2rem 0;
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
