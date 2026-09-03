<script setup>
defineOptions({
  name: 'CodeContainer'
})

defineProps({
  title: {
    type: String
  }
})
</script>

<template>
  <el-card>
    <template #header>
      <span class="title">{{ title }}</span>
      <div>
        <slot name="more"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped lang="less">
// 根元素无需写:deep() 仅向下穿透
.el-card {
  height: 100%;
  border-radius: 8px;
  box-shadow: none;

  :deep(.el-card__header) {
  border-bottom: 0;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 700;
  }
}
}
</style>
