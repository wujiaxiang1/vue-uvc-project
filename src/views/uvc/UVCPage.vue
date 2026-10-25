<script setup>
defineOptions({
  name: 'UVCPage'
})
import MainFuncContainer from '@/components/MainFuncContainer.vue'
import { ref } from 'vue'

const UVCStoreDataList = ref([])
</script>

<template>
  <MainFuncContainer
    leCardTitle="紫外灭菌"
    riCardTitle="最近批次"
    :dataList="UVCStoreDataList"
  >
    <div class="uvc-main-body">
      <div>
        参数选择
      </div>
      <div>
        <div>
          孔位示意图
        </div>
        <div>
          批次信息
        </div>
      </div>
    </div>
  </MainFuncContainer>
</template>

<style scoped></style>
