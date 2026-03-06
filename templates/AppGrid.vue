<script setup>
import { useWindowsStore } from '@/stores/windows'
import { useSound } from '~/composables/useSound'
import { onMounted, ref, computed } from 'vue';

const emit = defineEmits(['iconsLoaded'])
const windowsStore = useWindowsStore()
const { playSound } = useSound()
const gridHeight = ref("")
const visibleCount = ref(0)

const gridWindows = computed(() =>
    windowsStore.windows.filter(w => w.showInAppGrid !== false)
)

const selectIcon = (windowId, event) => {
    event.stopPropagation()
    playSound('click')
    windowsStore.selectIcon(windowId)
}

const openWindow = (windowId) => {
    playSound('dblclick')
    windowsStore.clearSelection()
    windowsStore.setWindowState({
        windowState: "open",
        windowId: windowId
    })
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

    // Stagger icon appearance
    const total = gridWindows.value.length
    let count = 0
    const interval = setInterval(() => {
        count++
        visibleCount.value = count
        if (count >= total) {
            clearInterval(interval)
            emit('iconsLoaded')
        }
    }, 200)
})
</script>

<template>
    <nav class="grid-container" :style="{ height: gridHeight }">
    <li v-for="(win, index) in gridWindows" :key="win.windowId">
      <button
        class="icon"
        :class="{ 'icon-selected': windowsStore.selectedIconIds.includes(win.windowId) }"
        :data-window-id="win.windowId"
        v-show="index < visibleCount"
        @click="selectIcon(win.windowId, $event)"
        @touchstart="openWindow(win.windowId)"
        @dblclick="openWindow(win.windowId)"
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
