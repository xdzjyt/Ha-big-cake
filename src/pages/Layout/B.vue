<script setup lang="ts">
import { useMenuStore } from '@/stores/menuData';
import { onMounted, reactive, ref } from 'vue';

const loading = ref(false);
const cost_list = ref([
   { id: 1, label: "总点单量", value: 11455, stand: '单' },
   { id: 2, label: "今日成交额", value: 114514545, stand: '元' },
   { id: 3, label: "季度物资成本", value: 114514545, stand: '元' },
   { id: 4, label: "季度平均利润率", value: 114514545, stand: '%' },
   { id: 5, label: "月度工时统计", value: 114514545, stand: 'h' }
]);

const costRes = ref([0, 0, 0, 0]);
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
                  <div class="wrapper">
                     <div class="box box-1-1"></div>
                     <div class="box box-1-2"></div>
                     <div class="box box-1-3"></div>
                  </div>
                  <div class="wrapper">
                     <div class="box box-2-1"></div>
                     <div class="box box-2-2"></div>
                  </div>
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
            @include background_color('bg-200');

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
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: space-between;
         padding: 0 50px;

         .wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-bottom: 50px;

            .box {
               height: 0;
               position: relative;
               padding-top: 20%;
               border-radius: 12px;
               box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
               @include background_color('bg-200');
            }

            .box-1-1,
            .box-2-1 {
               flex-grow: 3;
            }

            .box-1-2 {
               flex-grow: 4;
            }

            .box-1-3 {
               flex-grow: 2;
            }

            .box-2-2 {
               flex-grow: 6;
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
}
</style>