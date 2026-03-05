const audioCache = {}
let muted = false
let initialized = false

export function useSound() {
  if (!initialized && typeof window !== 'undefined') {
    muted = localStorage.getItem('win95-muted') === 'true'
    initialized = true
  }

  function playSound(name) {
    if (muted) return
    if (!audioCache[name]) {
      audioCache[name] = new Audio(`/sounds/${name}.wav`)
    }
    const audio = audioCache[name]
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
