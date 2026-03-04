<template>
  <div style="display: flex; height: 100%; flex-direction: column">
    <nav class="download-bar">
      <a href="/resume.pdf" class="download" download target="_blank">
        <span style="display: flex" class="border">
          <p style="margin-top: 2px">Download</p>
        </span>
      </a>
      <a href="/resume.pdf" class="download" target="_blank">
        <span style="display: flex" class="border">
          <p style="margin-top: 2px">Open In New Tab</p>
        </span>
      </a>
    </nav>
    <div class="frame" style="z-index: 99">
      <iframe class="frame" src="/resume.pdf"></iframe>
    </div>
  </div>
</template>

<style scoped>
.download {
  vertical-align: middle;
  box-shadow: 1.5px 1.5px black;
  border-top: solid rgb(250, 250, 250) 1.5px;
  border-left: solid rgb(250, 250, 250) 1.5px;
  border-bottom: solid rgb(90, 90, 90) 1.5px;
  border-right: solid rgb(90, 90, 90) 1.5px;
  background: rgb(192, 192, 192);
  padding: 2px;
  margin-right: 5px;
  text-decoration: none;
  color: black;
}

.download:active {
  box-shadow: none;
  background: repeating-conic-gradient(rgb(189, 190, 189) 0% 25%,
    rgb(255, 255, 255) 0% 50%) 50% / 2px 2px;
  border-top: solid rgb(0, 0, 0) 1.5px;
  border-left: solid rgb(0, 0, 0) 1.5px;
  border-bottom: solid rgb(250, 250, 250) 1.5px;
  border-right: solid rgb(250, 250, 250) 1.5px;
}

.download-bar {
  border: 1px white solid;
  outline: 1px rgb(123, 125, 123) solid;
  font-size: 12px;
  padding: 4px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.border {
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  font-family: "MS Sans Serif", sans-serif;
}

.border:active {
  border: black dotted 1px;
}

.download:hover {
  cursor: pointer;
}

.frame {
  width: 100%;
  height: 97.5%;
}
</style>
