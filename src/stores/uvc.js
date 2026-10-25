import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUVCRecordService } from '@/api/uvc'

export const useUVCStore = defineStore('uvc', () => {
  
  // uvc 实验数据
  const recordDataList = ref([])
  // loading加载状态
  const loading = ref(true)
  // 更新实验数据
  const getUVCRecord = async () => {
    loading.value = true // 开始加载
    try {
      const UVCRecordRst = await getUVCRecordService()
      recordDataList.value = UVCRecordRst.data.recordData
    } finally {
      loading.value = false // 结束加载
    }
  }

  return {
    recordDataList,
    getUVCRecord,
    loading
  }
})
