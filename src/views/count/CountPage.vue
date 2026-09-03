<script setup>
defineOptions({
  name: 'CountPage'
})
import MainFuncContainer from '@/components/MainFuncContainer.vue'
import { ref } from 'vue'

// 计数仓库数据
const countStoreDataList = ref([])
const getCountStoreData = () => {
  console.log('获取计数仓库数据 api')
  countStoreDataList.value = [
    {
      date: '2026.08.02',
      batch_num: '1234567',
      serial_num: '001',
      hole_site: '01',
      img_path: 'https://preview.qiantucdn.com/freepik/512/3602/3602012.png!qt1024_1',
      count_rst: 0
    },
    {
      date: '2026.08.02',
      batch_num: '1234567',
      serial_num: '001',
      hole_site: '02',
      img_path: 'https://preview.qiantucdn.com/freepik/512/3602/3602012.png!qt1024_1',
      count_rst: 0
    },
    {
      date: '2026.08.02',
      batch_num: '1234567',
      serial_num: '001',
      hole_site: '03',
      img_path: 'https://preview.qiantucdn.com/freepik/512/3602/3602012.png!qt1024_1',
      count_rst: 0
    },
    {
      date: '2026.08.02',
      batch_num: '1234567',
      serial_num: '001',
      hole_site: '11',
      img_path: 'https://preview.qiantucdn.com/freepik/512/3602/3602012.png!qt1024_1',
      count_rst: 0
    },
    {
      date: '2026.08.02',
      batch_num: '1234567',
      serial_num: '001',
      hole_site: '95',
      img_path: 'https://preview.qiantucdn.com/freepik/512/3602/3602012.png!qt1024_1',
      count_rst: 0
    }
  ]
}
getCountStoreData()

const waiting = ref(false)
const loading = ref(true)
</script>

<template>
  <MainFuncContainer
    leCardTitle="菌落计数"
    riCardTitle="最近孔位"
    :dataList="countStoreDataList"
  >
    <div class="count-main-body">
      <div class="func-btn-box">
        <el-button type="primary">批次选择</el-button>
        <el-button type="primary">测试相机</el-button>
        <el-button type="primary">清空展示</el-button>
      </div>
      <div class="img-info">
        待计数孔位：
      </div>
      <div class="img-show-box">
        <div class="photo-box">
          <div class="img-outer-box">
            <p class="img-inner-box">
              <img v-if="waiting" src="https://ts1.tc.mm.bing.net/th/id/R-C.b681c8a78f82eb8cebe7c246879a4584?rik=uiHrpzJLDbAO8A&riu=http%3a%2f%2fclipartmag.com%2fimages%2fsad-puppy-cartoon-36.png&ehk=wB8IU3UOybyzUo%2bw2SqTcIi2d7ExmDEyVvwzxY3R2W0%3d&risl=&pid=ImgRaw&r=0" alt="处理前">
              <img v-else src="https://ts1.tc.mm.bing.net/th/id/R-C.b0ecc33289f5515820d2fa2a68f804db?rik=zpRgc7tRC5mPng&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20171031%2f6bebaf48c99040c9a6d80cec1a248446.jpeg&ehk=qwo0EdubJr5nu1xiHo%2bXObkECTSiQjvlU75coGbZTTQ%3d&risl=&pid=ImgRaw&r=0" alt="处理前">
            </p>
          </div>
          <el-button class="photo" type="primary">拍照</el-button>
        </div>
        <div class="rst-box">
          <div class="img-outer-box">
            <p class="img-inner-box" v-loading="loading">
              <img v-if="waiting" src="https://ts1.tc.mm.bing.net/th/id/R-C.b681c8a78f82eb8cebe7c246879a4584?rik=uiHrpzJLDbAO8A&riu=http%3a%2f%2fclipartmag.com%2fimages%2fsad-puppy-cartoon-36.png&ehk=wB8IU3UOybyzUo%2bw2SqTcIi2d7ExmDEyVvwzxY3R2W0%3d&risl=&pid=ImgRaw&r=0" alt="处理后">
              <img v-else src="https://ts1.tc.mm.bing.net/th/id/R-C.b0ecc33289f5515820d2fa2a68f804db?rik=zpRgc7tRC5mPng&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20171031%2f6bebaf48c99040c9a6d80cec1a248446.jpeg&ehk=qwo0EdubJr5nu1xiHo%2bXObkECTSiQjvlU75coGbZTTQ%3d&risl=&pid=ImgRaw&r=0" alt="处理后">
            </p>
          </div>
          <el-text class="rst">
            计数结果:
            <i class="rst-value">100</i>
          </el-text>
        </div>
      </div>
    </div>
  </MainFuncContainer>
</template>

<style scoped lang="less">
.count-main-body {
  height: 100%;

  color: #000;
  display: flex;
  flex-direction: column;

  .img-info {
    font-size: 14px;
    margin: 20px 0 10px 0;
  }

  .img-show-box {
    display: flex;
    gap: 20px;
  }

  .photo-box,
  .rst-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 10px;
    align-items: center;

    .img-outer-box {
      background-color:  rgb(44, 45, 49);

      .img-inner-box {
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

  .rst-box {
    .rst {
      font-size: 16px;
      color: #000;

      .rst-value {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
}

@media screen and(max-width: 1024px) {
  .count-main-body {
    .img-show-box {
      flex-direction: column;
    }
  }
}
</style>
