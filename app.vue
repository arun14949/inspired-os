<script setup>
import { ref, reactive, computed } from 'vue'
import Window from './templates/Window.vue'
import ExplorerWindow from './templates/ExplorerWindow.vue'
import TerminalWindow from './templates/TerminalWindow.vue'
import IframeWindow from './templates/IframeWindow.vue'
import Navbar from './templates/Navbar.vue'
import AppGrid from './templates/AppGrid.vue'
import StartMenu from './templates/StartMenu.vue'
import BootScreen from './templates/BootScreen.vue'
import ContextMenu from './templates/ContextMenu.vue'

import About from './views/About.vue'
import Resume from './views/Resume.vue'
import Contact from './views/Contact.vue'
import CaseStudy from './views/CaseStudy.vue'

import { useWindowsStore } from './stores/windows'
import { useDesktopSelection } from './composables/useDesktopSelection'

const windowsStore = useWindowsStore()
const windows = windowsStore.windows
const bootComplete = ref(false)
const iconsLoading = ref(true)

const slotViews = [
  { name: 'about', comp: About },
  { name: 'resume', comp: Resume },
  { name: 'contact', comp: Contact },
  { name: 'casestudy', comp: CaseStudy },
]

// Desktop drag-selection (lasso)
const { isSelecting, selectionBox, onMouseDown: onLassoMouseDown } = useDesktopSelection((ids) => {
  windowsStore.setSelection(ids)
})

// Context menu
const contextMenu = reactive({ visible: false, x: 0, y: 0 })

const contextMenuItems = computed(() => [
  {
    label: 'Arrange Icons',
    dividerAfter: true,
    disabled: !windowsStore.iconsMoved,
    action: () => {
      windowsStore.resetIconPositions()
    },
  },
  {
    label: 'Refresh',
    action: () => location.reload(),
  },
  {
    label: 'View Source Code',
    action: () => window.open('https://github.com/arun14949/inspired-os', '_blank'),
  },
])

const onContextMenu = (event) => {
  if (event.target.closest('.window-style') || event.target.closest('.navbar-container')) return
  event.preventDefault()
  contextMenu.visible = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
}

const closeContextMenu = () => {
  contextMenu.visible = false
}

const windowCheck = (windowId) => {
    const w = windowsStore.getWindowById(windowId)
    return w && w.windowState == "open"
}

const deinitWindows = () => {
  windowsStore.clearSelection()
  closeContextMenu()
  if (windowsStore.activeWindow == "Menu") {
    windowsStore.setActiveWindow("")
    windowsStore.zIndexIncrement("")
  }
}

const openWindow = (windowId) => {
  windowsStore.setWindowState({ windowState: "open", windowId: windowId })
}

const onBootComplete = () => {
  bootComplete.value = true
}

const onIconsLoaded = () => {
  iconsLoading.value = false
}

onMounted(() => {
  const navbar = document.getElementById("navbar")
  const screen = document.getElementById("screen")
  if (navbar && screen) {
    screen.style.height = window.innerHeight - navbar.clientHeight + "px"
  }

  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  })

  if (localStorage.getItem('win95-crt') !== 'false') {
    document.documentElement.classList.add('crt')
  }
})
</script>

<template>
  <div id="app">
    <BootScreen @complete="onBootComplete" />
    <div
      class="screen"
      :class="{ 'cursor-wait': iconsLoading }"
      id="screen"
      @click="deinitWindows"
      @mousedown="onLassoMouseDown"
      @contextmenu="onContextMenu"
      v-show="bootComplete"
    >
      <div
        v-for="win in windows"
        :key="win.windowId"
        :aria-label="win.displayName"
      >
        <!-- Standard Window (About, Resume, Contact, CaseStudy) -->
        <Window
          v-if="win.windowComponent === 'window' && windowCheck(win.windowId)"
          :nameOfWindow="win.windowId"
          :content_padding_bottom="win.windowContentPadding['bottom']"
          :content_padding_left="win.windowContentPadding['left']"
          :content_padding_right="win.windowContentPadding['right']"
          :content_padding_top="win.windowContentPadding['top']"
          :id="win.windowId"
          :style="{
            position: win.position,
            left: win.positionX,
            top: win.positionY,
          }"
        >
          <template v-slot:content>
            <component
              v-if="slotViews.find(sv => sv.name === win.windowContent)"
              :is="slotViews.find(sv => sv.name === win.windowContent).comp"
            />
          </template>
        </Window>

        <!-- Explorer Window (Projects, Games, Experiments) -->
        <ExplorerWindow
          v-if="win.windowComponent === 'ExplorerWindow' && windowCheck(win.windowId)"
          :nameOfWindow="win.windowId"
          :dataSource="win.explorerDataSource"
          :id="win.windowId"
          :style="{
            position: win.position,
            left: win.positionX,
            top: win.positionY,
          }"
        />

        <!-- Terminal Window -->
        <TerminalWindow
          v-if="win.windowComponent === 'TerminalWindow' && windowCheck(win.windowId)"
          :nameOfWindow="win.windowId"
          :id="win.windowId"
          :style="{
            position: win.position,
            left: win.positionX,
            top: win.positionY,
          }"
        />

        <!-- Iframe Window (dynamically spawned for games/experiments) -->
        <IframeWindow
          v-if="win.windowComponent === 'IframeWindow' && windowCheck(win.windowId)"
          :nameOfWindow="win.windowId"
          :iframeUrl="win.iframeUrl"
          :id="win.windowId"
          :style="{
            position: win.position,
            left: win.positionX,
            top: win.positionY,
          }"
        />
      </div>
      <!-- Lasso selection box -->
      <div
        v-if="isSelecting"
        class="lasso-box"
        :style="{
          left: selectionBox.x + 'px',
          top: selectionBox.y + 'px',
          width: selectionBox.width + 'px',
          height: selectionBox.height + 'px',
        }"
      ></div>
      <AppGrid @iconsLoaded="onIconsLoaded" />
    </div>
    <ContextMenu
      v-if="contextMenu.visible"
      :x="contextMenu.x"
      :y="contextMenu.y"
      :items="contextMenuItems"
      @close="closeContextMenu"
    />
    <StartMenu
      v-if="windowsStore.activeWindow == 'Menu'"
      v-show="bootComplete"
      style="position: absolute; z-index: 9999; left: 0; bottom: 36px"
    />
    <navbar v-show="bootComplete" style="position: absolute; bottom: 0; z-index: 9999" id="navbar" />
  </div>
</template>

<style>

@import "./assets/css/utils/normalize.css";
@import "./assets/css/windows/app.css";
@import "./assets/css/windows/window.css";
@import "./assets/css/windows/appgrid.css";

@font-face {
  font-family: "MS Sans Serif";
  src: url("@/assets/fonts/MS-Sans-Serif.ttf");
}

html {
  overflow: hidden;
  cursor: url('/cursors/arrow.png') 0 0, auto;
}

/* Pointer cursor for interactive elements */
a, button, [role="button"], select, summary,
input[type="submit"], input[type="button"], input[type="reset"],
.context-item, .tray-icon, .icon-file, .start-menu, .bar {
  cursor: url('/cursors/pointer.png') 6 0, pointer;
}

/* Text cursor for text inputs */
input[type="text"], input[type="password"], input[type="email"],
input[type="url"], input[type="search"], input[type="tel"],
input[type="number"], textarea, [contenteditable="true"] {
  cursor: url('/cursors/text.png') 8 11, text;
}

/* Wait/hourglass cursor during loading */
.cursor-wait, .cursor-wait * {
  cursor: url('/cursors/hourglass.png') 7 0, wait !important;
}

/* Move cursor for icon dragging */
.cursor-move {
  cursor: url('/cursors/move.png') 8 8, move !important;
}

h6 {
    margin-top: 5px !important;
}

#app {
  font-family: "MS Sans Serif";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
}

.screen {
  width: 100%;
  position: relative;
  z-index: 999;
}

.lasso-box {
  position: absolute;
  border: 1px dotted #000;
  pointer-events: none;
  z-index: 998;
}

::-webkit-scrollbar {
  width: 15px;
  background: repeating-conic-gradient(
      rgb(189, 190, 189) 0% 25%,
      rgb(255, 255, 255) 0% 50%
    )
    50% / 2px 2px;
}
::-webkit-scrollbar-thumb {
  background: rgb(189, 190, 189);
  border-top: solid rgb(250, 250, 250) 1.5px;
  border-left: solid rgb(250, 250, 250) 1.5px;
  border-bottom: solid rgb(90, 90, 90) 1.5px;
  border-right: solid rgb(90, 90, 90) 1.5px;
  outline: rgb(219, 219, 219);
}

.fullscreen {
  left: 0 !important;
  position: relative;
  display: block;
  top: 0 !important;
  right: 0 !important;
}

@media (max-width: 768px) {
  .window-style {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: calc(100vh - 40px) !important;
    min-width: 100vw !important;
    transform: none !important;
  }
}

/* CRT scanlines overlay */
html.crt #app::before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.15) 50%
  ), linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.06),
    rgba(0, 255, 0, 0.02),
    rgba(0, 0, 255, 0.06)
  );
  background-size: 100% 2px, 3px 100%;
  z-index: 100000;
  pointer-events: none;
}

/* CRT flicker overlay */
html.crt #app::after {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(18, 16, 16, 0.1);
  opacity: 0;
  z-index: 100000;
  pointer-events: none;
  animation: crt-flicker 0.15s infinite;
}

@keyframes crt-flicker {
  0% { opacity: 0.14; }
  10% { opacity: 0.12; }
  20% { opacity: 0.09; }
  30% { opacity: 0.33; }
  40% { opacity: 0.14; }
  50% { opacity: 0.48; }
  60% { opacity: 0.10; }
  70% { opacity: 0.27; }
  80% { opacity: 0.36; }
  90% { opacity: 0.35; }
  100% { opacity: 0.12; }
}
</style>
