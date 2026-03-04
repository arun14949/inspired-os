<script setup>
import { ref, watch, computed } from 'vue'
import { marked } from 'marked'
import { useWindowsStore } from '@/stores/windows'

const windowsStore = useWindowsStore()
const markdownContent = ref('')

const caseStudyWindow = computed(() =>
  windowsStore.windows.find(w => w.windowId === 'CaseStudyReader')
)

const htmlContent = computed(() => marked(markdownContent.value))

const markdownModules = import.meta.glob('~/content/case-studies/*.md', { query: '?raw', import: 'default', eager: true })

watch(
  () => caseStudyWindow.value?.caseStudySlug,
  (slug) => {
    if (slug) {
      const key = Object.keys(markdownModules).find(k => k.includes(`/${slug}.md`))
      if (key) {
        markdownContent.value = markdownModules[key]
      } else {
        markdownContent.value = '# Not Found\n\nThis case study could not be loaded.'
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="case-study-container" v-html="htmlContent"></div>
</template>

<style scoped>
.case-study-container {
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 13px;
  line-height: 1.6;
}

.case-study-container :deep(h1) {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #808080;
  padding-bottom: 4px;
  margin-bottom: 12px;
}

.case-study-container :deep(h2) {
  font-size: 15px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
}

.case-study-container :deep(p) {
  margin-bottom: 8px;
}

.case-study-container :deep(ul),
.case-study-container :deep(ol) {
  padding-left: 20px;
  margin-bottom: 8px;
}

.case-study-container :deep(li) {
  margin-bottom: 4px;
}

.case-study-container :deep(strong) {
  font-weight: bold;
}

.case-study-container :deep(a) {
  color: #000080;
  text-decoration: underline;
}

.case-study-container :deep(img) {
  max-width: 100%;
  border: 1px solid #808080;
}
</style>
