<script setup lang="ts">
import { useThemeStyleStore} from '@/stores/data';
import { ref } from 'vue';
// import axios from 'axios';
const { themeStyle } = useThemeStyleStore();
window.document.documentElement.setAttribute("data-theme", themeStyle.model);
let themeModelBtn = () => {
    themeStyle.btn_icon = (themeStyle.btn_icon == 'bxs-sun' ? 'bxs-moon' : 'bxs-sun');
    themeStyle.model = (themeStyle.model == 'light' ? 'dark' : 'light');
    if (themeStyle.model == 'dark') {
        window.document.documentElement.setAttribute("data-theme", "dark");
    } else {
        window.document.documentElement.setAttribute("data-theme", "light");
    }
};
// 主题色切换
let nav_menu_list = [
    { id: "1", title: "Home", icon: "bxs-home" },
    { id: "2", title: "Products", icon: "bxs-package" },
    { id: "3", title: "About", icon: "bxs-heart" },
    { id: "4", title: "service", icon: "bxs-user-circle" },
];
    const phone = ref('');
    const verificationCode = ref('');
    const countDown = ref(0);

    const sendVerificationCode = () => {
      if (!phone.value) {
        alert('请输入手机号');
        return;
      }
      // 模拟发送验证码
      else alert(`验证码已发送至${phone.value}`);
      // 开始倒计时
      countDown.value = 60;
      const timer = setInterval(() => {
        countDown.value--;
        if (countDown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    };

    const login = () => {
      if (!phone.value || !verificationCode.value) {
        alert('请输入手机号和验证码');
        return;
      }

    //   // 调用后端接口验证验证码
    //   axios.post('/api/login', {
    //     phone: phone.value,
    //     code: verificationCode.value
    //   }).then(response => {
    //     // 登录成功，处理逻辑
    //     alert('登录成功');
    //   }).catch(error => {
    //     // 登录失败，处理逻辑
    //     alert('登录失败');
    //   });
    // };

    
  }

</script>
<template>
    <div class="login-main">
        <header>
            <div class="logo">哈大饼</div>
            <nav>
                <ul class="menu">
                    <li v-for="value in nav_menu_list" :key="value.id">
                        <a href="#">
                            <i class="bx" :class="value.icon"></i>
                            <span>{{ value.title }}</span>
                        </a>
                    </li>
                </ul>
                <div class="btn"><i class='bx' :class="themeStyle.btn_icon" id="toggle" @click="themeModelBtn"></i>
                </div>
            </nav>
        </header>
        <main>
            <section class="home">
                <div class="home-content">
                    <h1>"哈大饼"<br>外卖配送</h1>
                    <p>美味外送<br>尽在指尖间<br>品尝哈大饼<br>畅享饕餮盛宴</p>
                </div>
            </section>
            <section class="form-Area">
                <div class="wrapper">
        <div class="form-box login">
            <form action="#">
                <div class="input-box">
                    <i class='bx bxs-phone-call'></i>
                    <input type="tel" required>
                    <label>请输入电话号码</label>
                </div>   
                <div class="input-box1">
                    <input type="text"  v-model="verificationCode" required>
                    <label>请输入验证码！</label>
                    <button style="width: 150px; height: 50px;background-color: #b58119;" @click="sendVerificationCode" :disabled="countDown > 0">{{ countDown > 0 ? `${countDown}秒后重新发送` : '发送验证码' }}</button>
                </div>    
                <button type="submit" class="btn"@click="login">登录</button>
            </form>
        </div>
    </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/common.scss';

.login-main {
    height: 100vh;
    @include background_color('bg-100');
    min-width: 400px;
    overflow: hidden;
    transition: all .5s ease-in;
}

header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 130px;
    padding: 0 5%;
    font-size: 18px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, .4);

    @include font_color('text-100');
    @include background_color('bg-300');
    transition: all .5s ease-in;


    .logo {
        margin-right: auto;
        font-size: 50px;
        font-weight: 600;
        user-select: none;
    }

    nav {
        display: flex;
        align-items: center;

        .menu {
            display: flex;
            align-items: center;

            li a {
                position: relative;
                @include font_color('text-200');
                font-size: 1.1rem;
                font-weight: 500;
                margin-left: 40px;

                span {
                    margin-left: 3px;
                }
            }

            li a::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -6px;
                width: 100%;
                height: 3px;
                background: #fff;
                border-radius: 5px;
                transform-origin: right;
                transform: scaleX(0);
                transition: transform .5s;
                font-size: 2em;
            }

            li a:hover::after {
                transform-origin: left;
                transform: scaleX(1);
            }
        }

        #toggle {
            border: 2px solid;
            @include border_color('text-100');
            box-shadow: 0 0 6px rgba(0, 0, 0, .9);
            border-radius: 50%;
            padding: 8px;
            font-size: 2rem;
            margin-left: 150px;
            cursor: pointer;
            transition: transform .2s ease;
            &:hover{
                transform: scale(1.1);
            }
            &:active{
                transform: scale(0.95);
            }
        }
    }

}

main {
    display: flex;
    height: 100%;

    .home {
        padding: 0 5%;
        @include font_color('text-200');
        text-align: center;
        width: 65%;
        position: relative;

        .home-content {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translateX(-40%);
            display: flex;

            h1 {
                text-align: end;
                white-space: nowrap;
                font-size: 4.5rem;
                font-weight: 600;
                border-right: 10px solid;
                @include border_color('text-100');
                padding-right: 8px;
                @include font_color('accent-100');
            }

            p {
                text-align: start;
                font-size: 1.1rem;
                font-weight: 400;
                line-height: 30px;
                letter-spacing: 3px;
                margin: auto 0;
                padding-left: 8px;
                @include font_color('text-200');
            }
        }
    }

    .form-Area {
        width: 35%;
        display: flex;
        justify-content: center;
        position: relative;
        align-items: center;
        padding-bottom: 10%;
    }
}
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
        .input-box1{
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
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
                width: 60%;
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
        #code{
            position: relative;
            width: 40%;
            height: 100%;
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