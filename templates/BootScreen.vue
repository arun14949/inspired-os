<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useSound } from '~/composables/useSound'

const emit = defineEmits(['complete'])
const { playSound } = useSound()

const bootScreen = ref(null)
const phase = ref('dos') // 'dos' | 'waiting' | 'splash' | 'done'
const visibleLines = ref(0)
const progressWidth = ref(0)
const dosComplete = ref(false)

const dosLines = [
  'InspiredMonster BIOS v1.0',
  'Copyright (C) 2024 InspiredMonster Corp.',
  '',
  'CPU: Creative Engine\u2122 @ Maximum Speed',
  'Memory: 640K Conventional, Extended: \u221E',
  'Testing RAM... OK',
  '',
  'Detecting Primary IDE... Portfolio Drive',
  'Detecting Secondary IDE... Game Drive',
  '',
  'Starting InspiredMonster OS...',
]

let dosTimer = null
let progressTimer = null

function handleInteraction() {
  if (phase.value === 'dos' && !dosComplete.value) {
    // Skip remaining DOS lines and go to waiting
    clearInterval(dosTimer)
    visibleLines.value = dosLines.length
    dosComplete.value = true
    // Small delay so user sees "Starting InspiredMonster OS..."
    setTimeout(() => { phase.value = 'waiting' }, 200)
  } else if (phase.value === 'dos' && dosComplete.value) {
    // DOS just finished, start splash
    startSplash()
  } else if (phase.value === 'waiting') {
    // User clicked/pressed key after DOS completed — start splash with sound
    startSplash()
  }
}

function startSplash() {
  phase.value = 'splash'
  playSound('startup')
  progressWidth.value = 0

  let progress = 0
  progressTimer = setInterval(() => {
    progress += 2
    progressWidth.value = progress
    if (progress >= 100) {
      clearInterval(progressTimer)
      finishBoot()
    }
  }, 80)
}

function finishBoot() {
  phase.value = 'done'
  sessionStorage.setItem('win95-booted', 'true')
  emit('complete')
}

onMounted(() => {
  // Skip boot if already booted this session
  if (sessionStorage.getItem('win95-booted') === 'true') {
    phase.value = 'done'
    emit('complete')
    return
  }

  // Focus the boot screen so keyboard events work
  nextTick(() => {
    if (bootScreen.value) bootScreen.value.focus()
  })

  // Phase 1: DOS POST text
  let lineIndex = 0
  dosTimer = setInterval(() => {
    lineIndex++
    visibleLines.value = lineIndex
    if (lineIndex >= dosLines.length) {
      clearInterval(dosTimer)
      dosComplete.value = true
      // Wait briefly then show "Press any key" prompt
      setTimeout(() => {
        if (phase.value === 'dos') {
          phase.value = 'waiting'
        }
      }, 500)
    }
  }, 200)
})

onUnmounted(() => {
  clearInterval(dosTimer)
  clearInterval(progressTimer)
})
</script>

<template>
  <div v-if="phase !== 'done'" ref="bootScreen" class="boot-screen" @click="handleInteraction" @keydown.prevent="handleInteraction" tabindex="0">
    <!-- DOS POST Phase -->
    <div v-if="phase === 'dos'" class="dos-phase">
      <div class="dos-text">
        <div v-for="(line, i) in dosLines" :key="i" :class="{ 'dos-line': true, visible: i < visibleLines }">
          {{ line }}
        </div>
      </div>
      <div class="skip-hint">Press any key or click to skip...</div>
    </div>

    <!-- Waiting for user interaction after DOS completes -->
    <div v-if="phase === 'waiting'" class="dos-phase">
      <div class="dos-text">
        <div v-for="(line, i) in dosLines" :key="i" class="dos-line visible">
          {{ line }}
        </div>
      </div>
      <div class="skip-hint blink">Press any key to continue...</div>
    </div>

    <!-- Windows 95 Splash Phase -->
    <div v-if="phase === 'splash'" class="splash-phase">
      <div class="splash-content">
        <!-- Windows 95 Flag Logo -->
        <div class="win-logo">
          <div class="flag-container">
            <div class="flag-quad red"></div>
            <div class="flag-quad green"></div>
            <div class="flag-quad blue"></div>
            <div class="flag-quad yellow"></div>
          </div>
        </div>
        <div class="splash-title">InspiredMonster<span class="splash-os">OS</span></div>

        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boot-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  outline: none;
}

/* DOS Phase */
.dos-phase {
  background: #000;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
}

.dos-text {
  font-family: 'Courier New', Courier, monospace;
  color: #aaa;
  font-size: 14px;
  line-height: 1.6;
}

.dos-line {
  opacity: 0;
  transition: opacity 0.05s;
}

.dos-line.visible {
  opacity: 1;
}

.skip-hint {
  font-family: 'Courier New', Courier, monospace;
  color: #555;
  font-size: 12px;
  text-align: center;
}

.skip-hint.blink {
  color: #aaa;
  animation: blink-text 1s step-end infinite;
}

@keyframes blink-text {
  50% { opacity: 0; }
}

/* Splash Phase */
.splash-phase {
  background: #018281;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

/* Windows Flag Logo */
.win-logo {
  perspective: 200px;
}

.flag-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  width: 80px;
  height: 80px;
  transform: rotateY(-15deg) skewY(-3deg);
}

.flag-quad {
  border-radius: 2px;
}

.flag-quad.red { background: #ff0000; }
.flag-quad.green { background: #00a800; }
.flag-quad.blue { background: #0000ff; }
.flag-quad.yellow { background: #ffff00; }

/* Title */
.splash-title {
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
  color: white;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
}

.splash-os {
  font-size: 16px;
  vertical-align: super;
  margin-left: 2px;
  font-weight: normal;
}

/* Progress Bar */
.progress-container {
  width: 200px;
  height: 18px;
  background: #000;
  border: 2px inset #808080;
  padding: 2px;
}

.progress-bar {
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    #000080 0px,
    #000080 8px,
    transparent 8px,
    transparent 10px
  );
  transition: width 0.08s linear;
}
</style>
