import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', () => {
  // 计数数据总集
  const countDataList = ref([
    {
      info: "adqqwe"
    }
  ])

  // 图片展览总集
  const countShowDataList = ref([
    {
      date: '2026.08.02',
      batch_num: '1234567',
      serial_num: '001',
      hole_site: '95',
      img_path: 'https://preview.qiantucdn.com/freepik/512/3602/3602012.png!qt1024_1',
      count_rst: 0
    }
  ])

  return {
    countDataList,
    countShowDataList
  }
})
