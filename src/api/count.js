// 导入 axios 实例
import request from '@/utils/request.js'

// 拍照开启任务
export const PhotoGetImgService = (batch_id, serial_no, hole_no) => request.post('/count/image/photo', {batch_id, serial_no, hole_no})

// 轮询获取任务状态
export const getTaskStateService = (task_id) => request.get(`/count/image/task-state/${task_id}`)
