import { reactive } from "vue";
import { defineStore } from "pinia";


export const datastore = defineStore('data',()=>{
    const data = reactive({
        
    });

    return {
        data,
    }
},{
    persist:false,// 是否选择持续化存储
});