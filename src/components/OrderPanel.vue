<script setup lang="ts">
import { ref, reactive } from "vue";
import { type FormInstance } from "element-plus";
import { useOrderDataStore } from "@/stores/orderData";
import { useDataStore } from "@/stores/orderData";
import { postAddOrderAPI } from "@/api/order";
import { ElMessage } from "element-plus";

const { formInline, dynamicValidateForm } = useOrderDataStore();
const dataStore = useDataStore();
const orderId = ref("");

const formRef = ref<FormInstance>(); //获取表单dom
function debounce(func, delay) {
  let timerId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

interface DomainItem {
  actualAmount: number
  goodsName: string
  goodsNumber: string
  originAmount: number
}

interface postItem {
  buyer: number
  courier: number
  orderGoodsDetailRequests: DomainItem[]
  orderStatus: number
  sendPlace: string
  totalAmount: number
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {

  dynamicValidateForm.domains.push({
    key: Date.now(),
    actualAmount: 0,
    goodsName: '',
    goodsNumber: '',
    originAmount: 0,
  });
};

const emits = defineEmits(["getvisible"]);

const submitForm = async (formEl: FormInstance | undefined) => {
  if (dynamicValidateForm.domains.length < 1) {
    ElMessage.warning("没有任何商品呢");
    return;
  }
  formInline.orderDetailResponses = dynamicValidateForm.domains;
  formInline.orderStatus = parseInt(formInline.orderStatus.toString());
  const postData:postItem = {};
  postData.buyer = formInline.buyer;
  postData.courier = formInline.courier;
  postData.orderStatus = formInline.orderStatus;
  postData.totalAmount = formInline.totalAmount;
  postData.sendPlace = formInline.sendPlace;
  postData.orderGoodsDetailRequests = formInline.orderDetailResponses;
  
  await postAddOrderAPI(postData).then((res) => {
    ElMessage.success('新增成功！');
    orderId.value = res.data.orderId;
    dataStore.setData(orderId.value);
  }).catch(() => {
    ElMessage.error('新增失败！');
  });
  emits("getvisible", false);
};

// 使用 debounce 函数创建一个防抖版本的 submit 函数
const debouncedSubmit = debounce(submitForm, 1000); // 设置延迟时间为 5000秒

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="background">
    <div class="title">
      <h3>{{ props.title }}</h3>
    </div>
    <el-form :model="formInline" label-width="auto" style="max-width: 600px" label-position="right" class="info-form">
      <section>
        <el-form-item label="买家id" prop="buyer">
          <el-input-number v-model="formInline.buyer" placeholder="请输入买家id" clearable />
        </el-form-item>
        <el-form-item label="骑手id" prop="courier">
          <el-input-number v-model="formInline.courier" placeholder="请输入骑手id" clearable />
        </el-form-item>
      </section>
      <section>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-select v-model="formInline.orderStatus" placeholder="请选择" clearable style="width: 120px;">
            <el-option label="已结单" value=1 />
            <el-option label="已送达" value=2 />
          </el-select>
        </el-form-item>
      </section>
      <section>
        <el-form-item label="送达地点" prop="sendPlace">
          <el-input v-model="formInline.sendPlace" placeholder="请输入送达地点" clearable />
        </el-form-item>
        <el-form-item label="总金额" prop="totalAmount">
          <el-input-number v-model="formInline.totalAmount" placeholder="请输入总金额" clearable />
        </el-form-item>
      </section>
    </el-form>
    <el-form ref="formRef" style="max-width: 600px" :model="dynamicValidateForm" label-width="auto"
      class="demo-dynamic">
      <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'商品' + (index + 1)"
        :prop="'domains.' + index + '.value'" class="wareItem">
        <section>
          <span>商品编号</span><el-input v-model="domain.goodsNumber" style="width: 120px" />
          <span>商品名称</span><el-input v-model="domain.goodsName" style="width: 90px" />
        </section>
        <section>
          <span>折扣价格</span><el-input-number v-model="domain.actualAmount" :min="1" :max="1000" style="width: 90px"
            size="small" />
          <span>初始价格</span><el-input-number v-model="domain.originAmount" :min="1" :max="1000" style="width: 90px"
            size="small" />
          <el-button @click.prevent="removeDomain(domain)"
            style="border-radius: 50%; padding: 8px; margin-left: 15px"><i class="bx bx-x"></i></el-button>
        </section>
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <div class="button submit" @click="debouncedSubmit()">
            收银结账
          </div>
          <div class="button" @click="addDomain">新增商品项</div>
          <div class="button" @click="resetForm(formRef)">撤销所有商品记录</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.background {
  padding: 30px;

  .title {
    border-left: 4px solid;
    @include border_color("accent-200");
    padding: 5px 10px;
    margin-bottom: 5px;
    @include font_color("primary-100");
  }

  span {
    margin-right: 12px;
    @include font_color("accent-200");
    font-weight: 600;
    font-size: 16px;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
  }

  .info-form {
    padding: 10px 5px;
    margin-bottom: 25px;
    border-bottom: 5px solid;
    @include border_color("primary-300");
  }

  .el-form-item.wareItem {
    padding: 10px 5px;
    margin-bottom: 25px;
    border-bottom: 3px solid;
    @include border_color("primary-300");

    .el-input {
      margin-right: 20px;
    }
  }

  .button-box {
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button {
      min-width: 120px;
      padding: 0 10px;
      height: 35px;
      outline: none;
      border: none;
      @include background_color("bg-300");
      color: white;
      font-size: 16px;
      border-radius: 5px;
      transition: all 0.3s ease;
      margin-right: 80px;
      box-shadow: 0 0 4px rgba(49, 61, 68, 0.5);
      text-align: center;
      line-height: 35px;

      &.submit {
        @include background_color("primary-300");
      }

      &:hover {
        scale: 1.03;
        opacity: 0.8;
      }

      &:active {
        scale: 0.98;
      }
    }
  }
}
</style>