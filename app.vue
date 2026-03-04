<script setup>
import Window from './templates/Window.vue'
import ExplorerWindow from './templates/ExplorerWindow.vue'
import TerminalWindow from './templates/TerminalWindow.vue'
import IframeWindow from './templates/IframeWindow.vue'
import Navbar from './templates/Navbar.vue'
import AppGrid from './templates/AppGrid.vue'
import StartMenu from './templates/StartMenu.vue'

import About from './views/About.vue'
import Resume from './views/Resume.vue'
import Contact from './views/Contact.vue'
import CaseStudy from './views/CaseStudy.vue'

import { useWindowsStore } from './stores/windows'

const windowsStore = useWindowsStore()
const windows = windowsStore.windows

const slotViews = [
  { name: 'about', comp: About },
  { name: 'resume', comp: Resume },
  { name: 'contact', comp: Contact },
  { name: 'casestudy', comp: CaseStudy },
]

const windowCheck = (windowId) => {
    const w = windowsStore.getWindowById(windowId)
    return w && w.windowState == "open"
}

const deinitWindows = () => {
  if (windowsStore.activeWindow == "Menu") {
    windowsStore.setActiveWindow("")
    windowsStore.zIndexIncrement("")
  }
}

const openWindow = (windowId) => {
  windowsStore.setWindowState({ windowState: "open", windowId: windowId })
}

onMounted(() => {
  let navbar = document.getElementById("navbar");
  let navbarHeight = navbar.clientHeight;

  document.getElementById("screen").style.height =
  window.innerHeight - navbarHeight + "px";

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  openWindow('AboutApp')
})
</script>

<template>
  <div id="app">
    <div class="screen" id="screen" @click="deinitWindows">
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
      <AppGrid />
    </div>
    <StartMenu
      v-if="windowsStore.activeWindow == 'Menu'"
      style="position: absolute; z-index: 9999; left: 0; bottom: 36px"
    />
    <navbar style="position: absolute; bottom: 0; z-index: 9999" id="navbar" />
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
</style>
