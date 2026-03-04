<script setup>
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()

const openWindow = (windowId) => {
    windowsStore.setActiveWindow("")
    windowsStore.setWindowState({ windowState: "open", windowId: windowId })
}

const getImagePath = (iconImage) => {
    const path = `../assets/win95Icons/${iconImage}`;
    const modules = import.meta.glob("../assets/win95Icons/*", { eager: true });
    const mod = modules[path]
    return mod ? mod.default : "";
}
</script>

<template>
<div class="menu" style="z-index: 1000000">
    <div class="sidebar">
        <span class="sidebar-text">InspiredMonster<b>OS</b></span>
    </div>
    <div class="menu-items">
        <div class="bar" @click="openWindow('AboutApp')">
            <img class="menu-icon" :src="getImagePath('bio.png')" />
            <u>A</u>bout Me
        </div>
        <div class="bar" @click="openWindow('ProjectsExplorer')">
            <img class="menu-icon" :src="getImagePath('folder.png')" />
            <u>P</u>rojects
        </div>
        <div class="bar" @click="openWindow('GamesExplorer')">
            <img class="menu-icon" :src="getImagePath('games.png')" />
            <u>G</u>ames
        </div>
        <div class="bar" @click="openWindow('ExperimentsExplorer')">
            <img class="menu-icon" :src="getImagePath('experiments.png')" />
            <u>E</u>xperiments
        </div>
        <div class="bar" @click="openWindow('ResumeViewer')">
            <img class="menu-icon" :src="getImagePath('resume.png')" />
            <u>R</u>esume
        </div>
        <div class="bar" @click="openWindow('ContactApp')">
            <img class="menu-icon" :src="getImagePath('mail.png')" />
            <u>C</u>ontact
        </div>
        <div class="bar" @click="openWindow('TerminalApp')">
            <img class="menu-icon" :src="getImagePath('terminal.png')" />
            <u>T</u>erminal
        </div>
        <div class="divider"></div>
        <a href="https://github.com/arun14949" target="_blank">
            <div class="bar">
                <img class="menu-icon" :src="getImagePath('folder.png')" />
                GitHub
            </div>
        </a>
        <a href="https://linkedin.com/in/arunsajeev" target="_blank">
            <div class="bar">
                <img class="menu-icon" :src="getImagePath('folder.png')" />
                LinkedIn
            </div>
        </a>
    </div>
</div>
</template>

<style scoped>
.menu {
    width: 180px;
    background: rgb(195, 195, 195);
    overflow: hidden;
    border-top: solid rgb(250, 250, 250) 2px;
    border-left: solid rgb(250, 250, 250) 2px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    box-shadow: 1.5px 1.5px black;
    outline: rgb(222, 222, 222) 1px solid;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
}

a {
    color: black;
    text-decoration: none;
}

.sidebar {
    width: 25px;
    background: rgb(123, 125, 123);
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.sidebar-text {
    color: white;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-size: 14px;
    padding: 8px 2px;
    letter-spacing: 1px;
}

.menu-items {
    flex-grow: 1;
    padding: 2px 0;
}

.menu-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.divider {
    width: 100%;
    height: 1px;
    background: rgb(123, 125, 123);
    border-bottom: white solid 1px;
    margin: 2px 0;
}

.bar {
    display: flex;
    flex-direction: row;
    padding: 4px 10px;
    align-items: center;
    cursor: pointer;
}

.bar:hover {
    background: rgb(0, 0, 118);
    color: white;
}
</style>
