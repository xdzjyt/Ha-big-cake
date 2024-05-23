import { ref, reactive } from "vue"
import { defineStore } from "pinia"
import { number } from "echarts"

interface DomainItem {
  actualAmount: number
  goodsName: string
  goodsNumber: string
  originAmount: number
}

export const useOrderDataStore = defineStore('order', () => {
  const formInline = ref<{
    orderId: number
    buyer: number
    courier: number
    deliveryTime: string
    merchant: number
    orderAppraise: string
    orderDetailResponses: DomainItem[]
    orderStatus: number
    orderTime: string
    sendPlace: string
    totalAmount: number
  }>({
    orderId: 1,
    buyer: 0,
    courier: 0,
    deliveryTime: '2024-01-01',
    merchant: 0,
    orderAppraise: 'very good!',
    orderDetailResponses: [],
    orderStatus: 1,
    orderTime: '2024-01-01',
    sendPlace: '',
    totalAmount: 0
  });
  const dynamicValidateForm = reactive<{
    domains: DomainItem[]
  }>({
    domains: [
      {
        actualAmount: 35,
        goodsName: '乐乐',
        goodsNumber: '0102',
        originAmount: 40,
      },
    ],
  });
  
  return {
    formInline,
    dynamicValidateForm
  }
})
export const useDataStore = defineStore('data', {
  state: () => ({
    data: 0
  }),
  actions: {
    setData(newData :any) {
      this.data = newData;
    }
  }
});