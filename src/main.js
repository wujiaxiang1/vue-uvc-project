import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores'
import router from '@/router'

import '@/assets/common.css'
// 安装：pnpm add normalize.css
import 'normalize.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
