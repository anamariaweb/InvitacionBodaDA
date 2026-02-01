<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
</script>

<template>
  <SectionWrapper id="location" class="location">
    <div class="container">
      <h2 class="section-title">Ubicación</h2>
      <div class="location-content">
        <div class="location-info">
          <h3>📍 Salón de Eventos</h3>
          <p><strong>Mirador de la Sabana</strong></p>
          <p>Vereda el Abra, sector el chonito<br>Finca Las Saludes<br>Cota, Cundinamarca</p>

          <div class="transport-section">
            <h4>🚐 Transporte</h4>
            <div class="transport-route">
              <p><strong>Van 1 - Mosquera:</strong><br>Salida: 4:00 PM<br>(Punto de recogida por confirmar)</p>
            </div>
            <div class="transport-route">
              <p><strong>Van 2 - Bogotá:</strong><br>
              Danubio Azul: 3:00 PM<br>
              Portal 80: 4:00 PM</p>
            </div>
            <p class="transport-note">
              <em>Cupos: 20-25 personas por van (sujeto a disponibilidad)<br>
              ⚠️ Parqueadero limitado - Indica en el formulario si necesitas transporte</em>
            </p>
          </div>
        </div>
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.8!2d-74.1!3d4.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDgnMDAuMCJOIDc0wrAwNicwMC4wIlc!5e0!3m2!1sen!2sco!4v1234567890"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<style scoped>
.location {
  background: var(--secondary);
}

.location-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.location-info {
  background: var(--white);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(56, 87, 54, 0.1);
  border: 3px solid var(--beige);
}

.location-info h3 {
  font-size: 2.2rem;
  color: var(--olive);
  margin-bottom: 1rem;
  font-style: italic;
}

.location-info p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.transport-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--secondary);
}

.transport-section h4 {
  font-size: 1.6rem;
  color: var(--primary-dark);
  margin-bottom: 1rem;
  font-style: italic;
}

.transport-route {
  background: var(--bg-light);
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border-left: 4px solid var(--primary);
}

.transport-route strong {
  color: var(--olive);
}

.transport-note {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: var(--accent);
}

.map-container {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(56, 87, 54, 0.15);
  height: 100%;
  min-height: 500px;
  border: 5px solid var(--beige);
}

.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media (max-width: 768px) {
  .location-content {
    grid-template-columns: 1fr;
  }

  .map-container {
    min-height: 300px;
  }
}
</style>
