<script setup>
import dayjs from "dayjs";
import {
    useWindowsStore
} from '@/stores/windows'
import { useSound } from '~/composables/useSound'

const date = ref("")
const time = ref("")
const soundMuted = ref(false)
const crtEnabled = ref(false)

const windowsStore = useWindowsStore()
const { playSound, toggleMute, isMuted } = useSound()

const getImagePath = (iconImage) => {
    const path = `../assets/win95Icons/${iconImage}`;
    const modules =
        import.meta.glob("../assets/win95Icons/*", {
            eager: true
        });
    const mod = modules[path]
    if (mod == undefined) {
        return ""
    } else {
        return mod.default;
    }
};

const openWindow = (windowId) => {
    const payload = {
        windowState: "open",
        windowId: windowId
    }
    windowsStore.setWindowState(payload)
}

const handleStartClick = () => {
    playSound('menu')
    windowsStore.setActiveWindow('Menu')
}

const handleMuteToggle = () => {
    soundMuted.value = toggleMute()
}

const handleCrtToggle = () => {
    crtEnabled.value = !crtEnabled.value
    localStorage.setItem('win95-crt', String(crtEnabled.value))
    document.documentElement.classList.toggle('crt', crtEnabled.value)
}

const isFullscreen = ref(false)

const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

onMounted(() => {
    document.addEventListener('fullscreenchange', () => {
        isFullscreen.value = !!document.fullscreenElement
    })
})

onBeforeMount(() => {
    soundMuted.value = isMuted()
    crtEnabled.value = localStorage.getItem('win95-crt') !== 'false'
    setInterval(() => {
        time.value = dayjs().format("hh:mm A");
    }, 1000);
    setInterval(() => {
        date.value = dayjs().format("ddd DD MMMM");
    }, 1000);
})
</script>

<template>
<nav class="navbar-container">
    <div alt="start" class="start-menu" v-on:click="handleStartClick" :class="
          windowsStore.activeWindow == 'Menu'
            ? 'start-menu-depressed'
            : 'start-menu'
        ">
        <div class="flex" :class="
            windowsStore.activeWindow == 'Menu'
                ? 'border-box'
                : 'container-border'
            ">
            <img class="start-icon" src="../assets/win95.png" />
            <button style="padding-left: 3px; font-size: 0.9rem; font-weight: bold">
                Start
            </button>
        </div>
    </div>
    <div class="overflow-x-scroll flex no-scrollbar">
    <div v-for="window in windowsStore.activeWindows" :key="window.key">
        <button v-if="
            windowsStore.activeWindow !== window.windowId &&
            (window.windowState == 'open' || window.windowState == 'minimize')
            " @click="openWindow(window.windowId)" class="navbar-item open">
            <img class="icon-image" :src=getImagePath(window.iconImage) :alt="window.altText" />
            <p>{{ window.displayName }}</p>
        </button>
        <button v-if="windowsStore.activeWindow == window.windowId" @click="openWindow(window.windowId)" class="navbar-item-depressed">
            <img class="icon-image" :src=getImagePath(window.iconImage) :alt="window.altText" />
            <p>{{ window.displayName }}</p>
        </button>
    </div>
    </div>
    <div class="spacer"></div>
    <div alt="time" class="tray">
        <svg
            class="tray-icon"
            @click="handleCrtToggle"
            width="16" height="16" viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>{{ crtEnabled ? 'Disable CRT Effect' : 'Enable CRT Effect' }}</title>
            <rect x="1" y="1" width="14" height="10" fill="#c0c0c0" stroke="#808080" stroke-width="1"/>
            <rect x="2" y="2" width="12" height="8" :fill="crtEnabled ? '#00a800' : '#404040'"/>
            <template v-if="crtEnabled">
                <line x1="2" y1="4" x2="14" y2="4" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>
                <line x1="2" y1="6" x2="14" y2="6" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>
                <line x1="2" y1="8" x2="14" y2="8" stroke="rgba(0,0,0,0.3)" stroke-width="0.5"/>
            </template>
            <rect x="5" y="11" width="6" height="1" fill="#808080"/>
            <rect x="4" y="12" width="8" height="1" fill="#808080"/>
        </svg>
        <img
            src="../assets/speakers.png"
            class="tray-icon speaker-icon"
            :class="{ 'speaker-muted': soundMuted }"
            :title="soundMuted ? 'Sound: Off' : 'Sound: On'"
            @click="handleMuteToggle"
        />
        <svg
            class="tray-icon fullscreen-icon"
            @click="handleFullscreenToggle"
            width="16" height="16" viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>{{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}</title>
            <template v-if="!isFullscreen">
                <!-- Single maximized window -->
                <rect x="1" y="1" width="14" height="14" fill="#c0c0c0" stroke="#808080" stroke-width="1"/>
                <rect x="2" y="2" width="12" height="3" fill="#000080"/>
                <rect x="3" y="6" width="10" height="8" fill="#fff" stroke="#808080" stroke-width="0.5"/>
            </template>
            <template v-else>
                <!-- Two cascaded/restored windows -->
                <rect x="4" y="1" width="11" height="11" fill="#c0c0c0" stroke="#808080" stroke-width="1"/>
                <rect x="5" y="2" width="9" height="2.5" fill="#000080"/>
                <rect x="1" y="4" width="11" height="11" fill="#c0c0c0" stroke="#808080" stroke-width="1"/>
                <rect x="2" y="5" width="9" height="2.5" fill="#000080"/>
                <rect x="2" y="8" width="9" height="6" fill="#fff" stroke="#808080" stroke-width="0.5"/>
            </template>
        </svg>
        <time>{{ time }}</time>
    </div>
</nav>
</template>

<style scoped>
/*-------------------------------------------*\
      Container
  \*-------------------------------------------*/

.navbar-container {
    width: 100%;
    height: 35px;
    background: rgb(192, 192, 192);
    border-top: solid rgb(250, 250, 250) 2px;
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
}

/*-------------------------------------------*\
      Navbar Items
  \*-------------------------------------------*/

.navbar-item {
    width: 100px;
    height: 28px;
    border-radius: 10px;
    margin-left: 2px;
    margin-right: 2px;
    box-shadow: 1.5px 1.5px black;
    border-top: solid rgb(250, 250, 250) 1.5px;
    border-left: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    background: rgb(192, 192, 192);
    border-radius: 0.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center !important;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
    font-size: 0.7rem;
    padding-top: 2px;
}

.navbar-item:active {
    background: rgb(192, 192, 192);
    box-shadow: none;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
}

.navbar-item:hover {
    cursor: pointer;
}

.navbar-item-depressed {
    width: 100px;
    height: 28px;
    border-radius: 10px;
    margin-left: 2px;
    margin-right: 2px;
    border-radius: 0.5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
    font-weight: bold;
    font-size: 0.7rem;
    background: rgb(192, 192, 192);
    box-shadow: none;
    background: repeating-conic-gradient(rgb(189, 190, 189) 0% 25%,
            rgb(255, 255, 255) 0% 50%) 50% / 2px 2px;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
    padding-top: 2px;
}

.start-icon {
    width: 18px;
    height: 18px;
}

.start-menu {
    width: 65px;
    margin: 5px;
    height: 25px;
    box-shadow: 1.5px 1.5px black;
    border-top: solid rgb(250, 250, 250) 1.5px;
    border-left: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    background: rgb(192, 192, 192);
    display: flex !important;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
}

.start-menu:hover {
    cursor: pointer;
}

.start-menu:active {
    background: rgb(192, 192, 192);
    box-shadow: none;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
}

.start-menu-depressed {
    box-shadow: none;
    background: repeating-conic-gradient(rgb(189, 190, 189) 0% 25%,
            rgb(255, 255, 255) 0% 50%) 50% / 2px 2px;
    border-top: solid rgb(0, 0, 0) 1.5px;
    border-left: solid rgb(0, 0, 0) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-right: solid rgb(250, 250, 250) 1.5px;
}

.container-border {
    display: flex;
    justify-content: center;
    align-items: center;
}

.border-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border: black dotted 1px;
}

/*-------------------------------------------*\
      Utilities
  \*-------------------------------------------*/

.icon-image {
    width: 15px;
    height: 15px;
    margin-right: 5px;
    margin-top: 0;
    margin-bottom: 0;
}

.tray-icon {
    width: 16px;
    height: 16px;
    cursor: pointer;
    flex-shrink: 0;
}

.speaker-icon {
    width: 16px;
    height: 16px;
}

.speaker-muted {
    opacity: 0.4;
}

.spacer {
    flex-grow: 1;
}

.tray {
    margin: 5px;
    height: 25px;
    padding: 0 6px;
    background: rgb(192, 192, 192);
    border-right: solid rgb(250, 250, 250) 1.5px;
    border-bottom: solid rgb(250, 250, 250) 1.5px;
    border-top: solid rgb(90, 90, 90) 1.5px;
    border-left: solid rgb(90, 90, 90) 1.5px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.6em;
    white-space: nowrap;
}

@media only screen and (max-width: 700px) {
    .tray {
        padding-left: 5px;
        padding-right: 5px;
    }

    .fullscreen-icon {
        display: none;
    }

    .icon-image {
        width: 0px;
        height: 0px;
        margin-right: 0px;
    }

    .navbar-item {
        width: auto;
        padding-top: 0;
    }

    .navbar-item-depressed {
        width: auto;
        padding-top: 0;
    }
}

/*-------------------------------------------*\
      CSS Normalisation 
  \*-------------------------------------------*/

button {
    background: none;
    color: inherit;
    border: none;
    font: inherit;
    outline: inherit;
}

p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
