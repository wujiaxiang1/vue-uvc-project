// 导入 axios 实例
import request from '@/utils/request.js'

// 获取UVC实验数据
export const getUVCRecordService = () => request.get('/uvc/record')

// 获取现有批次序列信息
export const getBatchSerialService = (currentPage, pageSize) => request.get('/uvc/record/batch-serial-all', {params: {currentPage, pageSize}})

// 获取去重批次列表
export const getBatchListService = () => request.get('/uvc/record/batch-list')

// 获取序列列表
export const getSerialListService = (batch_id) => request.get('/uvc/record/serial-list', {params: {batch_id}})

// 根据指定获取指定批次序列信息
export const getInfoFromBatchSerialService = (batch_id, serial_no, currentPage, pageSize) => request.get('/uvc/record/from-batch-serial', {params: {batch_id, serial_no, currentPage, pageSize}})
