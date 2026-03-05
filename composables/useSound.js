const audioCache = {}
let muted = false
let initialized = false

const soundMap = {
  startup: '/sounds/startup.wav',
  click: '/sounds/single_mouse_click.wav',
  dblclick: '/sounds/double_mouse_click.wav',
  open: '/sounds/single_mouse_click.wav',
  close: '/sounds/single_mouse_click.wav',
  minimize: '/sounds/single_mouse_click.wav',
  maximize: '/sounds/single_mouse_click.wav',
  error: '/sounds/single_mouse_click.wav',
  menu: '/sounds/single_mouse_click.wav',
}

export function useSound() {
  if (!initialized && typeof window !== 'undefined') {
    muted = localStorage.getItem('win95-muted') === 'true'
    initialized = true
  }

  function playSound(name) {
    if (muted) return
    const src = soundMap[name] || '/sounds/single_mouse_click.wav'
    if (!audioCache[src]) {
      audioCache[src] = new Audio(src)
    }
    const audio = audioCache[src]
    audio.currentTime = 0
    audio.play().catch(() => { })
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
