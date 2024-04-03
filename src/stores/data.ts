import { reactive } from "vue";
import { defineStore } from "pinia";


export const datastore = defineStore('tomato-data',()=>{
    const data = reactive({
        
    });

    return {
        data,
    }
},{
    persist:false,
});