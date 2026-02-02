<script setup lang="ts">
import SectionWrapper from '../ui/SectionWrapper.vue'
</script>

<template>
  <SectionWrapper id="location" class="location">
    <div class="container">
      <h2 class="section-title">Ubicación</h2>
      <div class="location-content">
        <div class="location-info">
          <h3>📍 Salón de Eventos Mirador de la Sabana</h3>
          <p>Vereda el Abra, sector el chonito<br>Finca Las Saludes<br>Cota, Cundinamarca</p>

          <div class="transport-section">
            <h4>🚐 Transporte</h4>
            <div class="transport-route">
              <p><strong>Bus 1 - Mosquera:</strong><br>Salida: 4:00 PM<br>Iglesia Misión Carismática Internacional</p>
            </div>
            <div class="transport-route">
              <p><strong>Bus 2 - Bogotá:</strong><br>
              Danubio Azul: 3:00 PM<br>
              Portal 80: 4:00 PM</p>
            </div>
            <p class="transport-note">
              <em>Cupos: 20-25 personas por bus (sujeto a disponibilidad)<br>
              ⚠️ Parqueadero limitado - Indica en el formulario si necesitas transporte</em>
            </p>
          </div>
        </div>
        <div class="map-container">
          <iframe
            src="https://maps.google.com/maps?q=4.802154076107786,-74.11943418499251&z=16&output=embed"
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
  background: var(--secondary) url('/images/backgrounds/background2.png') center center / cover no-repeat;
}

.location-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.location-info {
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40' preserveAspectRatio='none'%3E%3Cpath d='M0,40 L0,30 L20,35 L40,25 L60,32 L80,20 L100,28 L120,18 L140,26 L160,15 L180,24 L200,12 L220,22 L240,14 L260,24 L280,16 L300,26 L320,18 L340,28 L360,20 L380,30 L400,22 L400,40 Z' fill='rgba(56,87,54,0.08)'/%3E%3Cpath d='M0,40 L0,34 L30,38 L60,30 L90,36 L120,26 L150,34 L180,24 L210,32 L240,22 L270,30 L300,24 L330,32 L360,26 L390,34 L400,28 L400,40 Z' fill='rgba(56,87,54,0.12)'/%3E%3C/svg%3E") bottom/100% 40px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,10 L20,5 L40,15 L60,8 L80,20 L100,12 L120,22 L140,14 L160,25 L180,16 L200,28 L220,18 L240,26 L260,16 L280,24 L300,14 L320,22 L340,12 L360,20 L380,10 L400,18 L400,0 Z' fill='rgba(56,87,54,0.08)'/%3E%3Cpath d='M0,0 L0,6 L30,2 L60,10 L90,4 L120,14 L150,6 L180,16 L210,8 L240,18 L270,10 L300,16 L330,8 L360,14 L390,6 L400,12 L400,0 Z' fill='rgba(56,87,54,0.12)'/%3E%3C/svg%3E") top/100% 40px no-repeat,
    var(--white);
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
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 30' preserveAspectRatio='none'%3E%3Cpath d='M0,30 L0,22 L20,26 L40,18 L60,24 L80,15 L100,21 L120,13 L140,19 L160,11 L180,18 L200,9 L220,16 L240,10 L260,18 L280,12 L300,19 L320,13 L340,21 L360,15 L380,22 L400,16 L400,30 Z' fill='rgba(56,87,54,0.25)'/%3E%3Cpath d='M0,30 L0,25 L30,28 L60,20 L90,26 L120,18 L150,24 L180,16 L210,22 L240,14 L270,20 L300,16 L330,22 L360,18 L390,24 L400,20 L400,30 Z' fill='rgba(56,87,54,0.35)'/%3E%3C/svg%3E") bottom/100% 30px no-repeat,
    rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.2rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  border: 1px solid rgba(56, 87, 54, 0.2);
  box-shadow: 0 4px 15px rgba(56, 87, 54, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.transport-route:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(56, 87, 54, 0.15);
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
