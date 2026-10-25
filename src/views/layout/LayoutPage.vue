<script setup>
defineOptions({
  name: 'LayoutPage'
})
import logo from '@/assets/imgs/logo.png'
import { HomeFilled, Folder, Clock, ArrowRight } from '@element-plus/icons-vue'
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
  <el-container class="layout-box">
    <el-aside class="menu-aside">
      <div class="logo-box">
        <router-link to="/home">
          <img class="logo-icon" :src="logo" alt="循微科技" />
        </router-link>
      </div>
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
          <el-tooltip effect="dark" placement="left" :disabled="!isCollapse">
            <template #content> 统计管理 </template>
            <el-menu-item index="/center">
              <el-icon><HomeFilled /></el-icon>
              <span>统计管理</span>
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
          <el-sub-menu index="assistant">
            <template #title>
              <el-icon><HomeFilled /></el-icon>
              <span>AI助手</span>
            </template>
            <el-menu-item index="/assistant">
              <el-icon><HomeFilled /></el-icon>
              <span>问答</span>
            </el-menu-item>
            <el-menu-item index="/assistant/knowledge">
              <el-icon><Folder /></el-icon>
              <span>知识库</span>
            </el-menu-item>
          </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container class="main-box">
      <el-header class="layout-header">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/count' }">菌落计数</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="header-right">
          <el-icon><Clock /></el-icon>
          <i class="time">{{ curr_time }}</i>
        </div>
      </el-header>
      <el-main class="main-body">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
.layout-box {
  gap: 10px;
  height: 100%;

  .menu-aside {
    background-color: #fff;
    width: 200px;

    .logo-box {
      width: 70%;
      margin: 20px auto 30px;
      .logo-icon {
        display: block;
        width: 100%;
      }
    }
    .main-menu {
      border: none;
      // 激活的菜单项 展开and收缩 注意权重问题
      :deep(.el-menu-item.is-active) {
        border-left: 5px solid #00c3fd;
        background-color: #ecf5ff;
      }
    }
  }

  .main-box {
    .layout-header{
      height: 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-right {
        display: flex;
        .time {
          margin-left: 5px;
        }
      }
    }
    .main-body {
      padding: 10px 10px 10px 0;
    }
  }
}

@media screen and(max-width: 1024px) {
  .layout-box {
    .menu-aside {
      width: auto;
    }
    .logo-box {
      display: none;
    }
  }
}
</style>
