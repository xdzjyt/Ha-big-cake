<script setup lang="ts">
import { getOrderAPI, postDeleteOrderAPI, postAddOrderAPI, postUpdataOrderAPI } from "@/api/order";
import { useMenuStore } from "@/stores/menuData";
import { onMounted, ref, reactive } from "vue";
import OrderPanel from "@/components/OrderPanel.vue";
import { useOrderDataStore } from "@/stores/orderData";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { id } from "element-plus/es/locales.mjs";

const { title } = useMenuStore();
const { formInline, dynamicValidateForm } = useOrderDataStore();

// 查询量
const search_date = reactive({
  date: ["", ""],
  status: "",
});
//加载值
const loading = ref(false);

//每页数据展示量
const page_index = ref(1);
const total_page_number = ref(0);

//订单info

const order_info = ref([
  { label: "买家id", value: "--" },
  { label: "骑手id", value: "--" },
  { label: "商家id", value: "--" },
  { label: "总价", value: "---￥" },
  { label: "订单状态", value: "--" },
  { label: "配送时间", value: "--" },
  { label: "下单时间", value: "--" },
  { label: "送货地址", value: "--" },
  { label: "默认好评", value: "--" },
]);

// 表格数据
interface order {
  buyer: number
  courier: number
  deliveryTime: string
  merchant: number
  orderAppraise: string
  orderDetailResponses: orderItem[]
  orderStatus: number
  orderTime: string
  sendPlace: string
  totalAmount: number
}

interface orderItem {
  actualAmount: number
  goodsName: string
  goodsNumber: string
  originAmount: number
}

const orderList = ref<order[]>([]);
const tableData = ref<orderItem[]>([]);
const tableTitle = [
  { props: "name", label: "货品名称" },
  { props: "goodsCode", label: "货品编号" },
  { props: "number", label: "货品原价" },
  { props: "price", label: "货品折扣价" },
];

const clean = () => {
  tableData.value = [];
  page_index.value = 1;
  total_page_number.value = 0;
  order_info.value = [
    { label: "买家id", value: "--" },
    { label: "骑手id", value: "--" },
    { label: "商家id", value: "--" },
    { label: "总价", value: "---￥" },
    { label: "订单状态", value: "--" },
    { label: "下单时间", value: "--" },
    { label: "送货地址", value: "--" },
    { label: "订单id", value: "--" },
  ];
};
//新增销售单
const dialogVisible = ref(false);
const addorder = async () => {
  await postAddOrderAPI(
    {
      "buyer": 0,
      "courier": 0,
      "orderGoodsDetailRequests": [
        {
          "actualAmount": 0,
          "goodsName": "",
          "goodsNumber": "",
          "originAmount": 0
        }
      ],
      "orderStatus": 0,
      "sendPlace": "",
      "totalAmount": 0
    }
  ).then(() => {
    console.log("新增成功");
  });
};
const emitsGetvisible = (data: boolean) => {
  dialogVisible.value = data;
  getorder();
};

//条件查询销售单

const order_status = ["已接单", "已送达"];

const getOrderItem = () => {
  if (!orderList.value) {
    clean();
    return;
  }
  tableData.value = [];
  let order_item = orderList.value[page_index.value - 1];
  for (let i = 0; i < order_item.orderDetailResponses.length; ++i) {
    tableData.value[i] = { goodsName: "", goodsNumber: '0102', actualAmount: 0, originAmount: 0 };
    tableData.value[i] = order_item.orderDetailResponses[i];
  }
  order_info.value[0].value = order_item.buyer.toString();
  order_info.value[1].value = order_item.courier.toString();
  order_info.value[2].value = order_item.merchant.toString();
  order_info.value[3].value = order_item.totalAmount.toString() + "￥";
  order_info.value[4].value = order_status[order_item.orderStatus];
  order_info.value[5].value = order_item.deliveryTime ? order_item.deliveryTime.replace(/[T+]/g, ' | ') : '--';
  order_info.value[6].value = order_item.orderTime ? order_item.orderTime.replace(/[T+]/g, ' | ') : '--';
  order_info.value[7].value = order_item.sendPlace;
  order_info.value[8].value = order_item.orderAppraise;
};

const getorder = async () => {
  loading.value = true;
  const res = await getOrderAPI();
  console.log(res);
  const resData = res.data;
  total_page_number.value = resData.length;
  for (let i = 0; i < resData.length; ++i) {
    orderList.value[i] = resData[i];
  }
  getOrderItem();
  loading.value = false;
}; //获取所有数据

onMounted(() => {
  title.first = "订单管理";
  title.second = "";
  getorder();
});
//更新订单信息
const updateOrder = async () => {
  await postUpdataOrderAPI(
    {
      "id": 0,
      "orderStatus": 0
    }
  ).then((res) => {
    console.log(res);
  })
}
const search = async () => {
  //   clean();
  //   loading.value = true;
  //   search_date.date = !search_date.date ? ["", ""] : search_date.date;
  //   if (search_date.status == "") {
  //     const res = await orderGetService(search_date.date[0], search_date.date[1]);
  //     const resData = res.data.data;
  //     if (resData.length > 0) {
  //       total_page_number.value = resData.length;
  //       for (let i = 0; i < resData.length; ++i) {
  //         orderList.value[i] = resData[i];
  //       }
  //       getOrderItem();
  //     }
  //     loading.value = false;
  //     return;
  //   }
  //   const res = await orderGetService(
  //     search_date.date[0],
  //     search_date.date[1],
  //     parseInt(search_date.status)
  //   );
  //   const resData = res.data.data;
  //   if (resData.length > 0) {
  //     total_page_number.value = resData.length;
  //     for (let i = 0; i < resData.length; ++i) {
  //       orderList.value[i] = resData[i];
  //     }
  //     getOrderItem();
  //   }
  //   loading.value = false;
};



//分页按钮

const prev = () => {
  if (page_index.value > 1) {
    page_index.value--;
    getOrderItem();
  } else {
    ElMessage.warning("已到达最新订单！");
  }
};

const next = () => {
  if (page_index.value < total_page_number.value) {
    page_index.value++;
    getOrderItem();
  } else {
    ElMessage.warning("已到达最早订单！");
  }
};

const jumpTo = () => {
  if (page_index.value > total_page_number.value) {
    page_index.value = total_page_number.value;
    ElMessage.warning("操作溢出，已修正");
  }
  if (page_index.value < 1) {
    page_index.value = 1;
    ElMessage.warning("操作溢出，已修正");
  }
  getOrderItem();
};

//退货
const returnVisible = ref(false);
const refund = async () => {
  //   console.log(orderList.value[page_index.value - 1]);
  //   const res = await returnOrderpostService(
  //     orderList.value[page_index.value - 1]
  //   );
  //   returnVisible.value = false;
  //   getorder();
};

//审核
const checkVisible = ref(false);
const check = async () => {
  //   console.log(orderList.value[page_index.value - 1]);
  //   const res = await checkOrderpostService(
  //     orderList.value[page_index.value - 1]
  //   );
  //   checkVisible.value = false;
  //   getorder();
};
</script>

<template>
  <div class="common-layout home-section">
    <el-scrollbar>
      <el-container style="display: flex; justify-content: space-between">
        <el-main>
          <section class="button-box page">
            <div class="button" @click="prev">上一页</div>
            <div class="button" @click="next">下一页</div>
            <div class="wrapper">
              <span>当前页面：</span><input class="page-index" type="number" @blur="jumpTo" v-model="page_index" />
              <div class="total-data">共有{{ total_page_number }}单</div>
            </div>
          </section>
          <section class="button-box">
            <div class="button cash" @click="addorder">新增订单</div>
            <div class="button delete" @click="">删除订单</div>
            <div class="button delete" @click="updateOrder">更新订单状态</div>
            <el-input style="width: 100px" placeholder="订单id" clearable />
             <el-input style="width: 240px" placeholder="更新状态1(已接单)/2(已送达)" clearable />
          </section>
          <section class="order-box">
            <div class="info-wrapper">
              <h3>订单详细信息</h3>
              <div class="info-box">
                <div class="info" v-for="item in order_info">
                  <span>{{ item.label }}</span>
                  <div class="data">{{ item.value }}</div>
                </div>
              </div>
            </div>
            <div class="data">
              <h3>订单商品列表</h3>
              <el-table ref="multipleTableRef" :data="tableData" table-layout="auto" v-loading="loading"
                class="table-box">
                <el-table-column v-for="item in tableTitle" :prop="item.props" :label="item.label" align="center" />
              </el-table>
            </div>
          </section>
          <el-dialog v-model="dialogVisible" width="600" draggable>
            <OrderPanel title="销售单结账进行中" @getvisible="emitsGetvisible" />
          </el-dialog>
          <el-dialog v-model="returnVisible" width="350">
            <div class="title">
              <h3>退回订单</h3>
            </div>
            <div class="warning-box">
              <div class="content">您确定要进行退货操作吗</div>
              <div class="button-box">
                <div class="button" @click="refund">确认</div>
                <div class="button" @click="returnVisible = false">取消</div>
              </div>
            </div>
          </el-dialog>
          <el-dialog v-model="checkVisible" width="350">
            <div class="title">
              <h3>审核订单</h3>
            </div>
            <div class="warning-box">
              <div class="content">订单是否核对正确</div>
              <div class="button-box">
                <div class="button" @click="check">确认审核</div>
                <div class="button" @click="checkVisible = false">取消</div>
              </div>
            </div>
          </el-dialog>
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

  .el-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 30px;
    gap: 20px;

    .button {
      user-select: none;
      min-width: 100px;
      padding: 0 10px;
      height: 35px;
      outline: none;
      border: none;
      @include background_color("bg-300");
      color: white;
      font-size: 16px;
      border-radius: 5px;
      transition: all 0.3s ease;
      box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
      text-align: center;
      line-height: 35px;

      &.cash {
        @include background_color("primary-200");
      }

      &.delete {
        background-color: rgb(241, 66, 66) !important;
      }

      &:hover {
        scale: 1.03;
        opacity: 0.8;
      }

      &:active {
        scale: 0.98;
      }
    }

    .button-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      gap: 80px;
      padding: 20px 8%;

      &.page {
        border-bottom: 5px solid;
        @include border_color('accent-100');
        box-shadow: 0 5px 5px rgba(49, 61, 68, .4);
        margin-bottom: 50px;


        .wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: inset 0 0 10px rgba(49, 61, 68, 0.8);
          border-radius: 12px;
          padding: 20px;

          span {
            @include font_color("text-100");
            font-weight: 600;
            white-space: nowrap;
          }

          .total-data {
            box-shadow: 0 0 10px rgba(49, 61, 68, 0.8);
            padding: 8px 10px;
            border-radius: 12px;
            @include background_color("primary-300");
            white-space: nowrap;
            color: white;
            user-select: none;
          }

          .page-index {
            width: 60px;
            padding: 0 10px;
            height: 35px;
            outline: none;
            border: none;
            @include background_color("accent-200");
            color: white;
            font-size: 16px;
            border-radius: 5px;
            transition: all 0.3s ease;
            margin-right: 80px;
            box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
            text-align: center;
            line-height: 35px;
          }
        }
      }
    }

    .order-box {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      padding: 30px 50px 60px 30px;


      .info-wrapper {
        border: 2px solid;
        @include border_color('text-100');
        padding: 20px;
        border-radius: 12px;
        box-shadow: 10px 10px 10px rgba(49, 61, 68, .4);
        @include background_color('bg-200');
        transition: all .3s ease;
        margin-bottom: 60px;

        &:hover {
          box-shadow: inset 0 0 10px rgba(49, 61, 68, .6);
          scale: 1.01;
        }

        h3 {
          @include font_color('text-100');
          margin-bottom: 20px;
          padding: 10px 8px;
          border-left: 10px solid;
          @include border_color('accent-200');
        }

        .info-box {
          font-size: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 40px;

          .info {
            display: flex;
            align-items: center;
            @include font_color("text-100");

            span {
              white-space: nowrap;
              user-select: none;
            }

            .data {
              box-shadow: 10px 10px 10px rgba(49, 61, 68, 0.4);
              margin-left: 8px;
              @include background_color("bg-300");
              padding: 5px 12px;
              border-radius: 12px;
              min-width: 100px;
              text-align: center;
            }
          }
        }
      }

      .data {
        width: 100%;
        height: 100%;

        h3 {
          @include font_color('text-100');
          margin-bottom: 20px;
          padding: 10px 8px;
          border-left: 10px solid;
          @include border_color('accent-200');
        }

        .table-box {
          position: relative;
          box-shadow: -2px -2px 5px rgba(49, 61, 68, 0.5);
          border-top: 6px solid;
          @include border_color("accent-200");

          .warning-box {
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: space-between;
            padding: 10px;

            .content {
              font-size: 20px;
              font-weight: 500;
              text-align: center;
            }

            .button-box {
              display: flex;
              justify-content: space-between;
            }
          }

          .page-box {
            margin-top: 25px;
            padding: 0 10px 5px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include font_color("text-100");

            .data-select span {
              margin-right: 5px;
            }

            .wrapper {
              display: flex;
              align-items: center;

              .total-data {
                margin-right: 15px;
                font-size: 16px;

                span {
                  @include font_color("text-100");
                }
              }
            }
          }
        }
      }
    }

    .title {
      padding: 8px 10px;
      border-left: 4px solid;
      @include border_color("accent-200");
    }

    .warning-box {
      padding: 30px 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;

      .content {
        font-size: 20px;
        @include font_color("primary-200");
      }

      .button-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .el-footer {
    padding: 0 !important;

    .copyright {
      height: 80px;
      width: 100%;
      @include background_color("bg-300");
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      box-shadow: 0 -5px 10px rgba(49, 61, 68, 0.6);
    }

    .more {
      padding-top: 60px;
      @include font_color("text-200");
      font-size: 25px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>