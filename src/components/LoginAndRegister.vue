<script setup lang="ts">
import { ref } from 'vue';

let isactive = ref(false);
const registerLink = () => {
    isactive.value = !isactive.value;
};
</script>

<template>
    <div class="wrapper" :class="{ 'active': isactive }">
        <div class="form-box login">
            <h2>登录</h2>
            <form action="#">

                <div class="input-box">
                    <i class='bx bxs-envelope'></i>
                    <input type="email" required>
                    <label>邮箱</label>
                </div>
                <div class="input-box">
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required>
                    <label>密码</label>
                </div>

                <div class="remember-forgot">
                    <label><input type="checkbox">记住密码</label>
                    <a href="#">忘记密码</a>
                </div>
                <button type="submit" class="btn">登录</button>
                <div class="login-register">
                    <p>还没有账号？<a href="#" class="register" @click="registerLink">去注册</a></p>
                </div>
            </form>
        </div>

        <div class="form-box register">
            <h2>注册</h2>
            <form action="#">

                <div class="input-box">
                    <i class='bx bxs-user'></i>
                    <input type="text" required>
                    <label>用户民</label>
                </div>
                <div class="input-box">
                    <i class='bx bxs-envelope'></i>
                    <input type="email" required>
                    <label>邮箱</label>
                </div>
                <div class="input-box">
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required>
                    <label>密码</label>
                </div>

                <div class="remember-forgot">
                    <label><input type="checkbox">同意相关条款</label>
                </div>
                <button type="submit" class="btn">注册</button>
                <div class="login-register">
                    <p>已经拥有账户?<a href="#" class="login-link" @click="registerLink">去登陆</a></p>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/scss/common.scss';

.wrapper {
    position: relative;
    width: 400px;
    height: 440px;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    display: flex;
    transition: transform .5s ease, height .2s ease;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    &.active {
        height: 520px;

        .form-box {
            &.login {
                transition: none;
                transform: translateX(-400px);
            }

            &.register {
                transition: transform .18s ease;
                transform: translateX(0);
            }
        }
    }

    .form-box {
        width: 100%;
        padding: 40px;

        &.login {
            transition: transform .18s ease;
            transform: translateX(0);
        }

        &.register {
            position: absolute;
            transition: none;
            transform: translateX(400px);
        }

        h2 {
            font-size: 2em;
            @include font_color('text-100');
            text-align: center;
        }

        .input-box {
            position: relative;
            width: 100%;
            height: 50px;
            border-bottom: 2px solid;
            @include border_color('text-100');
            margin: 30px 0;
            i{
                @include font_color('text-200');
            }

            label {
                position: absolute;
                top: 50%;
                left: 5px;
                transform: translateY(-50%);
                font-size: 1.1em;
                pointer-events: none;
                font-weight: 600;
                transition: all .5s;
                @include font_color('text-200');
            }

            input {
                width: 100%;
                height: 100%;
                background: transparent;
                border: none;
                outline: none;
                @include font_color('text-100');
                font-weight: 600;
                padding: 0 35px 0 5px;

                &:focus~label,
                &:valid~label {
                    top: -5px;
                }
            }

            i {
                position: absolute;
                right: 8px;
                font-size: 1.2em;
                line-height: 57px;
            }
        }

        .remember-forgot {
            font-size: .9em;
            @include font_color('text-100');
            font-weight: 500;
            display: flex;
            margin: -15px 0 15px;
            justify-content: space-between;
            align-items: center;

            label input {
                @include accent-color('text-100');
                margin-right: 3px;
            }

            a {
                @include font_color('text-100');
                font-weight: 600;
                transition: all .5s;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .btn {
            width: 100%;
            height: 45px;
            border: none;
            outline: none;
            @include background_color('primary-300');
            border-radius: 6px;
            cursor: pointer;
            color: #fff;
            font-weight: 500;
            font-size: 1.1em;
            transition: .2s;

            &:hover {
                scale: 1.03;
            }

            &:active {
                scale: 0.99;
            }
        }

        .login-register {
            font-size: .9em;
            @include font_color('text-100');
            text-align: center;
            font-weight: 500;
            margin: 25px 0 10px;

            p a {
                @include font_color('text-100');
                font-weight: 600;
                margin-left: 5px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>