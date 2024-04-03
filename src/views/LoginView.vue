<script setup lang="ts">
let dark = false;

let modelBtn = () => {
    dark = !dark;
    if (dark){
        window.document.documentElement.setAttribute("data-theme", 'dark');
    }else {
        window.document.documentElement.setAttribute("data-theme", 'light');
    }
};
</script>

<template>
    <div id="DarkModePage">
        <div>
            <h1 class="title">SImon</h1>
            <div class="btn" @click="modelBtn">模式切换</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/common.scss";
#DarkModePage{
    @include background_color("background_color");
    @include font_color("font_color");
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 1s,color 0.6s;
    .title{
        margin-bottom: 20px;
    }
    .btn{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 40px;
        margin: 0;
    }
}
</style>