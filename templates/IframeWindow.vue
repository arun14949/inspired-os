<script setup>
import interact from 'interactjs';
import { onMounted, ref, computed } from 'vue';
import { useWindowsStore } from '@/stores/windows'
import { useSound } from '~/composables/useSound'

const props = defineProps({
    windowId: String,
    nameOfWindow: String,
    iframeUrl: { type: String, required: true },
})

const position = ref({ x: 0, y: 0 })
const tempPosition = ref({ x: 0, y: 0 })
const windowsStore = useWindowsStore()
const { playSound } = useSound()
const windowRef = ref({})
const ComponentName = props.nameOfWindow
const w = ref(700)
const h = ref(500)

const style = computed(() => ({
    height: `${h.value}px`,
    width: `${w.value}px`,
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
    "--fullscreen": windowsStore.getFullscreenWindowHeight,
}))

const getImagePath = (iconImage) => {
    const path = `../assets/win95Icons/${iconImage}`;
    const modules = import.meta.glob("../assets/win95Icons/*", { eager: true });
    const mod = modules[path]
    return mod ? mod.default : "";
}

const setActiveWindow = () => {
    windowsStore.setActiveWindow(windowRef.value.windowId)
    windowsStore.zIndexIncrement(windowRef.value.windowId)
}

const toggleWindowSize = () => {
    playSound('maximize')
    if (windowsStore.getWindowFullscreen(windowRef.value.windowId)) {
        windowsStore.setFullscreen({ fullscreen: false, windowId: windowRef.value.windowId })
        position.value.x = tempPosition.value.x
        position.value.y = tempPosition.value.y
    } else {
        windowsStore.setFullscreen({ fullscreen: true, windowId: windowRef.value.windowId })
        tempPosition.value.x = position.value.x
        tempPosition.value.y = position.value.y
        position.value.x = 0
        position.value.y = 0
    }
}

const minimizeWindow = () => {
    windowsStore.setActiveWindow("")
    windowsStore.setWindowState({ windowState: "minimize", windowId: windowRef.value.windowId })
}

const closeWindow = () => {
    windowsStore.setWindowState({ windowState: "close", windowId: windowRef.value.windowId })
}

let isDragging = false;

onMounted(() => {
    windowRef.value = windowsStore.getWindowById(ComponentName)
    const draggableWindow = interact("#" + windowRef.value.windowId)
    draggableWindow
        .draggable({
            listeners: {
                move(event) {
                    position.value.x += event.dx
                    position.value.y += event.dy
                }
            },
            modifiers: [
                interact.modifiers.restrictRect({ restriction: '#screen', endOnly: true }),
            ],
            allowFrom: '#top-bar'
        })
        .on('dragstart', () => { isDragging = true })
        .on('dragmove', () => {
            if (isDragging) { setActiveWindow(); isDragging = false }
        })
        .on('dragend', () => { isDragging = false })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: false },
            listeners: {
                move(event) {
                    w.value = event.rect.width
                    h.value = event.rect.height
                    position.value.x += event.deltaRect.left
                    position.value.y += event.deltaRect.top
                }
            },
            modifiers: [
                interact.modifiers.restrictSize({ min: { width: 400, height: 300 } }),
            ],
        })
})
</script>

<template>
<div :id="windowRef.windowId" :style="style" class="window window-style" :class="{
        'fullscreen': windowRef.fullscreen == true,
        'minimize': windowRef.fullscreen == 'minimize',
    }"
    @click="setActiveWindow" @dragstart="setActiveWindow">
    <div id="top-bar" class="top-bar-window" :class="
        windowsStore.activeWindow == windowRef.windowId ? 'top-bar' : 'top-bar-deactivated'
        " @dblclick="toggleWindowSize">
        <div class="window-name">
            <img class="icon-image" :src="getImagePath(windowRef.iconImage)" :alt="windowRef.altText" />{{ windowRef.displayName }}
        </div>
        <div class="triple-button">
            <button class="minimize-button button" @click="minimizeWindow">
                <span style="height: 2px; width: 6px; background: black; margin-top: 8px; margin-right: 2px;"></span>
            </button>
            <button class="expand-button button" @click="toggleWindowSize">
                <span style="height: 8px; width: 9px; border-left: black 1px solid; border-right: black 1px solid; border-bottom: black 1px solid; border-top: black 2px solid;"></span>
            </button>
            <button class="close-button button" style="margin-right: 3px; padding-left: 1px" @click="closeWindow">
                ×
            </button>
        </div>
    </div>
    <iframe
        :src="iframeUrl"
        class="iframe-content"
        :title="windowRef.displayName"
        sandbox="allow-scripts allow-same-origin allow-popups"
    />
</div>
</template>

<style scoped>
.iframe-content {
  width: 100%;
  flex: 1;
  border: none;
  background: white;
}

.minimize { display: none; }

.window {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  user-select: none;
  -ms-touch-action: none;
  touch-action: none;
  flex-flow: column;
  display: flex;
}

.fullscreen {
  width: 100% !important;
  height: var(--fullscreen) !important;
  margin: 0;
  transition: all 0.5s ease;
  padding: 0;
}

.top-bar { background: rgb(0, 0, 124); }

.icon-image {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.top-bar-window {
  display: flex;
  width: auto;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 10;
  margin: 2px;
  padding: 2px;
}

.top-bar-deactivated { background: rgb(123, 125, 123); }
.top-bar:hover { cursor: default; }

.window-name {
  color: white;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 0;
  font-size: 16px;
  margin: 0 0 0 3px;
}
</style>
