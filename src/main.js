import './assets/main.css'


import { createApp } from 'vue'
import ElementPlus from 'element-plus' //全局引入
import Router from "./router.js";
import 'element-plus/dist/index.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus);
app.use(Router);
app.mount('#app');

//createApp(App).mount('#app')
