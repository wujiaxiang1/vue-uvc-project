import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/stores'
import router from '@/router'

// 安装：pnpm add normalize.css
// 全局引入 注意顺序
import 'normalize.css'
import '@/assets/common.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
