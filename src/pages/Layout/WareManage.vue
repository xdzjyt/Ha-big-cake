<script setup lang="ts">
import BarChart from '@/components/chart/BarChart.vue';
import { ref, reactive, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import type { FormProps } from 'element-plus'
import type { ImageProps } from 'element-plus'
import imageSrc from '@/assets/images/R-C.jpg'
import { useMenuStore } from '@/stores/menuData';
const fits = [
  'fill'
] as ImageProps['fit'][]
const labelPosition = ref<FormProps['labelPosition']>('top')
const input = ref('');
const form = reactive([
  {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
  {
    name: '',
  },
]
)

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
    data: [20, 20, 20, 20, 20, 20],
    color: 'red'
  }
]);
const BarxAxisData = reactive({
  type: 'category',
  data: ['包装袋', '吸管', '纸杯', '糖浆', '牛奶', '咖啡豆'],
  axisLabel: {
    color: '#917800',
  },
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
  { id: 1, value: '2024年4月9日咖啡豆进货+100' },
  { id: 2, value: '2024年4月9日糖浆进货+100' },
  { id: 3, value: '2024年4月9日牛奶使用-20' },
  { id: 4, value: '2024年4月9日纸杯进货+100' },
  { id: 5, value: '2024年4月9日吸管损耗-10' },
  { id: 6, value: '2024年4月9日包装袋损耗-10' },
  { id: 7, value: '2024年4月9日包装袋进货+10' },
  { id: 8, value: '2024年4月9日吸管损耗-10' },
  { id: 9, value: '2024年4月9日包装袋损耗-10' },
]);


//面包屑
const { title, asideList_id } = useMenuStore();
onMounted(() => {
  title.first = '物料管理';
  title.second = '';
  for (let i = 0; i < asideList_id.length; ++i) {
    asideList_id[i] = '';
  }
  asideList_id[2] = 'active';
});
</script>

<template>
  <div class="common-layout home-section">
    <el-scrollbar>
      <el-container>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="14">
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
            <el-col :span="10">
              <div class="rightArea">
                <div class="box3">
                  <el-input v-model="input" style="width: 240px; margin: 10px 10px" placeholder="请输入想要查询的物料" />
                  <el-button type="primary" :icon="Search" style="margin-left: 20px;width: 10%;">搜索</el-button>
                  <h3 style="margin: 10px 0;">物料快捷操作</h3>
                  <el-form :model="form" label-width="auto" style="max-width: 600px" :label-position="labelPosition"
                    class="inline-form">
                    <el-form-item label="物料名称">
                      <el-input v-model="form[0].name" placeholder="糖浆/牛奶/纸杯" size="large" />
                    </el-form-item>
                    <el-image style="width: 150px; height: 150px" :src="imageSrc" :fit="fits" />
                    <el-image style="width: 150px; height: 150px" :src="imageSrc" :fit="fits" />
                    <el-form-item label="变化数量">
                      <el-input v-model="form[1].name" placeholder="增加/减少" size="large" />
                    </el-form-item>
                    <el-form-item label="变动类型">
                      <el-input v-model="form[2].name" placeholder="采购/抽样/损耗" size="large" />
                    </el-form-item>
                    <el-form-item label="生产日期">
                      <el-col :span="24">
                        <el-date-picker v-model="form[3].name" type="date" placeholder="Pick a date" style="width: 100%"
                          size="large" />
                      </el-col>
                    </el-form-item>
                    <el-form-item label="保质期/日">
                      <el-input v-model="form[4].name" style="width: 70%;" placeholder="减少可不填" size="large" />
                    </el-form-item>
                    <el-form-item label="物料来源" style="width: 60%;">
                      <el-input v-model="form[5].name" placeholder="xx省 xx市 xx区/县 xx公司" size="large" />
                    </el-form-item>
                    <el-form-item label="单价" style="width: 50%; margin-right: 10px">
                      <el-input v-model="form[6].name" size="large" />
                    </el-form-item>
                    <el-form-item label="总价">
                      <el-input v-model="form[7].name" size="large" />
                    </el-form-item>
                    <el-form-item label="仓位" style="width: 55%; margin-right: 10px;">
                      <el-input v-model="form[8].name" placeholder="C5-H003-1238" size="large" />
                    </el-form-item>
                    <el-form-item label="变动时间">
                      <el-input v-model="form[9].name" placeholder="2021/9/12" size="large" />
                    </el-form-item>
                    <el-form-item label="操作员" style="width: 55%;">
                      <el-input v-model="form[10].name" placeholder="李华" size="large" />
                    </el-form-item>
                    <el-form-item label="备注" :rows="6" style=" width: 80%;  margin-right: 100px; margin-bottom: 10px;">
                      <el-input v-model="form[0].desc" type="textarea" style="height: 100%;" />
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary">Create</el-button>
                      <el-button>Cancel</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
          </el-row>
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

<style lang="scss" scoped>
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

.el-main {
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

    .box3 {
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

      h3 {
        @include font_color('primary-300');
        padding-left: 30px;
        display: inline-block;
        width: 30%;
      }

      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: center;
        margin-left: 10px;
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

// .el-row {
//   margin-bottom: 20px;
//   height: 100%;
// }

// .el-row:last-child {
//   margin-bottom: 0;
// }

// .el-col {
//   border-radius: 4px;
//   height: 100%;
// }

// .grid-content {
//   border-radius: 4px;
//   min-height: 36px;
// }
</style>