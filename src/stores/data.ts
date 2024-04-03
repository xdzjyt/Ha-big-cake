import { reactive } from "vue";
import { defineStore } from "pinia";


export const useThemeStyleStore = defineStore('theme',()=>{
    const light_style = reactive({
    });
    const dark_style = reactive({
        
    });

    return {
        light_style,
        dark_style,
    }
},{
    persist:false,// 是否选择持续化存储
});