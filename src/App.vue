<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import walkthrough, { Options, Step } from "./plugins/walkthrough.ts";
import WTrigger from "./components/WTrigger.vue";
import { reactive } from "vue";

const steps = reactive<Step[]>([
  {
    element: '.walk-through-start',
    content: `
      <h2>Welcome to the App Tour</h2>
      <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWw4M2k2bGM3NDg3dWo3MHV3cTV4andoaDkxcDV1dGNoYmVheDdoMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYC0LajbaPoEADu/giphy.webp" alt="welcome image" />
      <p>This button triggers the application walkthrough. Click 'Start Tour' to begin exploring the main features of the application.</p>
    `,
    nextText: 'Next',
    nextCallback() {
      console.log('Walkthrough started');
    },
  },
  {
    element: '#step-1',
    content: `
      <h2>Vite.js Integration</h2>
      <p>This section highlights Vite.js, a fast and modern build tool for web projects. It powers the development experience, ensuring quick start-up times and efficient bundling.</p>
    `,
  },
  {
    element: '.step-2',
    content: `
      <h2>Vue.js Documentation</h2>
      <p>Click on this link to access Vue.js documentation. It provides comprehensive guides and references to help you build your Vue applications effectively.</p>
    `,
  },
  {
    element: '#increment',
    content: `
      <h2>Interactive Counter</h2>
      <p>Clicking this button increases the counter. This step demonstrates handling user interactions within your app.</p>
    `,
    nextCallback() {
      document.getElementById('increment')!.click();
      console.log('Counter incremented');
    },
    prevCallback() {
      document.getElementById('increment')!.click();
      console.log('Counter decremented');
    },
  },
  {
    element: '[data-step="3"]',
    content: `
      <h2>Project Setup with create-vue</h2>
      <p>Explore the create-vue project setup, which provides a streamlined starting point for Vue + Vite projects. It's the recommended way to get started with Vue.js development.</p>
    `,
  },
  {
    element: '#step-4',
    content: `
      <h2>IDE Support</h2>
      <p>Discover the robust IDE support available for Vue.js, helping you to write, debug, and maintain your code efficiently within your preferred development environment.</p>
    `,
  },
  {
    element: 'body',
    content: `
      <h2>Thank you</h2>
      <p>Enjoy it</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/AoeCfTfZE8w?si=bSDiB2kdgCsD0BMi&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `,
    nextCallback() {
      console.log('Walkthrough completed');
    },
  }
]);

const options = reactive<Options>({
  prevText: 'Previous',
  nextText: 'Next',
  finishText: 'Finish',
});

const startWalkthrough = () => {
  walkthrough.init(options, steps);
};
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
  <button id="increment" @click="startWalkthrough">Start Walkthrough</button>
  <WTrigger
      position="top-left"
      @start="startWalkthrough"
  >
    Start Tour!
  </WTrigger>
</template>

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
