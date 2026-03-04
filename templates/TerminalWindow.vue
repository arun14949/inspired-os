<script setup>
import interact from 'interactjs';
import { onMounted, ref, nextTick, computed } from 'vue';
import { useWindowsStore } from '@/stores/windows'

const props = defineProps({
    windowId: String,
    nameOfWindow: String,
})

const position = ref({ x: 0, y: 0 })
const tempPosition = ref({ x: 0, y: 0 })
const windowsStore = useWindowsStore()
const windowRef = ref({})
const ComponentName = props.nameOfWindow
const w = ref(550)
const h = ref(380)
const inputValue = ref('')
const terminalBody = ref(null)
const terminalInput = ref(null)

const outputLines = ref([
    { text: 'InspiredMonster OS [Version 1.0.0]', type: 'system' },
    { text: '(C) 2024 InspiredMonster. All rights reserved.', type: 'system' },
    { text: '', type: 'system' },
    { text: 'Type "help" for available commands.', type: 'system' },
])

const commands = {
    help: () => [
        'Available commands:',
        '  help          Show this help message',
        '  about         Learn about me',
        '  projects      View my projects',
        '  games         Play some games',
        '  experiments   View experiments',
        '  resume        Open my resume',
        '  contact       Get in touch',
        '  clear         Clear the terminal',
        '  date          Show current date',
        '  whoami        Who am I?',
        '  ls            List desktop items',
        '  exit          Close terminal',
    ],
    about: () => {
        windowsStore.setWindowState({ windowId: 'AboutApp', windowState: 'open' })
        return ['Opening About Me...']
    },
    projects: () => {
        windowsStore.setWindowState({ windowId: 'ProjectsExplorer', windowState: 'open' })
        return ['Opening Projects Explorer...']
    },
    games: () => {
        windowsStore.setWindowState({ windowId: 'GamesExplorer', windowState: 'open' })
        return ['Opening Games Explorer...']
    },
    experiments: () => {
        windowsStore.setWindowState({ windowId: 'ExperimentsExplorer', windowState: 'open' })
        return ['Opening Experiments Explorer...']
    },
    resume: () => {
        windowsStore.setWindowState({ windowId: 'ResumeViewer', windowState: 'open' })
        return ['Opening Resume...']
    },
    contact: () => {
        windowsStore.setWindowState({ windowId: 'ContactApp', windowState: 'open' })
        return ['Opening Contact...']
    },
    clear: () => {
        outputLines.value = []
        return []
    },
    date: () => [new Date().toString()],
    whoami: () => ['C:\\Users\\Visitor'],
    ls: () => ['About Me    Projects    Games    Experiments    Resume    Contact    Terminal'],
    exit: () => {
        windowsStore.setWindowState({ windowId: 'TerminalApp', windowState: 'close' })
        return ['Goodbye!']
    },
    'sudo rm -rf /': () => ['Nice try. Permission denied. This is a portfolio, not a server.'],
    matrix: () => ['Wake up, Neo... The Matrix has you...'],
    monster: () => [
        '     ___     ',
        '    /   \\    ',
        '   | o o |   ',
        '   |  ^  |   ',
        '   | \\_/ |   ',
        '    \\___/    ',
        '  /|     |\\  ',
        ' / |     | \\ ',
        '   InspiredMonster',
    ],
    rickroll: () => ['Never gonna give you up, never gonna let you down...'],
}

const handleCommand = () => {
    const cmd = inputValue.value.trim().toLowerCase()
    outputLines.value.push({ text: `C:\\> ${inputValue.value}`, type: 'input' })

    if (cmd === '') {
        // empty
    } else if (commands[cmd]) {
        const result = commands[cmd]()
        result.forEach(line => {
            outputLines.value.push({ text: line, type: 'output' })
        })
    } else {
        outputLines.value.push({
            text: `'${cmd}' is not recognized as an internal or external command.`,
            type: 'error'
        })
    }

    inputValue.value = ''
    nextTick(() => {
        if (terminalBody.value) {
            terminalBody.value.scrollTop = terminalBody.value.scrollHeight
        }
    })
}

const focusInput = () => {
    if (terminalInput.value) {
        terminalInput.value.focus()
    }
}

const style = computed(() => ({
    height: `${h.value}px`,
    width: `${w.value}px`,
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
    "--fullscreen": windowsStore.getFullscreenWindowHeight,
}))

const setActiveWindow = () => {
    windowsStore.setActiveWindow(windowRef.value.windowId)
    windowsStore.zIndexIncrement(windowRef.value.windowId)
}

const toggleWindowSize = () => {
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
                interact.modifiers.restrictSize({ min: { width: 400, height: 250 } }),
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
            C:\WINDOWS\system32\cmd.exe
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
    <div ref="terminalBody" class="terminal-body" @click="focusInput">
        <div v-for="(line, i) in outputLines" :key="i" class="terminal-line" :class="line.type">{{ line.text }}</div>
        <div class="terminal-input-line">
            <span class="prompt">C:\&gt;&nbsp;</span>
            <input
                ref="terminalInput"
                v-model="inputValue"
                @keydown.enter="handleCommand"
                class="terminal-input"
                spellcheck="false"
                autocomplete="off"
            />
        </div>
    </div>
</div>
</template>

<style scoped>
.terminal-body {
  background: #000000;
  color: #c0c0c0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  padding: 8px;
  flex: 1;
  overflow-y: auto;
  cursor: text;
}

.terminal-line {
  white-space: pre-wrap;
  line-height: 1.4;
}

.terminal-line.error { color: #ff5555; }
.terminal-line.input { color: #ffffff; }
.terminal-line.system { color: #aaaaaa; }

.terminal-input-line {
  display: flex;
  align-items: center;
}

.prompt {
  color: #c0c0c0;
  white-space: pre;
}

.terminal-input {
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  outline: none;
  flex: 1;
  caret-color: #c0c0c0;
  padding: 0;
}

/* Window chrome */
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
  font-size: 14px;
  margin: 0 0 0 3px;
  font-family: 'MS Sans Serif', sans-serif;
}
</style>
