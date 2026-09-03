<script setup>
defineOptions({
  name: 'DashboardCard'
})

defineProps({
  desc: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number]
  },
  color: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="desc-box">
    <slot name="icon"></slot>
    <div class="info-box">
      <p class="title">{{ desc }}</p>
      <div class="value-box">
        <p class="value" :style="color && { color }">{{ value }}</p>
        <i class="unit">
          <slot name="unit"></slot>
        </i>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.desc-box {
  display: flex;
  font-size: 12px;
  height: 100%;
  background-color: #f8f8f8;
  align-items: center;
  padding: 0 20px;
  white-space: nowrap;  /* 强制文本在一行上显示 */

  .info-box {
    padding: 0 30px 0 20px;
    display: flex;
    flex-direction: column;

    .title {
      margin-bottom: 10px;
    }
    
    .value-box {
      display: flex;
      align-items: flex-end;
      
      .value {
        font-size: 20px;
        font-weight: 700;
      }

      .unit {
        margin-left: 10px;
      }
    }
  }
}
</style>
