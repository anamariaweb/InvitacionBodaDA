<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
</script>

<template>
  <SectionWrapper id="dresscode" class="dresscode">
    <div class="container">
      <h2 class="section-title">Dress Code</h2>
      <div class="dresscode-content">
        <div class="dresscode-grid">
          <div class="dresscode-item">
            <div class="icon">👔</div>
            <h3>Hombres</h3>
            <p>Traje completo con corbata o corbatín</p>
          </div>
          <div class="dresscode-item">
            <div class="icon">👗</div>
            <h3>Mujeres</h3>
            <p>Vestido largo elegante</p>
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
  background: var(--white);
  text-align: center;
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
  background: var(--bg-light);
  padding: 2.5rem;
  border-radius: 20px;
  transition: transform 0.3s ease;
  border: 3px solid var(--beige);
}

.dresscode-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(56, 87, 54, 0.15);
}

.dresscode-item .icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
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
  background: rgba(135, 149, 107, 0.1);
  padding: 2rem;
  border-radius: 15px;
  border: 2px dashed var(--primary);
  margin-bottom: 2rem;
}

.color-restrictions strong {
  color: var(--olive);
}

.dresscode-tip {
  background: var(--secondary);
  padding: 2rem;
  border-radius: 15px;
  border-left: 5px solid var(--olive);
  text-align: left;
}
</style>
