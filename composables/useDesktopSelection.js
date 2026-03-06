import { ref, onUnmounted } from 'vue'

export function useDesktopSelection(onSelectionChange) {
  const isSelecting = ref(false)
  const selectionBox = ref({ x: 0, y: 0, width: 0, height: 0 })

  let startX = 0
  let startY = 0
  let screenEl = null

  const isDesktopTarget = (target) => {
    return target.closest('.screen') &&
      !target.closest('.icon') &&
      !target.closest('.window-style') &&
      !target.closest('.navbar-container') &&
      !target.closest('.menu') &&
      !target.closest('.start-menu') &&
      !target.closest('.context-menu')
  }

  const onMouseDown = (event) => {
    if (event.button !== 0) return
    if (!isDesktopTarget(event.target)) return

    screenEl = event.currentTarget
    const rect = screenEl.getBoundingClientRect()
    startX = event.clientX - rect.left
    startY = event.clientY - rect.top

    isSelecting.value = true
    selectionBox.value = { x: startX, y: startY, width: 0, height: 0 }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (event) => {
    if (!isSelecting.value || !screenEl) return

    const rect = screenEl.getBoundingClientRect()
    const currentX = event.clientX - rect.left
    const currentY = event.clientY - rect.top

    const x = Math.min(startX, currentX)
    const y = Math.min(startY, currentY)
    const width = Math.abs(currentX - startX)
    const height = Math.abs(currentY - startY)

    selectionBox.value = { x, y, width, height }

    // Find icons intersecting the lasso
    const icons = screenEl.querySelectorAll('.icon[data-window-id]')
    const selectedIds = []

    icons.forEach((icon) => {
      const iconRect = icon.getBoundingClientRect()
      const iconX = iconRect.left - rect.left
      const iconY = iconRect.top - rect.top
      const iconW = iconRect.width
      const iconH = iconRect.height

      // AABB intersection
      if (
        iconX < x + width &&
        iconX + iconW > x &&
        iconY < y + height &&
        iconY + iconH > y
      ) {
        selectedIds.push(icon.getAttribute('data-window-id'))
      }
    })

    if (onSelectionChange) {
      onSelectionChange(selectedIds)
    }
  }

  const onMouseUp = () => {
    isSelecting.value = false
    selectionBox.value = { x: 0, y: 0, width: 0, height: 0 }
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    screenEl = null
  }

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  })

  return { isSelecting, selectionBox, onMouseDown }
}
