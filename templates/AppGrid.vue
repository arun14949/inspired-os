<script setup>
import interact from 'interactjs'
import { useWindowsStore } from '@/stores/windows'
import { useSound } from '~/composables/useSound'
import { onMounted, ref, computed } from 'vue';

const emit = defineEmits(['iconsLoaded'])
const windowsStore = useWindowsStore()
const { playSound } = useSound()
const gridHeight = ref("")
const visibleCount = ref(0)
const draggingIconId = ref(null)

const gridWindows = computed(() =>
    windowsStore.windows.filter(w => w.showInAppGrid !== false)
)

const selectIcon = (windowId, event) => {
    if (draggingIconId.value) return
    event.stopPropagation()
    playSound('click')
    windowsStore.selectIcon(windowId)
}

const openWindow = (windowId) => {
    if (draggingIconId.value) return
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

const getIconTransform = (windowId) => {
    const pos = windowsStore.iconPositions[windowId]
    if (!pos) return 'translate(0px, 0px)'
    return `translate(${pos.x}px, ${pos.y}px)`
}

function setupDraggable() {
    gridWindows.value.forEach((win) => {
        const el = document.querySelector(`li[data-icon-id="${win.windowId}"]`)
        if (!el) return

        interact(el).draggable({
            listeners: {
                start() {
                    draggingIconId.value = win.windowId
                },
                move(event) {
                    const pos = windowsStore.iconPositions[win.windowId] || { x: 0, y: 0 }
                    windowsStore.setIconPosition(win.windowId, pos.x + event.dx, pos.y + event.dy)
                },
                end() {
                    setTimeout(() => {
                        draggingIconId.value = null
                    }, 0)
                }
            },
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: '#screen',
                    endOnly: true
                })
            ],
        })
    })
}

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
            setupDraggable()
        }
    }, 200)
})
</script>

<template>
    <nav class="grid-container" :style="{ height: gridHeight }">
    <li
      v-for="(win, index) in gridWindows"
      :key="win.windowId"
      :data-icon-id="win.windowId"
      :style="{ transform: getIconTransform(win.windowId) }"
    >
      <button
        class="icon"
        :class="{
          'icon-selected': windowsStore.selectedIconIds.includes(win.windowId),
          'cursor-move': draggingIconId === win.windowId
        }"
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
