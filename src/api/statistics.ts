import request from '@/utils/request.ts';


// 商品管理
export const getGoodsAPI = (page: number = 1) => {
    return request.get('/order/order/goods/feign/show', { params: { page } });
}