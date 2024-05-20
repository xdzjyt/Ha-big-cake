import request from '@/utils/request.ts';

// 订单管理
export const getOrderAPI = (page: number = 1) => {
    return request.get('/order/order/feign/show', { params: { page } });
}//分页查询订单

export const postDeleteOrderAPI = (data: object) => {
    return request.post('/order/order/feign/delete', data,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}//删除订单

export const postAddOrderAPI = (data: object) => {
    return request.post('/order/order/feign/add', data);
}//添加订单

export const postUpdataOrderAPI = (data: object) => {
    return request.post('/order/order/feign/update', data);
}//修改订单