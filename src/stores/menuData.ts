import { reactive,ref } from "vue";
import { defineStore } from "pinia";


export const useMenuStore = defineStore('menu',()=>{
    const title = reactive({
        'first':'首页',
        'second':'',
    });

    const asideList_id = ref(['active','','','','','','']);
    const active_flag = reactive({
        value: '',
    })

    return {
        title,
        asideList_id,
        active_flag,
    }
},{
    persist:true,// 是否选择持续化存储
});