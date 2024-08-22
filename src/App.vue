<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import walkthrough from "./plugins/walkthrough.ts";
import WTrigger from "./components/WTrigger.vue";
import {s} from "vite/dist/node/types.d-aGj9QkWt";

const steps = [
  { element: '#step-1', content: '<h2>Welcome</h2><p>This is the first step.</p>' },
  { element: '.step-2', content: '<h2>Step 2</h2><p>This is the second step.</p>' },
  { element: '[data-step="3"]', content: '<h2>Final Step</h2><p>This is the final step of the walkthrough.</p>' },
  { element: '#step-4', content: '<h2>Final Step</h2><p>This is the final step of the walkthrough.</p>' }
];

const startWalkthrough = () => {
  walkthrough.init(steps);
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
  <WTrigger text="Start Walkthrough" position="top-left" @start="startWalkthrough" />
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
