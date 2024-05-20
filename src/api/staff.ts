import request from '@/utils/request.ts';

// 职工管理
export const getStaffAPI = (page: number = 1) => {
    return request.get('/order/order/staff/feign/query', { params: { page } });
}//分页查询职工信息

export const postDeleteStaffAPI = (data: object) => {
    return request.post('/order/order/staff/feign/delete', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}//删除职工

export const postAddStaffAPI = (data: object) => {
    return request.post('/order/order/staff/feign/add', data);
}//添加职工

export const postUpdataStaffAPI = (data: object) => {
    return request.post('/order/order/staff/feign/update', data);
}//修改职工