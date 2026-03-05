<script setup>
import interact from 'interactjs';
import { onMounted, ref, computed } from 'vue';
import { useWindowsStore } from '@/stores/windows'
import { useContentStore } from '@/stores/content'
import { useSound } from '~/composables/useSound'

const props = defineProps({
    windowId: String,
    nameOfWindow: String,
    content_padding_left: { type: String, default: "0" },
    content_padding_right: { type: String, default: "0" },
    content_padding_top: { type: String, default: "0" },
    content_padding_bottom: { type: String, default: "0" },
    dataSource: { type: String, required: true },
})

const position = ref({ x: 0, y: 0 })
const tempPosition = ref({ x: 0, y: 0 })
const windowsStore = useWindowsStore()
const contentStore = useContentStore()
const { playSound } = useSound()
const windowRef = ref({})
const ComponentName = props.nameOfWindow
const w = ref(500)
const h = ref(400)

const items = computed(() => contentStore.getItemsByType(props.dataSource))

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

const handleItemClick = (item) => {
    if (item.type === 'case-study') {
        windowsStore.openCaseStudy(item.caseStudySlug, item.name)
    } else if (item.type === 'iframe') {
        windowsStore.openIframeWindow(item.url, item.name, item.icon)
    } else if (item.type === 'link') {
        window.open(item.url, '_blank')
    }
}

const pathLabel = computed(() => {
    const labels = { projects: 'Projects', games: 'Games', experiments: 'Experiments' }
    return labels[props.dataSource] || props.dataSource
})

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
                interact.modifiers.restrictSize({
                    min: { width: 400, height: 300 },
                }),
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
            <img class="icon-image" src="@/assets/win95Icons/folder.png" :alt="windowRef.altText" />{{ windowRef.displayName }}
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
    <div class="content">
        <div class="top-bar-nav">
            <div class="top-bar-text">
                <span style="margin-right: 12px"><u>F</u>ile</span>
                <span style="margin-right: 12px"><u>E</u>dit</span>
                <span style="margin-right: 12px"><u>V</u>iew</span>
                <span style="margin-right: 12px"><u>H</u>elp</span>
            </div>
        </div>
        <div class="address-bar">
            <span class="address-label">Address</span>
            <div class="address-input">C:\InspiredMonster\{{ pathLabel }}</div>
        </div>
        <div class="file-explorer">
            <nav class="grid-container-files">
                <li v-for="item in items" :key="item.id">
                    <button class="icon-file" @click="playSound('click')" @dblclick="playSound('dblclick'); handleItemClick(item)" @touchstart="handleItemClick(item)">
                        <img class="icon-image-file" :src="getImagePath(item.icon)" :alt="item.name" />
                        <div class="border-box">
                            <p class="icon-text">{{ item.name }}</p>
                        </div>
                    </button>
                </li>
            </nav>
        </div>
        <div class="bottom-bar">
            <div class="left-bar bar">{{ items.length }} object(s)</div>
            <div class="right-bar bar"></div>
        </div>
    </div>
</div>
</template>

<style scoped>
.icon-text {
  display: block;
  overflow: hidden;
  width: 70px !important;
  font-size: 12px;
  font-weight: 300;
  color: black;
  text-overflow: ellipsis;
  text-align: center;
}

.icon-file {
  color: black;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;
  text-align: center;
  width: 70px;
}

.icon-file:hover { cursor: pointer; }

.icon-file:focus .icon-image-file {
  filter: grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(400%) contrast(0.9);
}

.icon-file:focus .icon-text {
  background: rgb(0, 0, 118);
  color: white;
}

.icon-file:focus .border-box {
  border: rgb(0, 0, 0) dotted 1px;
}

.icon-image-file {
  width: 32px;
  height: 32px;
  margin-bottom: 5px;
}

.grid-container-files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-explorer {
  background: white;
  box-shadow: none;
  border-top: solid rgb(0, 0, 0) 1.5px;
  border-left: solid rgb(0, 0, 0) 1.5px;
  border-bottom: solid rgb(250, 250, 250) 1.5px;
  border-right: solid rgb(250, 250, 250) 1.5px;
  height: calc(100% - 76px);
  width: auto;
  z-index: 10;
  margin: 2px;
  padding: 2px;
  overflow-y: auto;
}

.address-bar {
  display: flex;
  align-items: center;
  height: 24px;
  padding: 0 4px;
  gap: 4px;
}

.address-label {
  font-size: 12px;
  white-space: nowrap;
}

.address-input {
  flex: 1;
  height: 18px;
  background: white;
  border-top: solid rgb(0, 0, 0) 1px;
  border-left: solid rgb(0, 0, 0) 1px;
  border-bottom: solid rgb(250, 250, 250) 1px;
  border-right: solid rgb(250, 250, 250) 1px;
  font-size: 12px;
  padding: 1px 4px;
  display: flex;
  align-items: center;
}

/* Window chrome styles */
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

.content {
  flex-grow: 1;
  overflow-x: hidden;
}

.bottom-bar {
  height: 22px;
  display: flex;
  width: 100%;
}

.bar {
  height: 100%;
  margin: 2px;
  padding: 0px 2px 1px 0px;
  border-top: solid rgb(0, 0, 0) 1.5px;
  border-left: solid rgb(0, 0, 0) 1.5px;
  border-bottom: solid rgb(250, 250, 250) 1.5px;
  border-right: solid rgb(250, 250, 250) 1.5px;
}

.left-bar {
  width: 100%;
  padding-left: 2px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.right-bar {
  width: 100%;
  padding-left: 2px;
  display: flex;
  align-items: center;
}

/* Top bar */
.top-bar { background: rgb(0, 0, 124); }

.top-bar-nav {
  display: flex;
  height: 22px;
  width: 100%;
}

.top-bar-text {
  height: 100%;
  padding-left: 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

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
