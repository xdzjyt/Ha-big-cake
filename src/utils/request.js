import axios from 'axios';
import { useTokenStore } from '@/stores/tokenData.ts';
const baseURL = '';
const instance = axios.create({
    baseURL,
    timeout: 5000
});
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        const tokenstore = useTokenStore();

        if (tokenstore.token) {
            config.headers.Authorization = tokenstore.token;
            config.headers["ngrok-skip-browser-warning"] = 0;
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
);

//响应拦截器
instance.interceptors.response.use(
    (res) => {
        if (res.data.code === 1) {
            return res.data
        }
        else {
            ElMessage.error(res.data.msg);
            return Promise.reject(res.data);
        }
    },
    (err) => {
        return Promise.reject(err)
    }
);
export default instance;
