import request from '@/utils/request.ts';

// 商品管理
export const getGoodsAPI = (page: number = 1) => {
    return request.get('/order/order/goods/feign/show', { params: { page } });
}//分页查询商品

export const postDeleteGoodsAPI = (data: object) => {
    return request.post('/order/order/goods/feign/delete', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}// 根据商品编号删除商品

export const postAddGoodsAPI = (data: object) => {
    return request.post('/order/order/goods/feign/add', data);
}// 添加商品

export const postUpdataGoodsAPI = (data: object) => {
    return request.post('/order/order/goods/feign/update', data);
}// 修改商品