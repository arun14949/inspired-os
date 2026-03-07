<script setup>
import interact from 'interactjs'
import { useWindowsStore } from '@/stores/windows'
import { useSound } from '~/composables/useSound'
import { useDeviceDetection } from '~/composables/useDeviceDetection'
import { onMounted, ref, computed } from 'vue';

const emit = defineEmits(['iconsLoaded'])
const windowsStore = useWindowsStore()
const { playSound } = useSound()
const { isMobile } = useDeviceDetection()
const gridHeight = ref("")
const visibleCount = ref(0)
const draggingIconId = ref(null)
const lastTapTime = ref(0)
const lastTappedIcon = ref(null)
const DOUBLE_TAP_DELAY = 300 // milliseconds

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

const handleTouchStart = (windowId, event) => {
    if (!isMobile.value) return
    if (draggingIconId.value) return

    event.preventDefault()

    const now = Date.now()
    const timeSinceLastTap = now - lastTapTime.value

    if (timeSinceLastTap < DOUBLE_TAP_DELAY && lastTappedIcon.value === windowId) {
        // Double-tap detected
        openWindow(windowId)
        lastTapTime.value = 0
        lastTappedIcon.value = null
    } else {
        // Single tap - select icon
        selectIcon(windowId, event)
        lastTapTime.value = now
        lastTappedIcon.value = windowId
    }
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
    if (isMobile.value) return

    gridWindows.value.forEach((win) => {
        const el = document.querySelector(`li[data-icon-id="${win.windowId}"]`)
        if (!el) return

        interact(el).draggable({
            listeners: {
                start() {
                    draggingIconId.value = win.windowId
                },
                move(event) {
                    const draggedIconId = win.windowId
                    const selectedIds = windowsStore.selectedIconIds
                    const isMultiSelect = selectedIds.length > 1 && selectedIds.includes(draggedIconId)

                    if (isMultiSelect) {
                        // Group drag: move all selected icons together
                        windowsStore.updateMultipleIconPositions(selectedIds, event.dx, event.dy)
                    } else {
                        // Single drag: move only this icon
                        const pos = windowsStore.iconPositions[draggedIconId] || { x: 0, y: 0 }
                        windowsStore.setIconPosition(draggedIconId, pos.x + event.dx, pos.y + event.dy)
                    }
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
        @click="!isMobile && selectIcon(win.windowId, $event)"
        @touchstart="isMobile && handleTouchStart(win.windowId, $event)"
        @dblclick="!isMobile && openWindow(win.windowId)"
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
