import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Walkthrough from "./plugins/walkthrough.ts";

const app = createApp(App)
app.use(Walkthrough)
app.mount('#app')
