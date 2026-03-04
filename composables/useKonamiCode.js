import { onMounted, onUnmounted } from 'vue'

export function useKonamiCode(callback) {
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ]
  let position = 0

  const handler = (e) => {
    if (e.key === konamiSequence[position]) {
      position++
      if (position === konamiSequence.length) {
        callback()
        position = 0
      }
    } else {
      position = 0
    }
  }

  onMounted(() => document.addEventListener('keydown', handler))
  onUnmounted(() => document.removeEventListener('keydown', handler))
}
