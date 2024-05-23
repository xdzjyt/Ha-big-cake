import { ref, reactive } from "vue"
import { defineStore } from "pinia"

interface DomainItem {
  actualAmount: number
  goodsName: string
  goodsNumber: string
  originAmount: number
}

export const useOrderDataStore = defineStore('order', () => {
  const formInline = ref<{
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
    buyer: 0,
    courier: 0,
    deliveryTime: '2024-01-01',
    merchant: 0,
    orderAppraise: 'very good!',
    orderDetailResponses: [],
    orderStatus: 0,
    orderTime: '2024-01-01',
    sendPlace: 'weihai',
    totalAmount: 125
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