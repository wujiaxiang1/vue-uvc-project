<script setup>
defineOptions({
  name: 'CountPage'
})
import MainFuncContainer from '@/components/MainFuncContainer.vue'
import { ref, watch, onUnmounted } from 'vue'
import { useCountStore } from '@/stores'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import wellPlate from '@/assets/imgs/wellplate96.png'
import {
  getBatchSerialService,
  getBatchListService,
  getSerialListService,
  getInfoFromBatchSerialService
} from '@/api/uvc'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { PhotoGetImgService, getTaskStateService } from '@/api/count'

// 获取仓库对象
const countStore = useCountStore()

// 最近孔位计数展览  展览总集取前5个（改为从仓库获取）
const recentlyCountShowList = ref([])
const getCountStoreData = () => {
  console.log('获取最近计数数据')
  // array.slice(startIndex, endIndex) 不包含endValue 返回新数组
  recentlyCountShowList.value = countStore.countShowDataList.slice(0, 3)
}
getCountStoreData()

// 等待图片渲染
const originalWaiting = ref(true)
const processedWaiting = ref(true)
const loading = ref(false)

// 图片地址
const originalImg = ref('')
const processedImg = ref('')

// 拍照按钮是否可用
const isBtnUsable = ref(true)

// 批次选择按钮是否可用
const isSelectAble = ref(false)

// 孔板搜索信息
const existingBatchId = ref([])
const existingSerialNo = ref([])

// 已有批次序列信息
const batchTableData = ref([])

// 开关抽屉
const outerDrawerVisible = ref(false)
const innerDrawerVisible = ref(false)
const isClickClose = ref(true) // 可以点击关闭
const outerCloseDelay = ref(0) // 外层延迟关闭

// 内层层级
const innerZIndex = ref(9999)
// 遮罩层显示状态
const isMaskDisplay = ref('none')

// 孔板信息搜索表单校验
const batchInfoForm = ref({
  batch_id: '',
  serial_no: ''
})
const batchInfoRule = ref({
  batch_id: [
    // 非空校验
    { required: true, message: '请选择序列号', trigger: 'change' }
  ]
})

// 当前页码
const currentPage = ref(1)
// 每页条数
const pageSize = ref(5)
// 数据总条数
const dataTotal = ref(0)

// 孔洞信息收集（[{}]格式用于绑定table） 批次+序列+行号+列号
const holeTableData = ref([
  {
    batch_id: '',
    serial_no: '',
    row_no: '',
    col_no: ''
  }
])
// 未使用孔位信息（注：先选行，后选列  多级请求）
const availableRowNoList = ref(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
const availableColNoList = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])

// 孔洞信息最终数据展示（绑定table）
const holeInfoShow = ref([
  {
    colony_type: '待确定', // 菌种
    batch_id: '待选择', // 批次号
    serial_no: '待选择', // 序列号
    row_no: '待选择', // 行号
    col_no: '待选择', // 列号
    proc_time: '0', // 处理时长
    count_rst: '待统计' // 计数结果
  }
])

// 定时器id
const timerId = ref()
// 线程任务id
const taskId = ref('')
// 任务状态
const taskStatus = ref('')
// 任务处理结果
const taskRst = ref({})

// 获取所有已有批次序列信息（封装通用）
const getBatchSerialData = async () => {
  const batchSerialRst = await getBatchSerialService(
    currentPage.value,
    pageSize.value
  )
  batchTableData.value = batchSerialRst.data.pagingData
  dataTotal.value = batchSerialRst.data.total
}

// 根据批次+序列获取指定信息（封装通用）
const getDataFromBatchAndSerial = async () => {
  const rst = await getInfoFromBatchSerialService(
    batchInfoForm.value.batch_id,
    batchInfoForm.value.serial_no,
    currentPage.value,
    pageSize.value
  )
  batchTableData.value = rst.data.batchSerialInfo
  dataTotal.value = rst.data.total
}

// 监听分页变化，调用不同api，获取对应信息
watch([currentPage, pageSize], async () => {
  // 1、如果未选批次和序列 获取所有批次序列信息
  // 2、如果已选批次 但未选序列
  //    或  批次和序列都已选
  if (!batchInfoForm.value.batch_id && !batchInfoForm.value.serial_no) {
    await getBatchSerialData()
  } else {
    await getDataFromBatchAndSerial()
  }
})

// 外层打开时
const outerOpening = async () => {
  // 获取可搜索批次列表
  const batchRst = await getBatchListService()
  existingBatchId.value = batchRst.data.batchList
  // 初始时获取所有批次序列
  await getBatchSerialData()
}

// 批次搜索改变时 获取序列列表
const batchSelectChange = async (currEle) => {
  if (currEle) {
    const serialRst = await getSerialListService(batchInfoForm.value.batch_id)
    existingSerialNo.value = serialRst.data.serialList
    batchInfoForm.value.serial_no = ''
  }
}

// 外层关闭前
const beforeOuterClose = () => {
  console.log('外层关闭前')
  // 清空已选查询
  batchInfoForm.value.batch_id = ''
  batchInfoForm.value.serial_no = ''
  // 关闭外层
  outerDrawerVisible.value = false
}

// 内层打开时
const innerOpening = () => {
  innerZIndex.value = 9999
  isClickClose.value = false
  isMaskDisplay.value = 'block'
}

// 内层关闭前
const beforeInnerClose = () => {
  console.log('内层关闭前')
  // 清空已选孔位
  holeTableData.value[0].row_no = ''
  holeTableData.value[0].col_no = ''
  // 关闭内层
  innerDrawerVisible.value = false
  isClickClose.value = true
  innerZIndex.value = 0
  isMaskDisplay.value = 'none'
}

// 查询指定批次序列信息
const queryBatchAndSerial = async () => {
  if (!batchInfoForm.value.batch_id && !batchInfoForm.value.serial_no) {
    ElMessage({
      showClose: true,
      message: '请选择批次号或序列号！',
      type: 'error'
    })
  } else {
    // 根据批次+序列获取所有数据（序列可为空）
    await getDataFromBatchAndSerial()
  }
}

// 清除批次查询时
const clearBatchSelect = async () => {
  // 清空对应序列选择
  existingSerialNo.value = []
  batchInfoForm.value.serial_no = ''
  // 初始化数据
  await getBatchSerialData()
}
// 清除序列查询时
const clearSerialSelect = async () => {
  // 初始化数据
  await getDataFromBatchAndSerial()
}

// 选择孔板信息 进入孔位选择
const plateSelected = ({ batch_id, serial_no }) => {
  holeTableData.value[0].batch_id = batch_id
  holeTableData.value[0].serial_no = serial_no
  // 打开内层抽屉
  innerDrawerVisible.value = true
}

const handleHoleSelected = ({ batch_id, serial_no }) => {
  if (!holeTableData.value[0].row_no || !holeTableData.value[0].col_no) {
    ElMessage({
      showClose: true,
      message: '请选择行号和列号！',
      type: 'error',
      placement: 'bottom',
      zIndex: innerZIndex.value + 1,
      appendTo: document.querySelector('.inner-drawer')
    })
    return
  }
  // 如果有 清空展示
  if (originalImg.value) {
    clearShowInfo()
  }
  // 根据批次序列信息获取当前菌种（接口待写）

  // 更新展示  此处仅更新已知信息
  holeInfoShow.value = [
    {
      colony_type: '待确定',
      batch_id,
      serial_no,
      row_no: holeTableData.value[0].row_no,
      col_no: holeTableData.value[0].col_no,
      proc_time: '0',
      count_rst: '待统计'
    }
  ]
  // 关内层
  beforeInnerClose()
  // 延迟关外层
  outerCloseDelay.value = 500
  beforeOuterClose()
  // 解锁按钮
  isBtnUsable.value = false
}


// 拍照处理
const TakePhotoFunc = async () => {
  // 禁用批次选择
  isSelectAble.value = true
  // 禁用按钮
  isBtnUsable.value = true
  console.log('拍照处理')
  // 请求获取原始图像url
  const hole_no = holeInfoShow.value[0].row_no + holeInfoShow.value[0].col_no
  const originalImgInfo = await PhotoGetImgService(holeInfoShow.value[0].batch_id, holeInfoShow.value[0].serial_no, hole_no)
  const { err_info, status, task_id, original_img_url} = originalImgInfo.data
  console.log(err_info, status, task_id, original_img_url)
  if (err_info) {
    ElMessage({
      showClose: true,
      message: `[错误]${err_info}`,
      type: 'error'
    })
  } else {
    // 渲染图片
    originalWaiting.value = false
    originalImg.value = original_img_url
    // 首次任务状态
    taskId.value = task_id
    taskStatus.value = status
    // 设置加载状态
    loading.value = true
    // 开始轮询
    timerId.value = setInterval(async () => {
      const taskStatusRst = await getTaskStateService(taskId.value)
      const {task_id, status, result} = taskStatusRst.data
      console.log(task_id, status, result)
      if (status === 'SUCCESS') {
        // 关闭定时器
        clearInterval(timerId.value)
        // 获取结果
        taskRst.value = result
        // 清空任务id
        taskId.value = task_id
        // 更新处理后信息
        console.log(taskRst.value)
        if (taskRst.value.err_info) {
          ElMessage({
            showClose: true,
            message: `[错误]${taskRst.value.err_info}`,
            type: 'error'
          })
        } else {
          // 展示处理后图像信息
          loading.value = false
          processedWaiting.value = false
          processedImg.value = taskRst.value.processed_img_url
          // 计数所用时间待统计
          holeInfoShow.value[0].proc_time = 10
          holeInfoShow.value[0].count_rst = taskRst.value.count_rst
          // 启用批次选择
          isSelectAble.value = false
        }
      } else {
        // 重置任务id
        taskId.value = task_id
      }
    }, 2000)
  }
}

// 点击清除展示信息
const clearShowInfo = () => {
  // 清除可能存在的旧定时器
  if (timerId.value) clearInterval(timerId.value)
  // 清除页面信息
  originalImg.value = ''
  processedImg.value = ''
  originalWaiting.value = true
  processedWaiting.value = true
  holeInfoShow.value = [{
    colony_type: '待确定',
    batch_id: '待选择',
    serial_no: '待选择',
    row_no: '待选择',
    col_no: '待选择',
    proc_time: '0',
    count_rst: '待统计'
  }]
  // 禁用按钮
  isBtnUsable.value = false
}

// 页面关闭时关闭定时器
onUnmounted(() => {
  if (timerId.value) clearInterval(timerId.value)
})
</script>

<template>
  <MainFuncContainer
    leCardTitle="菌落计数"
    riCardTitle="最近孔位"
    :dataList="recentlyCountShowList"
  >
    <div class="count-main-body">
      <div class="func-btn-box">
        <el-button type="primary" @click="outerDrawerVisible = true" :disabled="isSelectAble">批次选择</el-button>
        <el-button type="primary">测试相机</el-button>
        <el-button type="primary" @click="clearShowInfo">清空展示</el-button>
      </div>
      <div class="img-show-box">
        <div class="photo-box">
          <div class="img-outer-box">
            <p class="img-inner-box">
              <img
                v-if="originalWaiting"
                src="@/assets/imgs/loading.png"
                alt="处理前"
              />
              <img v-else :src="originalImg" alt="处理前" />
            </p>
          </div>
          <el-button
            class="photo"
            type="primary"
            @click="TakePhotoFunc"
            :disabled="isBtnUsable"
          >
            拍摄
          </el-button>
        </div>
        <div class="rst-box">
          <div class="img-outer-box">
            <p class="img-inner-box" v-loading="loading">
              <img
                v-if="processedWaiting"
                src="@/assets/imgs/loading.png"
                alt="处理后"
              />
              <img v-else :src="processedImg" alt="处理后" />
            </p>
          </div>
        </div>
      </div>
      <div class="hole-show-table">
        <el-table :data="holeInfoShow">
          <el-table-column prop="colony_type" label="菌种" align="center" />
          <el-table-column prop="batch_id" label="批次号" align="center" />
          <el-table-column prop="serial_no" label="序列号" align="center" />
          <el-table-column prop="row_no" label="行号" align="center" />
          <el-table-column prop="col_no" label="列号" align="center" />
          <el-table-column
            prop="proc_time"
            label="处理时长（秒）"
            align="center"
          />
          <el-table-column label="计数结果（个）" align="center">
            <el-text tag="b" size="large">{{
              holeInfoShow[0].count_rst
            }}</el-text>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </MainFuncContainer>
  <el-drawer
    class="outer-drawer common-drawer-class"
    v-model="outerDrawerVisible"
    :append-to-body="true"
    :close-on-click-modal="isClickClose"
    size="40%"
    :close-delay="outerCloseDelay"
    :show-close="false"
    @open="outerOpening"
    :before-close="beforeOuterClose"
  >
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">批次选择</h4>
    </template>
    <div class="search-filter-form">
      <el-form
        :inline="true"
        :model="batchInfoForm"
        :rules="batchInfoRule"
        class="demo-form-inline"
      >
        <el-form-item label="批次号" prop="batch_id">
          <el-select
            v-model="batchInfoForm.batch_id"
            placeholder="请选择..."
            style="width: 120px"
            clearable
            @change="batchSelectChange($event)"
            @clear="clearBatchSelect"
          >
            <el-option
              v-for="(batch_id, index) in existingBatchId"
              :key="index"
              :label="batch_id"
              :value="batch_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="序列号" prop="serial_no">
          <el-select
            v-model="batchInfoForm.serial_no"
            placeholder="请选择..."
            style="width: 120px"
            clearable
            @clear="clearSerialSelect"
          >
            <el-option
              v-for="(serial_no, index) in existingSerialNo"
              :key="index"
              :label="serial_no"
              :value="serial_no"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button color="#015eea" @click="queryBatchAndSerial"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="serach-info-outer-box">
      <div class="batch-info-box">
        <el-table :data="batchTableData">
          <el-table-column prop="batch_id" label="批次号" align="center" />
          <el-table-column prop="serial_no" label="序列号" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button @click="plateSelected(row)" link type="primary"
                >选择</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
        <el-config-provider :locale="zhCn">
          <!-- 15 -->
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15]"
            :total="dataTotal"
          />
        </el-config-provider>
      </div>
    </div>
    <p
      class="outer-mask"
      :style="{ zIndex: `${innerZIndex - 1}`, display: `${isMaskDisplay}` }"
    ></p>
  </el-drawer>
  <el-drawer
    class="inner-drawer common-drawer-class"
    v-model="innerDrawerVisible"
    :append-to-body="true"
    size="40%"
    :modal="false"
    modal-penetrable
    :show-close="false"
    @open="innerOpening"
    :before-close="beforeInnerClose"
    :z-index="innerZIndex"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">孔位选择</h4>
      <el-button type="danger" @click="close"> 返回 </el-button>
    </template>
    <div class="temp-img-box">
      <img class="well-plate-img" :src="wellPlate" alt="96孔板示例" />
    </div>
    <div class="hole-info-box">
      <el-table :data="holeTableData">
        <el-table-column prop="batch_id" label="批次号" align="center" />
        <el-table-column prop="serial_no" label="序列号" align="center" />
        <el-table-column label="行号" align="center" width="120">
          <template #default>
            <el-select
              v-model="holeTableData[0].row_no"
              placeholder="请选择..."
              :popper-style="{ zIndex: innerZIndex + 1 }"
              clearable
            >
              <el-option
                v-for="(rowNo, index) in availableRowNoList"
                :key="index"
                :value="rowNo"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="列号" align="center" width="120">
          <template #default>
            <el-select
              v-model="holeTableData[0].col_no"
              placeholder="请选择..."
              :popper-style="{ zIndex: innerZIndex + 1 }"
              clearable
            >
              <el-option
                v-for="(rowNo, index) in availableColNoList"
                :key="index"
                :value="rowNo"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button @click="handleHoleSelected(row)" type="primary" link>
              确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<style scoped lang="less">
.count-main-body {
  height: 100%;
  color: #000;
  display: flex;
  flex-direction: column;
  gap: 15px;

  .img-show-box {
    display: flex;
    gap: 30px;

    .photo-box,
    .rst-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;

      .img-outer-box {
        width: 100%;
        background-color: rgb(44, 45, 49);

        .img-inner-box {
          width: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #aaa;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .photo-box {
      .photo {
        width: 100px;
      }
    }
  }

  .hole-show-table {
    width: 100%;
    border: 1px solid #ddd;

    :deep(.el-table__header th) {
      background-color: #eee;
      color: #424242;
    }
  }
}

:global(.common-drawer-class) {
  border-left: 2px solid #aaa;
}

:global(.common-drawer-class .el-drawer__header) {
  margin-bottom: 0;
  padding: 20px 10px 0;
}

:global(.outer-drawer .el-drawer__body) {
  padding: 0 10px 0;
  margin: 10px;
  border: 1px solid #aaa;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
}

:global(.outer-mask) {
  position: absolute;
  background-color: #ffffffbe;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

:global(.search-filter-form) {
  margin: 10px 0 20px;
}

:global(.search-filter-form .el-form-item) {
  margin-bottom: 0;
}

:global(.serach-info-outer-box) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:global(.serach-info-outer-box .batch-info-box) {
  flex: 1;
}

:global(.serach-info-outer-box .batch-info-box .el-table__header th) {
  color: #000;
  font-weight: 700;
  background-color: #eee;
}

:global(.serach-info-outer-box .pagination-box) {
  display: flex;
  justify-content: center;
  margin: 10px 0 15px;
}

:global(.inner-drawer.el-drawer) {
  background-color: #ffffffbe;
  height: 70%;
  border-bottom: 2px solid #aaa;
  right: 40%;
}

:global(.inner-drawer .el-drawer__header) {
  padding: 15px 10px 0;
}

:global(.inner-drawer .el-drawer__body) {
  padding: 0;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

:global(.temp-img-box .well-plate-img) {
  width: 100%;
}

:global(.hole-info-box) {
  flex: 1;
  border: 1px solid #aaa;
  border-radius: 7px;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
}

@media screen and(max-width: 1024px) {
  .count-main-body {
    .img-show-box {
      flex-direction: column;
    }
  }
}
</style>
