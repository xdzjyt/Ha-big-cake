<script setup lang="ts">
import { onMounted } from 'vue';
let show_num: [];
let value: '';
onMounted(() => {
    show_num = []
    draw(show_num)
}
);
function sublim() {
    var num = show_num.join("");
    if (!value) return alert('请输入验证码！');
    if (value == num) {
        alert('提交成功！');
        dj()
    } else {
        alert('验证码错误！\n你输入的是:  ' + value + "\n正确的是:  " + num + '\n请重新输入！');
        dj()
    }
}
function charList(length: any, code: any) {
    // fromCharCode: 将Unicode编码转为一个字符:
    // charCodeAt: 获得自负unicode编码;
    return new Array(length)
        .fill(null)
        .map((c,i) => String.fromCharCode(code.charCodeAt() + i));  // 获取’a’的charCode: "a".charCodeAt(0)=97
}
// 获得图形验证码集合
function getCode() {
    // 生成26个小写字母集合
    const lowercaseAlphabet = charList(26, 'a') || [];

    // 生成26个大写字母集合
    const uppercaseAlphabet = charList(26, 'A') || [];

    // 生成0-9数字集合
    const numsZeroToNine = new Array(10).fill(null).map((v, i) => i)

    return [...lowercaseAlphabet, ...uppercaseAlphabet, ...numsZeroToNine]
}
function draw(show_num: any, codeLength = 4) { // codeLength: 设置验证码长度
    let canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    let context = canvas!.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    let canvas_width = canvas!.width;
    let canvas_height = canvas!.height;
    
    context.clearRect(0, 0, canvas_width, canvas_height);

    var aCode = getCode(); // 验证码所有字符数组
    var aLength = aCode.length;//获取到数组的长度

    // 绘制codeLength个随机图形
    for (var i = 0; i <= (codeLength - 1); i++) {
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
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
function dj() {
    value = ''
    draw(show_num);
}
</script>

<template>
    <div class="wrapper">
        <div class="form-box login">
            <h2>重置密码</h2>
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
                </div>
                <div class="input-box">
                    <i class='bx bxs-lock-alt'></i>
                    <input type="password" required>
                    <label>确认新密码</label>
                </div>
                <div class="input-box code">
                    <input type="text" required>
                    <input type="text" v-model="value"  required>
                        <canvas id="canvas" width="100" height="43" @click="dj" style="border: 2px solid #ccc"></canvas>
                    <label>验证码</label>
                </div>
                <button type="submit" class="btn" @click="sublim">重置密码</button>
                <div class="returnLogin">
                    <p>已找回密码?<RouterLink class="login-link" to="/">去登陆</RouterLink></p>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">

.wrapper {
    position: relative;
    width: 400px;
    height: 520px;
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

            i {
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
            &.code {
                display: flex;
                position: relative;

                #code-btn {
                    outline: none;
                    background-color: transparent;
                    border: none;
                    user-select: none;
                    cursor: pointer;
                }
            }
        }

        .btn {
            width: 100%;
            height: 45px;
            border: none;
            outline: none;
            @include background_color('accent-100');
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

        .returnLogin {
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