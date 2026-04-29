import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import JsonFormatter from './views/JsonFormatter.vue'
import PasswordGenerator from './views/PasswordGenerator.vue'
import CsvPreview from './views/CsvPreview.vue'
import Base64Tool from './views/Base64Tool.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/json', component: JsonFormatter },
    { path: '/password', component: PasswordGenerator },
    { path: '/csv', component: CsvPreview },
    { path: '/base64', component: Base64Tool },
  ],
})

createApp(App).use(router).mount('#app')
