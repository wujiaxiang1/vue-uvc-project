<script setup>
defineOptions({
  name: 'HomePage'
})
import entity from '@/assets/imgs/entity.png'
import CardContainer from './components/CardContainer.vue'
import DashboardCard from './components/DashboardCard.vue'
import MsgCard from './components/MsgCard.vue'
import {
  Edit,
  SuccessFilled,
  RemoveFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useUVCStore } from '@/stores/uvc.js'

const uvcStore = useUVCStore()

onMounted(async () => {
  // 刚进入程序 更新数据（后续用于历史记录）
  await uvcStore.getUVCRecord()
})

// 最近批次信息
const batchList = ref([])
// 监听批次信息变化
watch(
  () => uvcStore.recordDataList,
  (newVal) => {
  const valList = newVal.map((ele) => {
    const {create_time, batch_id, serial_no, operator_name} = ele
    return {
      date: create_time.split("T")[0],
      batch_id,
      serial_no,
      operator_name,
      status: '已完成'
    }
  })
  batchList.value = valList
  console.log(batchList.value)
})


const icon = ref('free')
// 图标状态映射
const iconStatusMap = {
  success: {
    text: '运行中',
    color: '#00ce7e',
    icon: SuccessFilled,
    bgc: '#a5edcf'
  },
  free: {
    text: '空闲中',
    color: '#189cca',
    icon: RemoveFilled,
    bgc: '#a3e6fa'
  },
  error: {
    text: '故障中',
    color: '#f89c01',
    icon: WarningFilled,
    bgc: '#f7d494'
  }
}
// 获取当前图标状态  访问对象属性：obj[变量]
const getIconStatus = computed(() => iconStatusMap[icon.value])

// 查看批次信息
const showBatchInfo = (scope) => {
  console.log(scope)
  console.log(scope.row)
}

// 系统通知
const msgList = ref([])
const getMsgList = () => {
  console.log('获取系统通知 api')
  msgList.value = [
    {
      title: '系统更新通知',
      date: '2026-08-02',
      msg: 'V2.1.0版本已发布'
    },
    {
      title: '设备维护提醒',
      date: '2026-08-03',
      msg: '请定期清洁设备'
    },
    {
      title: '操作注意事项',
      date: '2026-08-04',
      msg: '请严格按照操作规范进行操作'
    }
  ]
}
getMsgList()
</script>

<template>
  <div class="home-container">
    <div class="state-box">
      <CardContainer title="设备状态">
        <div class="dashboard">
          <DashboardCard
            desc="设备状态"
            :value="getIconStatus.text"
            :color="getIconStatus.color"
          >
            <template #icon>
              <el-icon
                class="state-icon"
                :style="{ backgroundColor: getIconStatus.bgc }"
                size="50px"
                :color="getIconStatus.color"
              >
                <!-- 动态组件API
                  <component :is="'标签名'"></component> 渲染html标签
                  <component :is="Vue组件"></component> 渲染Vue组件
                -->
                <component :is="getIconStatus.icon"></component>
              </el-icon>
            </template>
          </DashboardCard>
          <div class="batch">
            <DashboardCard desc="今日批次" value="12">
              <template #unit> 批 </template>
            </DashboardCard>
            <el-tooltip effect="dark" content="设置批次" placement="top-start">
              <el-button
                class="batch-btn"
                circle
                :icon="Edit"
                size="small"
              ></el-button>
            </el-tooltip>
          </div>
          <DashboardCard desc="检测孔位" value="96">
            <template #unit> 孔 </template>
          </DashboardCard>
          <DashboardCard desc="已完成" value="8">
            <template #unit> 批 </template>
          </DashboardCard>
          <DashboardCard desc="运行中" value="2">
            <template #unit> 批 </template>
          </DashboardCard>
          <DashboardCard desc="待处理" value="2">
            <template #unit> 批 </template>
          </DashboardCard>
        </div>
      </CardContainer>
    </div>
    <div class="batch-box">
      <CardContainer title="最近批次">
        <template #more>
          <el-button link>more></el-button>
        </template>
        <div class="table-box">
          <el-table :data="batchList" v-loading="uvcStore.loading">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="batch_id" label="批次号"></el-table-column>
            <el-table-column prop="serial_no" label="序列号"></el-table-column>
            <el-table-column prop="operator_name" label="操作人"></el-table-column>
            <el-table-column label="状态">
              <template #default="{ row }">
                <el-text :type="row.status=='运行中'?'primary':undefined">
                  {{ row.status }}
                </el-text>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="showBatchInfo(scope)">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
            <el-empty description="没有数据"></el-empty>
            </template>
          </el-table>
        </div>
      </CardContainer>
    </div>
    <div class="info-box">
      <CardContainer title="设备信息">
        <div class="entity-box">
          <div class="entity-img">
            <img :src=entity alt="设备实物图" />
          </div>
          <div class="entity-info">
            <el-descriptions :column="1">
              <el-descriptions-item label="设备型号：">UVC-9600</el-descriptions-item>
              <el-descriptions-item label="软件版本：">V2.1.0</el-descriptions-item>
              <el-descriptions-item label="固件版本：">V1.3.2</el-descriptions-item>
              <el-descriptions-item label="运行时长：">
                <i>128</i>小时
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </CardContainer>
    </div>
    <div class="msg-box">
      <CardContainer title="系统通知">
        <template #more>
          <el-button link>more></el-button>
        </template>
        <ul class="msg-list">
          <li v-for="(item, idx) in msgList" :key="item.id">
            <MsgCard
              :title="item.title"
              :date="item.date"
              :msg="item.msg"
            ></MsgCard>
            <el-divider v-if="idx !== msgList.length -1" />
          </li>
        </ul>
      </CardContainer>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(18, 1fr);
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;

  .state-box {
    grid-row: 1 / span 5;
    grid-column: 1 / span 7;

    .dashboard {
      display: flex;
      height: 100%;
      gap: 20px;

      :deep(.el-icon.state-icon) {
        border-radius: 50%;
      }

      .batch {
        display: flex;
        align-items: flex-end;

        .batch-btn {
          margin-left: 8px;
        }
      }
    }
  }

  .batch-box {
    grid-row: 6 / span 13;
    grid-column: 1 / span 4;

    .table-box {
      :deep(.el-table__header th) {
        background-color: #f8f8f8;
        color: #000;
      }
    }
  }

  .info-box {
    grid-row: 6 / span 6;
    grid-column: 5 / span 3;

    :deep(.el-card__body) {
        padding: 20px 10px 10px;
      }

    .entity-box {
      height: 100%;
      display: flex;
      
      .entity-img {
        flex: 1;
        
        img {
          display: block;
          width: auto;
          height: 100%;
          margin: 0 auto;
        }
      }

      .entity-info {
        flex: 1;
        white-space: nowrap;

        :deep(.el-descriptions) {
          height: 100%;
          width: fit-content;
          margin: 0 auto;
        }
        :deep(.el-descriptions__body),
        :deep(.el-descriptions__table) {
          height: 100%;
        }

        :deep(.el-descriptions__table tbody) {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        :deep(.el-descriptions__table .el-descriptions__cell) {
          padding-bottom: 0;
        }
      }
    }
  }

  .msg-box {
    grid-row: 12 / span 7;
    grid-column: 5 / span 3;

    .msg-list {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      li {
        flex: 1;

        p {
          height: 100%;
        }
      }

      :deep(.el-divider) {
        margin: 0;
      }
    }
  }

  :deep(.el-card .el-card__header .el-button) {
    padding: 0;
  }
  :deep(.el-card .el-card__header .el-button:hover) {
    color: #64affe;
  }
}

@media screen and (max-width: 1024px) {
  .home-container {
    .batch-box {
      grid-row: 6 / span 7;
      grid-column: 1 / span 7;
    }

    .info-box {
      grid-row: 13 / span 6;
      grid-column: 1 / span 3;

      .entity-box .entity-img {
        display: none;
      }
    }

    .msg-box {
      grid-row: 13 / span 6;
      grid-column: 4 / span 4;
    }
  }
}
</style>
