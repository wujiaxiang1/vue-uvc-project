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
    UVCPage
  </div>
  </MainFuncContainer>
</template>

<style scoped></style>
