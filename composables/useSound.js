const audioCache = {}
let muted = false
let initialized = false

const soundMap = {
  startup: '/sounds/startup.wav',
  click: '/sounds/click.mp3',
  open: '/sounds/click.mp3',
  close: '/sounds/click.mp3',
  minimize: '/sounds/click.mp3',
  maximize: '/sounds/click.mp3',
  error: '/sounds/click.mp3',
  menu: '/sounds/click.mp3',
}

export function useSound() {
  if (!initialized && typeof window !== 'undefined') {
    muted = localStorage.getItem('win95-muted') === 'true'
    initialized = true
  }

  function playSound(name) {
    if (muted) return
    const src = soundMap[name] || '/sounds/click.mp3'
    if (!audioCache[src]) {
      audioCache[src] = new Audio(src)
    }
    const audio = audioCache[src]
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  function toggleMute() {
    muted = !muted
    localStorage.setItem('win95-muted', String(muted))
    return muted
  }

  function isMuted() {
    return muted
  }

  return { playSound, toggleMute, isMuted }
}
