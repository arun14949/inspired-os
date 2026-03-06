<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  items: { type: Array, required: true },
})

const emit = defineEmits(['close'])

const menuRef = ref(null)
const adjustedX = ref(props.x)
const adjustedY = ref(props.y)

const onItemClick = (item) => {
  if (item.disabled) return
  if (item.action) item.action()
  emit('close')
}

onMounted(() => {
  const el = menuRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  if (rect.right > window.innerWidth) {
    adjustedX.value = props.x - rect.width
  }
  if (rect.bottom > window.innerHeight) {
    adjustedY.value = props.y - rect.height
  }
})
</script>

<template>
  <div
    ref="menuRef"
    class="context-menu"
    :style="{ left: adjustedX + 'px', top: adjustedY + 'px' }"
  >
    <template v-for="(item, index) in items" :key="index">
      <div
        class="context-item"
        :class="{ 'context-item-disabled': item.disabled }"
        @click="onItemClick(item)"
      >
        {{ item.label }}
      </div>
      <div v-if="item.dividerAfter" class="context-divider"></div>
    </template>
  </div>
</template>

<style scoped>
.context-menu {
  position: fixed;
  z-index: 100001;
  background: rgb(195, 195, 195);
  border-top: solid rgb(250, 250, 250) 2px;
  border-left: solid rgb(250, 250, 250) 2px;
  border-right: solid rgb(90, 90, 90) 1.5px;
  border-bottom: solid rgb(90, 90, 90) 1.5px;
  box-shadow: 1.5px 1.5px black;
  padding: 2px 0;
  min-width: 160px;
  font-size: 12px;
  font-family: "MS Sans Serif", sans-serif;
}

.context-item {
  padding: 4px 24px;
  cursor: pointer;
  white-space: nowrap;
}

.context-item:hover {
  background: rgb(0, 0, 118);
  color: white;
}

.context-item-disabled {
  color: rgb(128, 128, 128);
  text-shadow: 1px 1px 0 rgb(255, 255, 255);
}

.context-item-disabled:hover {
  background: inherit;
  color: rgb(128, 128, 128);
}

.context-divider {
  height: 1px;
  background: rgb(123, 125, 123);
  border-bottom: white solid 1px;
  margin: 2px 0;
}
</style>
