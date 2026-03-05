<script setup>
import { useWindowsStore } from '@/stores/windows'
import { useSound } from '~/composables/useSound'
import { onMounted } from 'vue';

const windowsStore = useWindowsStore()
const { playSound } = useSound()
const gridHeight = ref("")

const openWindow = (windowId) => {
    const payload = {
        windowState: "open",
        windowId: windowId
    }
    windowsStore.setWindowState(payload)
}

const getImagePath = (iconImage) => {
    const path = `../assets/win95Icons/${iconImage}`;
    const modules = import.meta.glob("../assets/win95Icons/*", { eager: true });
    const mod = modules[path]
    return mod ? mod.default : "";
};

onMounted(() => {
    let gridH = windowsStore.getFullscreenWindowHeight
    gridHeight.value = gridH.substring(0, gridH.length - 2) - 60 + "px"
})
</script>

<template>
    <nav class="grid-container" :style="{ height: gridHeight }">
    <li v-for="win in windowsStore.windows" :key="win.windowId">
      <button
        class="icon"
        v-if="win.showInAppGrid != false"
        @click="playSound('click')"
        @touchstart="openWindow(win.windowId)"
        @dblclick="playSound('dblclick'); openWindow(win.windowId)"
      >
      <img class="icon-image" :src="getImagePath(win.iconImage)" :alt="win.altText" />
        <div class="border-box">
          <p class="icon-text">
            {{ win.displayName }}
          </p>
        </div>
      </button>
    </li>
  </nav>
</template>
