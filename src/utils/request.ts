import axios from 'axios';
// 创建axios对象
const instance = axios.create({
    baseURL:'http://116.196.99.29:8081/doc.html',
    timeout: 10000,
    headers: {
        Authorization: 'Bearer ${token}' 
    }
});
// 请求拦截器 ==> 前端给后端的数据（还没到后端响应）
instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
})
// 响应拦截器 ==> 后端给前端的数据（已经到了前端响应）
instance.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
})
// 导出axios对象
export default instance;