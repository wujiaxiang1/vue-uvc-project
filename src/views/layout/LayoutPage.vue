<script setup>
defineOptions({
  name: 'LayoutPage'
})
import logo from '@/assets/imgs/logo.png'
import { HomeFilled, Folder, Clock } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import { useRoute } from 'vue-router'
const route = useRoute()

// 时间模块
const curr_time = ref('')
const getCurrTime = () => {
  const time_obj = new Date()
  const year = time_obj.getFullYear()
  let month = time_obj.getMonth() + 1
  let date = time_obj.getDate()
  let hour = time_obj.getHours()
  let minute = time_obj.getMinutes()
  let second = time_obj.getSeconds()
  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date
  hour = hour < 10 ? '0' + hour : hour // 小于10 补零
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  curr_time.value = `${year}-${month}-${date} ${hour}:${minute}:${second}`
}
onMounted(() => {
  getCurrTime()
  setInterval(getCurrTime, 1000)
})

// 页面是否≤1024px
const isCollapse = useMediaQuery('(max-width: 1024px)')
</script>

<template>
  <el-container>
    <el-header class="layout-header">
      <div class="header-left">
        <router-link class="logo" to="/home">
          <img class="logo-icon" :src="logo" alt="循微科技" />
        </router-link>
        <i class="line">|</i>
        <p class="logo-desc">UVC疗法辅助决策仪</p>
      </div>
      <div class="header-right">
        <el-icon><Clock /></el-icon>
        <i class="time">{{ curr_time }}</i>
      </div>
    </el-header>
    <el-container class="main-box">
      <el-aside class="menu-aside">
        <!-- 菜单 启用router模式 route.path表示当前路由 -->
        <el-menu
          class="main-menu"
          router
          :default-active="route.path"
          active-text-color="#2f86cf"
          text-color="#000"
          :collapse="isCollapse"
        >
          <el-tooltip effect="dark" placement="left" :disabled="!isCollapse">
            <template #content> 首页 </template>
            <el-menu-item index="/home">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
          </el-tooltip>
          <el-sub-menu index="uvc">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>紫外灭菌</span>
            </template>
            <el-menu-item index="/uvc">
              <el-icon><HomeFilled /></el-icon>
              <span>紫外灭菌</span>
            </el-menu-item>
            <el-menu-item index="/uvc/history">
              <el-icon><Folder /></el-icon>
              <span>历史记录</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="count">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>菌落计数</span>
            </template>
            <el-menu-item index="/count">
              <el-icon><HomeFilled /></el-icon>
              <span>菌落计数</span>
            </el-menu-item>
            <el-menu-item index="/count/history">
              <el-icon><Folder /></el-icon>
              <span>历史记录</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main class="main-body">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer class="main-footer">Footer</el-footer>
  </el-container>
</template>

<style scoped lang="less">
:deep(.el-header.layout-header) {
  height: 6vh;
  padding: 0;
  margin-bottom: 1vh;
  background-color: #00c3fd;
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, (16 / 10.24vw), 16px);

  .header-left {
    display: flex;
    align-items: center;
    margin-left: 50px;

    .logo-icon {
      height: clamp(30px, (40 / 10.24vw), 40px);
    }
    .line {
      margin: 0 10px;
    }
    .logo-desc {
      font-weight: 700;
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .time {
      margin: 0 30px 0 5px;
      font-size: clamp(12px, (14 / 10.24vw), 14px);
    }
  }
}

.main-box {
  display: flex;

  :deep(.el-aside.menu-aside) {
    background-color: #fff;
    margin-right: 15px;
    flex: 1;
  }
  // 激活的菜单项 展开and收缩 注意权重问题
  :deep(.el-menu.main-menu .el-menu-item.is-active) {
    border-left: 5px solid #00c3fd;
    background-color: #ecf5ff;
  }
  :deep(.el-menu.main-menu) {
    width: 100%;
    border: none;
  }
  :deep(.el-menu.main-menu .el-menu-item),
  :deep(.el-menu.main-menu .el-sub-menu__title) {
    padding: 0 clamp(25px, (25 / 10.24vw), 50px);
  }

  :deep(.el-main.main-body) {
    height: 88vh;
    padding: 0;
    flex: 6;
    transition: flex-grow 1s ease-out;
  }
}

:deep(.el-footer.main-footer) {
  height: 4vh;
  padding: 0;
  background-color: #fff;
  margin-top: 1vh;
}

@media screen and(max-width: 1024px) {
  .main-box {
    :deep(.el-main.main-body) {
      flex: 14;
    }

    :deep(.el-menu.main-menu .el-menu-item),
    :deep(.el-menu.main-menu .el-sub-menu__title) {
      padding: 0 clamp(13px, (20 / 10.24vw), 20px);
    }
  }
}
</style>
