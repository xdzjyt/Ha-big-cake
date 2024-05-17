<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted, reactive, ref } from 'vue';
import BarChart from '@/components/chart/BarChart.vue';
import LineChart from '@/components/chart/LineChart.vue';
import SpendingPieChart from '@/components/chart/SpendingPieChart.vue';
import RosePieChart from '@/components/chart/RosePieChart.vue';

const loading = ref(false);
const cost_list = ref([
   { id: 1, label: "总点单量", value: 11455, stand: '单' },
   { id: 2, label: "今日成交额", value: 114514545, stand: '元' },
   { id: 3, label: "季度物资成本", value: 114514545, stand: '元' },
   { id: 4, label: "季度平均利润率", value: 114514545, stand: '%' },
   { id: 5, label: "月度工时统计", value: 114514545, stand: 'h' }
]);


//  物料管理
const GoodsData = ref([
   {
      name: '仓位值',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
   },
   {
      name: '警戒值',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
   }
]);
const BaryAxisData = reactive({
   type: 'category',
   data: ['包装袋', '吸管', '纸杯', '糖浆', '牛奶', '咖啡豆']
});
const BarxAxisData = reactive({
   type: 'value',
   boundaryGap: [0, 0.01]
});

// 销量管理

const LineyAxisData = reactive({
   type: 'value'
});

const LinexAxisData = reactive({
   type: 'category',
   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
});

const SalesData = ref([
   {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
   }
]);

// 开支占比

const SpendingLegend = ref(['员工薪资', '设备维护', '物料采购', '场地租金', '折损消耗']);

const SpendingData = ref([
   { value: 40, name: '员工薪资' },
   { value: 33, name: '设备维护' },
   { value: 28, name: '物料采购' },
   { value: 22, name: '场地租金' },
   { value: 20, name: '折损消耗' },
]);

// 收入占比

const IncomeLegend = ref([
   '产品 1',
   '产品 2',
   '产品 3',
   '产品 4',
   '产品 5',
   '产品 6',
]);

const IncomeData = ref([
   { value: 40, name: '产品 1' },
   { value: 28, name: '产品 2' },
   { value: 26, name: '产品 3' },
   { value: 12, name: '产品 4' },
   { value: 22, name: '产品 5' },
   { value: 20, name: '产品 6' },
]);


//面包屑
const { title } = useMenuStore();
onMounted(() => {
   title.first = '首页';
   title.second = '';
});

</script>

<template>
   <div class="common-layout home-section">
      <el-scrollbar>
         <el-container>
            <el-main>
               <section class="cost-wrapper">
                  <div class="cost-box" v-for="item in cost_list" v-loading="loading">
                     <div class="label">{{ item.label }}</div>
                     <div class="value">{{ item.value }}<span>{{ item.stand }}</span>
                     </div>
                  </div>
               </section>
               <section class="central-wrapper">
                  <el-row :gutter="20">
                     <el-col :span="8">
                        <div class="grid-content">
                           <div class="box">
                              <BarChart :chart-title="'物料管理'" :chart-data="GoodsData" :yAxis="BaryAxisData"
                                 :xAxis="BarxAxisData" />
                           </div>
                        </div>
                     </el-col>
                     <el-col :span="10">
                        <div class="grid-content">
                           <div class="box">

                           </div>
                        </div>
                     </el-col>
                     <el-col :span="6">
                        <div class="grid-content">
                           <div class="box"></div>
                        </div>
                     </el-col>
                  </el-row>
                  <el-row :gutter="20">
                     <el-col :span="8">
                        <div class="grid-content">
                           <div class="box">
                              <LineChart :chartTitle="'销量管理'" :y-axis="LineyAxisData" :x-axis="LinexAxisData"
                                 :chartData="SalesData" />
                           </div>
                        </div>
                     </el-col>
                     <el-col :span="16">
                        <div class="grid-content">
                           <div class="box"
                              style="display: flex;justify-content: space-between;align-items: center;padding: 5px;">
                              <div class="pie-box">
                                 <SpendingPieChart :chart-title="'开支与收入情况占比'" :chart-legend="SpendingLegend"
                                    :chart-data="SpendingData" />
                              </div>
                              <div class="pie-box">
                                 <RosePieChart :chart-title="''" :chart-data="IncomeData" :chartLegend="IncomeLegend"/>
                              </div>
                           </div>
                        </div>
                     </el-col>
                  </el-row>
               </section>
            </el-main>
            <el-footer>
               <div class="copyright">Copyright © , All Rights Reserved.</div>
               <div class="more">
                  <span>Simon</span>
                  <el-divider direction="vertical" />
                  <span>Web</span>
                  <el-divider direction="vertical" />
                  <span>Watermark</span>
               </div>
            </el-footer>
         </el-container>
      </el-scrollbar>
   </div>
</template>

<style scoped lang="scss">
.scrollbar-demo-item {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 50px;
   margin: 10px;
   text-align: center;
   border-radius: 4px;
   background: var(--el-color-primary-light-9);
   color: var(--el-color-primary);
}

.home-section section[data-v-4bed82b5] {
   margin: 0;
}

.home-section {
   position: relative;
   height: 100%;
   width: 100%;
   @include background_color('bg-100');

   .el-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      .cost-wrapper {
         width: 100%;
         height: 30%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 40px 50px;
         gap: 25px;

         .cost-box {
            padding: 10px;
            width: 20%;
            height: 70%;
            border-radius: 12px;
            box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
            text-align: center;
            @include background_color('bg-300');

            .label {
               font-size: 20px;
               @include font_color('text-200');
               padding: 20px 10px 10px 10px;
            }

            .value {
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 8px;
               padding-top: 10px;
               padding-bottom: 20px;
               border-top: 2px solid;
               @include border_color('text-100');
               font-size: 35px;
               font-weight: 600;
               @include font_color('text-100');

               span {
                  font-size: 16px;
                  font-weight: 550;
               }
            }
         }
      }

      .central-wrapper {
         width: 100%;
         padding: 0 50px;
         margin-bottom: 120px;

         .box {
            width: 100%;
            height: 100%;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
            @include background_color('bg-200');

            .pie-box {
               width: 50%;
               height: 100%;
               border-right: 2px solid;
               padding: 6px;
               @include border_color('text-100');

               &:last-child {
                  border: none;
               }
            }
         }

      }
   }
}

.el-footer {
   padding: 0 !important;

   .copyright {
      height: 80px;
      width: 100%;
      @include background_color('bg-300');
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      box-shadow: 0 -5px 10px rgba(49, 61, 68, .6);
   }

   .more {
      padding-top: 60px;
      @include font_color('text-200');
      font-size: 25px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
   }
}
</style>

<style>
.el-row {
   margin-bottom: 50px;
}

.el-row:last-child {
   margin-bottom: 0;
}

.el-col {
   border-radius: 12px;
}

.grid-content {
   border-radius: 12px;
   height: 35vh;
}
</style>