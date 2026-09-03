<script setup>
defineOptions({
  name: 'MainFuncContainer'
})
import TitleCard from '@/components/TitleCard.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
defineProps({
  leCardTitle: {
    type: String
  },
  riCardTitle: {
    type: String
  },
  dataList: {
    type: Object,
    required: true
  }
})
</script>

<template>
<div class="main-box">
  <div class="count-box">
    <TitleCard :cardTitle="leCardTitle">
      <slot></slot>
    </TitleCard>
  </div>
  <div class="store-box">
    <TitleCard class="store-card" :cardTitle="riCardTitle">
      <el-carousel
        class="store-carousel"
        direction="vertical"
        type="card"
        :autoplay="false"
      >
        <el-carousel-item v-for="(item, idx) in dataList" :key="idx">
          <div class="img-show-box">
            <img
              class="img"
              :src="item.img_path"
              :alt="`${item.serial_num}+${item.hole_site}`"
            />
            <el-popover placement="left" effect="dark" trigger="click">
              <template #reference>
                <el-button
                  type="primary"
                  class="show-img-info"
                  round
                  text
                  bg
                  size="small"
                >
                  查看详细
                </el-button>
              </template>
              <div class="popover-content">
                {{ item }}
                <el-button>查看图片</el-button>
              </div>
            </el-popover>
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="more-btn-box">
        <el-button
          type="primary"
          round
        >
          查看更多
          <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
        </el-button>
      </div>
    </TitleCard>
  </div>
</div>
</template>

<style scoped lang="less">
.main-box {
  height: 100%;
  display: flex;
  gap: 5px;

  .count-box {
    flex: 4;
    border-radius: 20px;
    overflow: hidden;
    transition: flex-grow 1s ease-out;
  }

  .store-box {
    flex: 1;

    :deep(.el-card.store-card .el-card__body) {
      display: flex;
      flex-direction: column;
    }

    :deep(.el-card.store-card .el-carousel.store-carousel) {
      flex: 5;
    }

    :deep(.el-card.store-card .el-carousel.store-carousel .el-carousel__container) {
      height: 100%;
    }

    :deep(.el-card.store-card .el-carousel.store-carousel .el-carousel__item) {
      background-color: rgba(238, 238, 238, .9);
      overflow: visible;
      border-radius: 20px;
      display: flex;
      align-items: center;
    
      .img-show-box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
        
        .img {
          display: block;
          width: 100%;
        }
      
        .show-img-info {
          width: 50%;
        }
      }
    }

    :deep(.el-card.store-card) {
      .more-btn-box {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

@media screen and(max-width: 1024px) {
  .main-box {
    .count-box {
      flex: 3;
    }
  }
}
</style>
