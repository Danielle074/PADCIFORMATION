import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'boxicons/css/boxicons.min.css'
import App from './App.vue'
import './style.css'
import router from './router'
import { queryClient } from './api/queryClient'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
