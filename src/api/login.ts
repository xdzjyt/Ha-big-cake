import request from '@/utils/request.ts';

export const postPhoneLogin = (data: object) => {
    return request.post('/auth/auth/sendCaptcha', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
} //发送电话号码并获取验证码

export const postCheckPhone = (data: object) => {
    return request.post('/auth/auth/checkCaptcha', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
} //验证电话号码和验证码

export const getIsLogin = () => {
    return request.get('/auth/auth/isLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
} //获取登录状态

export const postOutLogin = () => {
    return request.post('/auth/auth/outLine');
} //退出登录