<template>
  <div class="contact-container">
    <h2 class="font-bold text-lg pb-3">Get In Touch</h2>
    <p class="text-sm pb-5">Feel free to reach out through any of these channels.</p>

    <div class="contact-links">
      <a v-for="link in contactLinks" :key="link.label"
         :href="link.url" target="_blank"
         class="contact-link-item">
        <span class="link-icon">></span>
        <span>{{ link.label }}</span>
      </a>
    </div>

    <div class="divider"></div>

    <h3 class="font-bold text-sm pt-4 pb-2">Send a Message</h3>
    <form class="contact-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="form.name" class="win95-input" required />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="form.email" class="win95-input" required />
      </div>
      <div class="form-group">
        <label>Message:</label>
        <textarea v-model="form.message" rows="4" class="win95-input" required></textarea>
      </div>
      <button type="submit" class="win95-btn">Send</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contactLinks = [
  { label: 'GitHub', url: 'https://github.com/arun14949' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/arunsajeev' },
  { label: 'Email', url: 'mailto:arun14949@gmail.com' },
]

const form = ref({ name: '', email: '', message: '' })

const handleSubmit = () => {
  const mailto = `mailto:arun14949@gmail.com?subject=Message from ${form.value.name}&body=${encodeURIComponent(form.value.message)}%0A%0AFrom: ${form.value.email}`
  window.open(mailto)
}
</script>

<style scoped>
.contact-container {
  padding: 10px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-link-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  font-size: 13px;
  text-decoration: none;
  color: black;
}

.contact-link-item:hover {
  background: rgb(0, 0, 118);
  color: white;
}

.link-icon {
  font-weight: bold;
  font-size: 12px;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgb(123, 125, 123);
  border-bottom: white solid 1px;
  margin-top: 10px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-group label {
  font-size: 12px;
}

.win95-input {
  background: white;
  border-top: solid rgb(0, 0, 0) 1px;
  border-left: solid rgb(0, 0, 0) 1px;
  border-bottom: solid rgb(250, 250, 250) 1px;
  border-right: solid rgb(250, 250, 250) 1px;
  font-size: 12px;
  padding: 3px 4px;
  font-family: 'MS Sans Serif', sans-serif;
  outline: none;
  resize: vertical;
}

.win95-btn {
  align-self: flex-start;
  padding: 3px 20px;
  background: rgb(195, 195, 195);
  border-top: solid rgb(250, 250, 250) 1px;
  border-left: solid rgb(250, 250, 250) 1px;
  border-right: solid rgb(90, 90, 90) 1px;
  border-bottom: solid rgb(90, 90, 90) 1px;
  box-shadow: 1px 1px black;
  font-size: 12px;
  cursor: pointer;
  font-family: 'MS Sans Serif', sans-serif;
  margin-top: 4px;
}

.win95-btn:active {
  border-top: solid rgb(0, 0, 0) 1px;
  border-left: solid rgb(0, 0, 0) 1px;
  border-bottom: solid rgb(250, 250, 250) 1px;
  border-right: solid rgb(250, 250, 250) 1px;
  box-shadow: none;
}
</style>
