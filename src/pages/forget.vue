<script setup lang="ts">
import { useThemeStyleStore} from '@/stores/data';
import {onMounted} from 'vue'
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
let show_num: []
let value :''
 onMounted(()=>
    {  show_num=[]
      draw(show_num)
    }
  )
    function  sublim() {
          var num = show_num.join("");
          if(!value) return alert('请输入验证码！');
          if(value == num){
              alert('提交成功！');
              dj()
          }else{
              alert('验证码错误！\n你输入的是:  '+value+"\n正确的是:  "+num+'\n请重新输入!');
              dj()
          }
      }
    function  charList(length:any, code :any) {
          // fromCharCode: 将Unicode编码转为一个字符:
          // charCodeAt: 获得自负unicode编码;
          return new Array(length)
              .fill(null)
              .map((i) => String.fromCharCode(code.charCodeAt() + i));  // 获取’a’的charCode: "a".charCodeAt(0)=97
      }
      // 获得图形验证码集合
    function getCode() {
          // 生成26个小写字母集合
          const lowercaseAlphabet = charList(26, 'a')||[];

          // 生成26个大写字母集合
          const uppercaseAlphabet = charList(26, 'A')||[];
          
          // 生成0-9数字集合
          const numsZeroToNine = new Array(10).fill(null).map((v, i) => i)

          return [...lowercaseAlphabet, ...uppercaseAlphabet, ...numsZeroToNine]
      }
    function draw(show_num :any, codeLength=4) { // codeLength: 设置验证码长度
          let canvas = document.getElementById("canvas");//获取到canvas的对象，演员
          let context = canvas!.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
          let canvas_width=canvas!.width;
          let canvas_height=canvas!.height;
          context.clearRect(0,0, canvas_width, canvas_height);

          var aCode = getCode(); // 验证码所有字符数组
          var aLength = aCode.length;//获取到数组的长度

          // 绘制codeLength个随机图形
          for (var i = 0; i <= (codeLength-1); i++) {
              var j = Math.floor(Math.random() * aLength);//获取到随机的索引值 Math.floor(Math.random()*(max-min+1)+min);
              var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
              var txt = aCode[j];//得到随机的一个内容
              show_num[i] = txt;
              var x = 10 + i * 20;//文字在canvas上的x坐标
              var y = 20 + Math.random() * 8;//文字在canvas上的y坐标（20+0到8的随机数）
              context.font = "bold 23px 微软雅黑";

              context.translate(x, y);
              context.rotate(deg); // 旋转一个角度

              context.fillStyle = randomColor(); // 随机生成一个颜色
              context.fillText(txt, 0, 0);

              context.rotate(-deg);
              context.translate(-x, -y);
          }
          for (var i = 0; i <= 5; i++) { //验证码上显示线条
              context.strokeStyle = randomColor();
              context.beginPath();
              context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
              context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
              context.stroke();
          }
          for (var i = 0; i <= 30; i++) { //验证码上显示小点
              context.strokeStyle = randomColor();
              context.beginPath();
              var x = Math.random() * canvas_width;
              var y = Math.random() * canvas_height;
              context.moveTo(x, y);
              context.lineTo(x + 1, y + 1);
              context.stroke();
          }
      }
      // 随机颜色
    function  randomColor() {
          var r = Math.floor(Math.random() * 256);
          var g = Math.floor(Math.random() * 256);
          var b = Math.floor(Math.random() * 256);
          return "rgb(" + r + "," + g + "," + b + ")";
      }
    function  dj() {
          value=''
          draw(show_num);   
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
                    <i class='bx bxs-envelope'></i>
                    <input type="email" required>
                    <label>申诉邮箱</label>
                </div>
                <div class="input-box">
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required>
                    <label>新密码</label>
                </div><div class="input-box">
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required>
                    <label>确认新密码</label>
                </div>
                <div class="input-box1">
                    <input type="text" required>
                    <input type="button" id="code1" onclick="change" >
                    <canvas id="canvas" width="100" height="43" @click="dj" style="border: 1px solid #ccc"></canvas>
                    <label>验证码</label>
                </div>
                <button type="submit" class="btn" @click="sublim">重置密码</button>
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