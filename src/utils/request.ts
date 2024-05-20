import axios from 'axios';
import { useTokenStore } from '@/stores/tokenData.ts';
const baseURL = 'http://116.196.99.29:8081';
const instance = axios.create({
    baseURL,
    timeout: 5000
});
//请求拦截器
instance.interceptors.request.use(
    (config) => {
        const tokenstore = useTokenStore();

        if (tokenstore.token) {
            config.headers['satoken'] = tokenstore.token;
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
);

//响应拦截器
instance.interceptors.response.use(res => res.data,
    err => Promise.reject(err)
);
export default instance;

// ⠀⠰⢷⢿⠄ 
// ⠀⠀⠀⠀⠀⣼⣷⣄ 
// ⠀⠀⣤⣿⣇⣿⣿⣧⣿⡄ 
// ⢴⠾⠋⠀⠀⠻⣿⣷⣿⣿⡀ 
// ○ ⠀⢀⣿⣿⡿⢿⠈⣿ 
// ⠀⠀⠀⢠⣿⡿⠁⠀⡊⠀⠙ 
// ⠀⠀⠀⢿⣿⠀⠀⠹⣿ 
// ⠀⠀⠀⠀⠹⣷⡀⠀⣿⡄ 
// ⠀⠀⠀⠀⣀⣼⣿⠀⢈⣧.
