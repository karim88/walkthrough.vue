<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import walkthrough, {Options, Step} from "./plugins/walkthrough.ts";
import WTrigger from "./components/WTrigger.vue";
import {reactive} from "vue";

const steps = reactive<Step[]>([
  {
    element: '.walk-through-start',
    content: `<h2>Welcome</h2><img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWw4M2k2bGM3NDg3dWo3MHV3cTV4andoaDkxcDV1dGNoYmVheDdoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYC0LajbaPoEADu/giphy.webp" alt="welcome image"><p>as you already know this is the button to start the tutorial.</p>`,
    nextText: 'Console log',
    nextCallback() {
      console.log('ok')
    },
  },
  { element: '#step-1', content: `<h2>Vitejs</h2><p>Discover Vite.js here</p>` },
  { element: '.step-2', content: '<h2>Vuejs</h2><p>You can find vue documentation by clicking in the link</p>' },
  {
    element: '#increment',
    content: '<h2>Triggering Event</h2><p>In this we clicked in the button to increment the counter </p>',
    nextCallback() {
      document.getElementById('increment')!.click()
    },
    prevCallback() {
      document.getElementById('increment')!.click()
    }},
  { element: '[data-step="3"]', content: '<h2>create-vue</h2><p>Check out create-vue, the official Vue + Vite starter</p>' },
  {
    element: '#step-4',
    content: '<h2>IDE Support for Vue</h2><p>Learn more about IDE Support for Vue in the Vue Docs Scaling up Guide</p>',
    nextCallback () {
      console.log('Finished')
    } }
]);
const options = reactive<Options>({
  prevText: 'précédente',
  nextText: 'Suivante',
  finishText: 'Fini',
})

const startWalkthrough = () => {
  walkthrough.init(options, steps);
}
</script>

<template>
  <div>
    <span id="step-1">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
    </span>
    <span class="step-2">
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </span>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <button @click="startWalkthrough">Start Walkthrough</button>
  <WTrigger
      position="top-left"
      @start="startWalkthrough"
  >
    Commencer!
  </WTrigger>
</template>

<style lang="scss">
@import "src/styles/walkthrough.scss";
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
