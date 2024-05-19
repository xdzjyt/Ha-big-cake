<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted, reactive, ref } from 'vue';
import BarChart from '@/components/chart/BarChart.vue';
import LineChart from '@/components/chart/LineChart.vue';
import SpendingPieChart from '@/components/chart/SpendingPieChart.vue';
import RosePieChart from '@/components/chart/RosePieChart.vue';
import { UserFilled } from '@element-plus/icons-vue'

const loading = ref(false);
const cost_list = ref([
   { id: 1, label: "总点单量", value: 11455, stand: '单' },
   { id: 2, label: "今日成交额", value: 1145144, stand: '元' },
   { id: 3, label: "季度物资成本", value: 1145144, stand: '元' },
   { id: 4, label: "季度平均利润率", value: 1145144, stand: '%' },
   { id: 5, label: "月度工时统计", value: 114514, stand: 'h' }
]);


//  物料管理
const GoodsData = ref([
   {
      name: '仓位值',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 63023]
   },
   {
      name: '警戒值',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 68180]
   }
]);
const BaryAxisData = reactive({
   type: 'category',
   data: ['包装袋', '吸管', '纸杯', '糖浆', '牛奶', '咖啡豆'],
   axisLabel: {
      color: '#917800',
   }
});
const BarxAxisData = reactive({
   type: 'value',
   boundaryGap: [0, 0.01],
   axisLabel: {
      color: '#917800',
   }
});

// 销量管理

const LineyAxisData = reactive({
   type: 'value',
});

const LinexAxisData = reactive({
   type: 'category',
   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
   axisLabel: {
      color: '#917800',
   }
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


//报表list
const report_list = ref([
   { id: 1, value: '第三季度财报' },
   { id: 2, value: '物料采购清单' },
   { id: 3, value: '员工绩效考核列表' },
   { id: 4, value: '产品调研报告' },
   { id: 5, value: '市场分析与风险评估报告' },
   { id: 6, value: '重点信息和情况纪要' },
]);

//员工list
const emp_list = ref([
   { id: 1, name: '张沣睿', avater: '@/assets/images/fulilian.jpeg', identity: '店员' },
   { id: 2, name: '刘烨', avater: '', identity: '店长' },
   { id: 3, name: '朱未', avater: '', identity: '副店长' },
   { id: 4, name: '叼爷', avater: '', identity: '配送员' },
]);


//面包屑
const { title, asideList_id } = useMenuStore();
onMounted(() => {
   title.first = '首页';
   title.second = '';
   for (let i = 0; i < asideList_id.length; ++i) {
      asideList_id[i] = '';
   }
   asideList_id[0] = 'active';
   console.log(asideList_id);
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
                              <el-scrollbar>
                                 <div class="report-box">
                                    <h3>最新表单列表</h3>
                                    <div class="report">
                                       <div class="report-item" v-for="item in report_list" :key="item.id">{{ item.value
                                          }}</div>
                                    </div>
                                 </div>
                              </el-scrollbar>
                           </div>
                        </div>
                     </el-col>
                     <el-col :span="6">
                        <div class="grid-content">
                           <div class="box">
                              <el-scrollbar>
                                 <div class="emp-box">
                                    <h3>正在摸鱼的员工</h3>
                                    <div class="emp">
                                       <div class="emp-item" v-for="item in emp_list">
                                          <el-avatar :size="40" :src="item.avater">
                                             <i class="iconfont icon-user"></i>
                                          </el-avatar>
                                          <div class="emp-info">
                                             <div class="name">{{ item.name }}</div>
                                             <div class="identity">{{ item.identity }}</div>
                                          </div>
                                          <i class="iconfont icon-more more"></i>
                                       </div>
                                    </div>
                                 </div>
                              </el-scrollbar>
                           </div>
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
                                 <RosePieChart :chart-title="''" :chart-data="IncomeData" :chartLegend="IncomeLegend" />
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
   transition: all .5s ease-in;

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
            width: 18%;
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
            overflow: hidden;
            width: 100%;
            height: 100%;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
            @include background_color('bg-200');
            transition: all .3s ease;

            &:hover {
               box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
               scale: 1.01;
            }

            .pie-box {
               overflow: hidden;
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

         .emp-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 20px;
            @include font_color('text-100');

            h3 {
               @include font_color('primary-300');
            }

            .emp {
               padding: 5px;
               border-radius: 8px;
               border: 2px solid;
               @include border_color('text-200');
               user-select: none;

               .emp-item {
                  position: relative;
                  display: flex;
                  align-items: center;
                  gap: 10px;

                  i {
                     font-size: 30px;
                  }

                  .name {
                     font-size: 16px;
                     font-weight: 550;
                     margin-bottom: 5px;
                  }

                  .identity {
                     font-size: 12px;
                  }

                  .more {
                     display: block;
                     position: absolute;
                     right: 0;
                     border-radius: 12px;
                     transition: all .2s ease;
                     padding: 5px;

                     &:hover {
                        @include background_color('bg-300');
                        scale: 1.03;
                     }

                     &:active {
                        scale: 0.99;
                     }

                  }
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