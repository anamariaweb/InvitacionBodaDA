<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  opened: []
}>()

const isOpen = ref(false)
const letterOut = ref(false)
const isHidden = ref(false)

function handleClick() {
  if (isOpen.value) return

  isOpen.value = true

  // Esperar a que el sobre abra, luego sacar la carta
  setTimeout(() => {
    letterOut.value = true
  }, 800)

  // Esperar a que la carta salga completamente
  setTimeout(() => {
    isHidden.value = true
    emit('opened')
  }, 2500)
}
</script>

<template>
  <div
    class="envelope-wrapper"
    :class="{ hidden: isHidden }"
  >
    <div
      class="envelope-container"
      :class="{ open: isOpen }"
      @click="handleClick"
    >
      <div class="envelope-back"></div>
      <div class="envelope-letter" :class="{ out: letterOut }">
        <p class="announcement">¡Nos casamos!</p>
        <h1>
          Ana
          <span class="ampersand">&</span>
          Deimar
        </h1>
      </div>
      <div class="envelope-front"></div>
      <svg class="envelope-top" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <clipPath id="triangleClip">
            <path d="M0,8 Q0,0 4,0 L96,0 Q100,0 100,8 L52,98 Q50,100 48,98 Z"/>
          </clipPath>
        </defs>
        <g clip-path="url(#triangleClip)">
          <path d="M0,8 Q0,0 4,0 L96,0 Q100,0 100,8 L52,98 Q50,100 48,98 Z" fill="currentColor"/>
          <path d="M0,0 L0,25 L8,18 L16,28 L24,15 L32,25 L40,12 L48,22 L56,10 L64,20 L72,8 L80,18 L88,12 L96,22 L100,15 L100,0 Z" fill="rgba(255,255,255,0.15)"/>
          <path d="M0,0 L0,18 L10,12 L20,20 L30,10 L40,18 L50,8 L60,16 L70,6 L80,14 L90,8 L100,16 L100,0 Z" fill="rgba(255,255,255,0.2)"/>
          <path d="M0,0 L0,12 L12,8 L24,14 L36,6 L48,12 L60,4 L72,10 L84,5 L96,10 L100,6 L100,0 Z" fill="rgba(255,255,255,0.25)"/>
        </g>
      </svg>
      <img class="wax-seal" :class="{ hidden: letterOut }" src="/images/envelope/sello.png" alt="Sello" />
    </div>
    <p class="envelope-instruction">Haz clic en el sobre para abrir</p>
  </div>
</template>

<style scoped>
.envelope-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url('/images/backgrounds/background2.png') center center / cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  transition: opacity 0.8s ease, transform 0.8s ease;
  overflow: hidden;
}

.envelope-wrapper.hidden {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

.envelope-container {
  position: relative;
  width: 400px;
  height: 280px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.envelope-container:hover {
  transform: scale(1.05);
}

.envelope-back {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 100' preserveAspectRatio='none'%3E%3Cpath d='M0,100 L0,70 L30,85 L60,55 L90,75 L120,40 L150,65 L180,50 L210,70 L240,35 L270,60 L300,45 L330,70 L360,55 L390,75 L400,60 L400,100 Z' fill='rgba(180,140,90,0.25)'/%3E%3Cpath d='M0,100 L0,80 L40,90 L80,65 L120,80 L160,55 L200,75 L240,50 L280,70 L320,60 L360,80 L400,70 L400,100 Z' fill='rgba(160,120,70,0.3)'/%3E%3Cpath d='M0,100 L0,88 L50,95 L100,78 L150,90 L200,72 L250,88 L300,80 L350,92 L400,85 L400,100 Z' fill='rgba(140,100,50,0.35)'/%3E%3C/svg%3E") bottom/100% 60px no-repeat,
    rgb(239, 207, 155);
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  z-index: 1;
}

.envelope-front {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 100' preserveAspectRatio='none'%3E%3Cpath d='M0,100 L0,70 L30,85 L60,55 L90,75 L120,40 L150,65 L180,50 L210,70 L240,35 L270,60 L300,45 L330,70 L360,55 L390,75 L400,60 L400,100 Z' fill='rgba(180,140,90,0.25)'/%3E%3Cpath d='M0,100 L0,80 L40,90 L80,65 L120,80 L160,55 L200,75 L240,50 L280,70 L320,60 L360,80 L400,70 L400,100 Z' fill='rgba(160,120,70,0.3)'/%3E%3Cpath d='M0,100 L0,88 L50,95 L100,78 L150,90 L200,72 L250,88 L300,80 L350,92 L400,85 L400,100 Z' fill='rgba(140,100,50,0.35)'/%3E%3C/svg%3E") bottom/100% 60px no-repeat,
    rgb(239, 207, 155);
  clip-path: polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%);
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  z-index: 3;
}

.envelope-front::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 60%;
  background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%);
  clip-path: polygon(0 0, 100% 100%, 0 100%);
}

.envelope-front::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 60%;
  background: linear-gradient(225deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 100%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

.envelope-top {
  position: absolute;
  top: 80px;
  width: 100%;
  height: 110px;
  color: var(--olive);
  transform-origin: top;
  transition: transform 1s ease, z-index 0s 0.5s;
  z-index: 4;
  filter: drop-shadow(0 -3px 10px rgba(0,0,0,0.15));
}

.envelope-container.open .envelope-top {
  transform: rotateX(180deg);
  z-index: 1;
}

.envelope-letter {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 240px;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40' preserveAspectRatio='none'%3E%3Cpath d='M0,40 L0,30 L20,35 L40,25 L60,32 L80,20 L100,28 L120,18 L140,26 L160,15 L180,24 L200,12 L220,22 L240,14 L260,24 L280,16 L300,26 L320,18 L340,28 L360,20 L380,30 L400,22 L400,40 Z' fill='rgba(56,87,54,0.08)'/%3E%3Cpath d='M0,40 L0,34 L30,38 L60,30 L90,36 L120,26 L150,34 L180,24 L210,32 L240,22 L270,30 L300,24 L330,32 L360,26 L390,34 L400,28 L400,40 Z' fill='rgba(56,87,54,0.12)'/%3E%3C/svg%3E") bottom/100% 40px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 40' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,10 L20,5 L40,15 L60,8 L80,20 L100,12 L120,22 L140,14 L160,25 L180,16 L200,28 L220,18 L240,26 L260,16 L280,24 L300,14 L320,22 L340,12 L360,20 L380,10 L400,18 L400,0 Z' fill='rgba(56,87,54,0.08)'/%3E%3Cpath d='M0,0 L0,6 L30,2 L60,10 L90,4 L120,14 L150,6 L180,16 L210,8 L240,18 L270,10 L300,16 L330,8 L360,14 L390,6 L400,12 L400,0 Z' fill='rgba(56,87,54,0.12)'/%3E%3C/svg%3E") top/100% 40px no-repeat,
    white;
  border-radius: 10px;
  box-shadow: 0 5px 30px rgba(0,0,0,0.2);
  transition: transform 1s ease, opacity 0.5s ease;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  opacity: 0;
  overflow: hidden;
}

.envelope-letter.out {
  transform: translateX(-50%) translateY(-160px);
  opacity: 1;
  z-index: 5;
}

.envelope-letter h1 {
  font-size: 2.5rem;
  color: var(--olive);
  margin-bottom: 0.5rem;
  font-style: italic;
}

.envelope-letter .ampersand {
  font-size: 2rem;
  color: var(--primary);
  margin: 0 0.5rem;
}

.envelope-letter .announcement {
  font-size: 1.4rem;
  color: var(--text-light);
  font-family: 'Lora', serif;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.envelope-instruction {
  margin-top: 15px;
  font-size: 1rem;
  color: var(--olive);
  font-family: 'Lora', serif;
  font-style: italic;
  animation: pulse 2s ease-in-out infinite;
}

.wax-seal {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: auto;
  z-index: 5;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
  transition: opacity 0.5s ease;
}

.wax-seal.hidden {
  opacity: 0;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@media (max-width: 768px) {
  .envelope-container {
    width: 320px;
    height: 240px;
  }

  .envelope-top {
    top: 40px;
    height: 110px;
  }

  .envelope-letter {
    padding: 20px;
    height: 200px;
    top: 60px;
  }

  .envelope-letter.out {
    transform: translateX(-50%) translateY(-140px);
  }

  .envelope-letter h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .envelope-container {
    width: 280px;
    height: 200px;
  }

  .envelope-back,
  .envelope-front {
    height: 160px;
  }

  .envelope-top {
    top: 40px;
    height: 85px;
  }

  .envelope-letter {
    height: 160px;
    padding: 15px;
    top: 50px;
  }

  .envelope-letter.out {
    transform: translateX(-50%) translateY(-120px);
  }

  .envelope-letter h1 {
    font-size: 1.6rem;
  }

  .envelope-letter .ampersand {
    font-size: 1.5rem;
  }

  .envelope-letter .announcement {
    font-size: 1rem;
  }

  .wax-seal {
    width: 70px;
    bottom: 40px;
  }
}
</style>
