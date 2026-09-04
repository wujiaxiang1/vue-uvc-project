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
    <div class="content-box">
      <TitleCard :cardTitle="leCardTitle">
        <slot></slot>
      </TitleCard>
    </div>
    <div class="store-box">
      <TitleCard class="store-card" :cardTitle="riCardTitle">
        <el-scrollbar class="store-scrollbar">
          <div class="img-show-box" v-for="(item, idx) in dataList" :key="idx">
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
        </el-scrollbar>
        <div class="more-btn-box">
          <el-button type="primary" round>
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

  .content-box {
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

    :deep(.el-scrollbar.store-scrollbar) {
      flex: 5;

      .el-scrollbar__view {
        .img-show-box {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          gap: 10px;
          align-items: center;
          background-color: rgba(238, 238, 238, .9);
          margin-bottom: 15px;

          &:last-child {
            margin-bottom: 0px;
          }

          .img {
            display: block;
            width: 100%;
            border-radius: 50%;
          }
        }
      }
      .el-scrollbar__bar.is-vertical {
        display: none;
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
    .content-box {
      flex: 3;
    }
  }
}
</style>
