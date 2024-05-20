<script setup lang="ts">
import BarChart from '@/components/chart/BarChart.vue';
import { ref, reactive } from 'vue';
import { Search } from '@element-plus/icons-vue';
const input = ref('');
//  仓位速览
const GoodsData = ref([
  {
    name: '仓位值',
    type: 'bar',
    data: [90, 70, 200, 160, 40, 60]
  },
  {
    name: '警戒值',
    type: 'bar',
    data: [20, 20, 20, 20, 20, 20]
  }
]);
const BarxAxisData = reactive({
  type: 'category',
  data: ['包装袋', '吸管', '纸杯', '糖浆', '牛奶', '咖啡豆'],
  axisLabel: {
    color: '#917800',
  }
});
const BaryAxisData = reactive({
  type: 'value',
  boundaryGap: [0, 0.01],
  axisLabel: {
    color: '#917800',
  }
});

//仓位变动明细
const report_list = ref([
  { id: 1, value: '2024年4月9日咖啡豆进货+100'},
  { id: 2, value: '2024年4月9日糖浆进货+100'} ,
  { id: 3, value: '2024年4月9日牛奶使用-20'},
  { id: 4, value: '2024年4月9日纸杯进货+100'},
  { id: 5, value: '2024年4月9日吸管损耗-10'},
  { id: 6, value: '2024年4月9日包装袋损耗-10'},
  { id: 7, value: '2024年4月9日包装袋进货+10'},
  { id: 8, value: '2024年4月9日吸管损耗-10'},
  { id: 9, value: '2024年4月9日包装袋损耗-10'},
]);
</script>
<template>
  <el-scrollbar>
    <el-container>
      <el-main class="main-wrapper">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="leftArea">
              <div class="box1">
                <BarChart :chart-title="'物料管理'" :chart-data="GoodsData" :yAxis="BaryAxisData" :xAxis="BarxAxisData" />
              </div>
              <div class="box2">
                <el-scrollbar>
                  <div class="report-box">
                    <h3>近期仓位变动明细</h3>
                    <div class="report">
                      <div class="report-item" v-for="item in report_list" :key="item.id">{{ item.value
                        }}</div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="rightArea">
              <div class="box3">
                <el-input v-model="input" style="width: 240px" placeholder="Please input" />
                <el-button type="primary" :icon="Search">Search</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-scrollbar>

</template>

<style lang="scss" scoped>
.main-wrapper {
  padding: 10px;
  height: 100vh;
  box-sizing: border-box;

  .leftArea {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    .box1 {
      width: 70%;
      height: 50%;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
      @include background_color('bg-200');
      transition: all .3s ease;

      &:hover {
        box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
        scale: 1.01;
      }
    }

    .box2 {
      width: 95%;
      height: 50%;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
      @include background_color('bg-200');
      transition: all .3s ease;

      &:hover {
        box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
        scale: 1.01;
      }

      .report-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        @include font_color('text-100');

        h3 {
          @include font_color('primary-300');
        }

        .report {
          box-shadow: inset 4px 4px 4px rgba(49, 61, 68, .8);
          padding: 5px;
          border-radius: 8px;
          border: 2px solid;
          @include border_color('text-200');
          user-select: none;

          .report-item {
            padding: 10px 6px;
            border-bottom: 2px solid;
            @include border_color('text-200');
            transition: all .3s ease;

            &:first-child {
              @include background_color('bg-300');
            }

            &:last-child {
              border: none;
            }

            &:hover {
              // filter: drop-shadow(0 0 10px #fff) drop-shadow(0 0 20px #fff);
              box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
              scale: 1.01;
            }

            &:active {
              scale: 0.99;
            }
          }
        }
      }
    } 
  }
  .rightArea {
    height: 100%;
    .box3{
      height: 100%;
      width: 100%;
      padding: 5px;
      border-radius: 12px;
      box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
      @include background_color('bg-200');
      transition: all .3s ease;

      &:hover {
        box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
        scale: 1.01;
      }
    }
  }
}

.el-row {
  margin-bottom: 20px;
  height: 100%;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  height: 100%;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>