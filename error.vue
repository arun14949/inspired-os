<script setup>
const props = defineProps({
  error: Object
})

const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-page">
    <div class="error-window">
      <div class="error-title-bar">
        <span>Error</span>
      </div>
      <div class="error-content">
        <p class="error-icon">⚠</p>
        <p class="error-message">{{ error?.statusCode }} - {{ error?.message }}</p>
        <pre v-if="error?.stack" class="error-stack">{{ error?.stack }}</pre>
        <button class="error-btn" @click="handleClearError">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  background: #018281;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'MS Sans Serif', Tahoma, sans-serif;
}

.error-window {
  background: #c3c3c3;
  border-top: solid rgb(250, 250, 250) 2px;
  border-left: solid rgb(250, 250, 250) 2px;
  border-right: solid rgb(90, 90, 90) 1.5px;
  border-bottom: solid rgb(90, 90, 90) 1.5px;
  box-shadow: 1.5px 1.5px black;
  min-width: 300px;
  max-width: 500px;
}

.error-title-bar {
  background: rgb(0, 0, 124);
  color: white;
  padding: 3px 5px;
  font-size: 13px;
  font-weight: bold;
}

.error-content {
  padding: 20px;
  text-align: center;
}

.error-icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.error-message {
  font-size: 13px;
  margin-bottom: 15px;
}

.error-stack {
  font-size: 10px;
  text-align: left;
  background: white;
  padding: 8px;
  border: 1px inset;
  max-height: 150px;
  overflow: auto;
  margin-bottom: 15px;
  white-space: pre-wrap;
  word-break: break-all;
}

.error-btn {
  padding: 3px 30px;
  background: rgb(195, 195, 195);
  border-top: solid rgb(250, 250, 250) 1px;
  border-left: solid rgb(250, 250, 250) 1px;
  border-right: solid rgb(90, 90, 90) 1px;
  border-bottom: solid rgb(90, 90, 90) 1px;
  box-shadow: 1px 1px black;
  font-size: 12px;
  cursor: pointer;
  font-family: 'MS Sans Serif', sans-serif;
}

.error-btn:active {
  border-top: solid rgb(0, 0, 0) 1px;
  border-left: solid rgb(0, 0, 0) 1px;
  border-bottom: solid rgb(250, 250, 250) 1px;
  border-right: solid rgb(250, 250, 250) 1px;
  box-shadow: none;
}
</style>
