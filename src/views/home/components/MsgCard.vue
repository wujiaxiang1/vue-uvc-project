<script setup>
defineOptions({
  name: 'MsgCard'
})
import { ArrowRightBold } from '@element-plus/icons-vue'

defineProps({
  title: {
    type: String
  },
  date: {
    type: String
  },
  msg: {
    type: String
  }
})
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <p class="title">{{ title }}</p>
        <i>{{ date }}</i>
      </div>
    </template>
    <div class="card-body">
      <p>{{ msg }}</p>
      <div>
        <el-button circle :icon="ArrowRightBold" size="small"></el-button>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="less">
.el-card {
  height: 100%;
  font-size: 14px;
  border: none;
  box-shadow: none;
  
  :deep(.el-card__header) {
    padding: 10px;

    .card-header {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title {
        font-weight: 700;
        font-size: 15px;
      }
    }
  }
  
  :deep(.el-card__body) {
    padding: 0 0 10px 10px;

    .card-body {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>