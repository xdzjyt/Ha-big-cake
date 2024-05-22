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
          <el-row :gutter="30">
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
                <div class="search-box">
                  <el-input v-model="input" placeholder="请输入想要查询的物料" />
                  <div class="button search" :icon="Search">搜索</div>
                </div>
                <div class="box3">
                  <h3>物料快捷操作</h3>
                  <el-form :model="form" label-width="auto" style="max-width: 600px" :label-position="labelPosition"
                    class="inline-form">
                    <div class="section-1">
                      <div class="left">
                        <el-form-item style="width: 100%;">
                          <label slot="label" style="color:#917800;font-size: 18px;">物料名称</label>
                          <el-input v-model="form[0].name" placeholder="糖浆/牛奶/纸杯" size="large" />
                        </el-form-item>
                        <el-form-item  style="width: 40%;">
                          <label slot="label" style="color:#917800;font-size: 18px;">变化数量</label>
                          <el-input v-model="form[1].name" placeholder="增加/减少" size="large" />
                        </el-form-item>
                        <el-form-item style="width: 55%;">
                          <label slot="label" style="color:#917800;font-size: 18px;">变动类型</label>
                          <el-input v-model="form[2].name" placeholder="采购/抽样/损耗" size="large" />
                        </el-form-item>
                      </div>
                      <div class="right">
                        <div class="img-box">
                          <el-image style="width: 100px; height: 100px;border-radius: 12px;" :src="imageSrc" :fit="fits" />
                          <div class="label">物料实拍图</div>
                        </div>
                        <div class="img-box">
                          <el-image style="width: 100px; height: 100px;border-radius: 12px;" :src="imageSrc" :fit="fits" />
                          <div class="label">票据实拍图</div>
                        </div>
                      </div>
                    </div>
                    <div class="section-2">
                      <el-form-item  style="width: 28%;">
                        <label slot="label" style="color:#917800;font-size: 18px;">生产日期</label>
                        <el-date-picker v-model="form[3].name" type="date" placeholder="减少可不填" />
                      </el-form-item>
                      <el-form-item  style="width: 28%;">
                        <label slot="label" style="color:#917800;font-size: 18px;">保质期/日</label>
                        <el-date-picker v-model="form[4].name" placeholder="减少可不填" />
                      </el-form-item>
                    </div>
                    <el-form-item  style="width: 80%;">
                      <label slot="label" style="color:#917800;font-size: 18px;">物料来源</label>
                      <el-input v-model="form[5].name" placeholder="xx省 xx市 xx区/县 xx公司" size="large" />
                    </el-form-item>
                    <div class="section-3">
                      <el-form-item  style="width: 42%;">
                        <label slot="label" style="color:#917800;font-size: 18px;">单价</label>
                        <el-input v-model="form[6].name" size="large" placeholder="xxxx元(减少可不写)" />
                      </el-form-item>
                      <el-form-item   style="width: 42%;">
                        <label slot="label" style="color:#917800;font-size: 18px;">总价</label>
                        <el-input v-model="form[7].name" size="large" placeholder="xxxx元(减少可不写)" />
                      </el-form-item>
                    </div>
                    <div class="section-4">
                      <el-form-item  style="width: 50%;">
                        <label slot="label" style="color:#917800;font-size: 18px;">仓位</label>
                        <el-input v-model="form[8].name" placeholder="C5-H003-1238" />
                      </el-form-item>
                      <el-form-item  style="width: 40%;">
                        <label slot="label" style="color:#917800;font-size: 18px;">变动时间</label>
                        <el-input v-model="form[9].name" placeholder="2021/9/12" />
                      </el-form-item>
                    </div>
                    <el-form-item style="width: 55%;">
                      <label slot="label" style="color:#917800;font-size: 18px;">操作员</label>
                      <el-input v-model="form[10].name" placeholder="李华" size="large" />
                    </el-form-item>
                    <el-form-item  style=" width: 80%;margin-bottom: 20px;">
                      <label slot="label" style="color:#917800;font-size: 18px;">备注</label>
                      <el-input v-model="form[0].desc" type="textarea" :rows="6" />
                    </el-form-item>
                    <div class="button-box">
                      <div class="button submit">执行操作</div>
                    </div>
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

.home-section {
  position: relative;
  height: 100%;
  width: 100%;
  @include background_color('bg-100');
  transition: all .5s ease-in;

  .button {
    user-select: none;
    min-width: 100px;
    padding: 0 20px;
    height: 40px;
    outline: none;
    border: none;
    @include background_color("bg-300");
    color: white;
    font-size: 18px;
    border-radius: 5px;
    transition: all 0.3s ease;
    box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
    text-align: center;
    line-height: 40px;

    &:hover {
      scale: 1.03;
      opacity: 0.8;
    }

    &:active {
      scale: 0.98;
    }
  }

  .el-main {
    padding: 60px 30px 80px 50px;

    .leftArea {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 40px;


      .box1 {
        overflow: hidden;
        width: 75%;
        height: 45vh;
        padding: 20px;
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
        height: 60vh;
        padding: 30px;
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
            padding: 10px;
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
      display: flex;
      flex-direction: column;
      align-items: center;

      .search-box {
        width: 100%;
        height: 15vh;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;

        .el-input {
          width: 70%;
          height: 40%;
        }

        .search {
          width: 20%;
        }
      }

      .box3 {
        height: 100%;
        width: 100%;
        padding: 30px 20px;
        border-radius: 12px;
        box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
        @include background_color('bg-200');
        transition: all .3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &:hover {
          box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
          scale: 1.01;
        }

        h3 {
          @include font_color('text-100');
          font-size: 25px;
          white-space: nowrap;
          margin-bottom: 20px;
        }

        .inline-form {

          .el-input {
            height: 35px;
            margin-bottom: 10px;
          }

          .section-1 {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;

            .left {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: center;
            }

            .right {
              display: flex;
              justify-content: space-between;
              gap: 10px;
              align-items: center;
              .label{
                @include font_color('text-100');
                margin-top: 4px;
                font-weight: 550;
              }
            }
          }

          .section-2,
          .section-3,
          .section-4 {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 20px;
            margin-bottom: 10px;
          }

          .button-box {
            display: flex;
            justify-content: flex-end;
            .submit {
              @include background_color('bg-300');

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
}
</style>