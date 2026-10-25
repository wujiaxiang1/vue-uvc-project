import { createPinia } from 'pinia'

const pinia = createPinia()

// 导出 pinia 实例
export default pinia

// 导出仓库数据
export * from './count.js'
export * from './uvc.js'
