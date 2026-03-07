import { ref, onMounted, onUnmounted } from 'vue'

export function useDeviceDetection() {
  const isMobile = ref(false)
  let mediaQuery = null

  const checkMobile = () => {
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(max-width: 768px)')
      isMobile.value = mediaQuery.matches
    }
  }

  const handleMediaChange = (e) => {
    isMobile.value = e.matches
  }

  onMounted(() => {
    checkMobile()
    if (mediaQuery) {
      mediaQuery.addEventListener('change', handleMediaChange)
    }
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  })

  return { isMobile }
}
