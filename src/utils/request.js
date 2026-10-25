// 请求全局配置
import axios from 'axios'

// 基础路径
const baseURL = "http://127.0.0.1:8000"

// 创建 axios 实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求&响应拦截器


// 导出 axios 实例
export default instance
