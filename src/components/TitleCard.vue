<script setup>
defineOptions({
  name: 'TitleCard'
})

defineProps({
  cardTitle: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-card class="title-card">
    <template #header>
      <span >{{ cardTitle }}</span>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped lang="less">
.el-card.title-card {
  height: 100%;
  box-shadow: none;

  :deep(.el-card__header) {
    border-bottom: none;
    font-weight: 700;
  }
  :deep(.el-card__body) {
    padding-top: 0;

  }
}
</style>
