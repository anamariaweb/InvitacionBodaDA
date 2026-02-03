<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
import OptimizedImage from '../ui/OptimizedImage.vue'
</script>

<template>
  <SectionWrapper id="dresscode" class="dresscode" :noFade="true">
    <div class="container">
      <h2 class="section-title">Código de Vestimenta</h2>
      <div class="dresscode-content">
        <div class="dresscode-grid">
          <div class="dresscode-item">
            <div class="icon">
              <OptimizedImage src="/images/dresscode/2hombre.png" alt="Hombre en traje" class="silhouette" />
            </div>
            <h3>Hombres</h3>
            <p>Traje con corbata o corbatín</p>
          </div>
          <div class="dresscode-item">
            <div class="icon">
              <OptimizedImage src="/images/dresscode/1mujer.png" alt="Mujer en vestido largo" class="silhouette" />
            </div>
            <h3>Mujeres</h3>
            <p>Vestido largo</p>
          </div>
        </div>

        <div class="color-restrictions">
          <p><strong>⚠️ Colores Reservados:</strong><br>
          Blanco (novia), Verde Oliva (damas de honor) y Azul (novio)</p>
        </div>

        <div class="dresscode-tip">
          <p><strong>💡 Tip Importante:</strong><br>
          La ceremonia es en un lugar campestre con subida en ladrillo/pasto.
          Si usas tacones, te recomendamos llevar zapatos de cambio cómodos.</p>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.dresscode {
  background: linear-gradient(135deg, var(--olive) 0%, var(--primary-dark) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.dresscode .container {
  position: relative;
}

.dresscode :deep(.section-title) {
  color: white;
}

.dresscode :deep(.section-title::after) {
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
}

.dresscode-content {
  max-width: 900px;
  margin: 0 auto;
}

.dresscode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.dresscode-item {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 2.5rem;
  border-radius: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(56, 87, 54, 0.1);
}

.dresscode-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(56, 87, 54, 0.2);
}

.dresscode-item .icon {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dresscode-item .icon :deep(picture) {
  display: flex;
  justify-content: center;
}

.dresscode-item .icon :deep(img) {
  width: 140px;
  height: 180px;
  object-fit: contain;
}

.dresscode-item h3 {
  font-size: 1.8rem;
  color: var(--olive);
  margin-bottom: 1rem;
  font-style: italic;
}

.dresscode-item p {
  color: var(--text-light);
  line-height: 1.8;
  font-size: 1.05rem;
}

.color-restrictions {
  background: rgba(245, 241, 232, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  border: 2px dashed var(--olive);
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.color-restrictions p {
  color: var(--text-dark);
}

.color-restrictions strong {
  color: var(--olive);
}

.dresscode-tip {
  background: var(--secondary);
  padding: 2rem;
  border-radius: 15px;
  border-left: 5px solid var(--olive);
  text-align: center;
}
</style>
