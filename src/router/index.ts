import { createRouter,createWebHistory } from "vue-router";
import LoginView from "@/pages/LoginView.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
import Forget from "@/components/Forget.vue";
import PhoneVerify from "@/components/PhoneVerify.vue";
const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:'/login',
            component: LoginView,
            children:[
                {
                    path:'',
                    component: LoginAndRegister,
                },
                {
                    path:'forget',//不要加斜杠
                    component: Forget,
                },
                {
                    path:'phone',//不要加斜杠
                    component: PhoneVerify,
                },
            ],
        },
        {
            path:'/',
            component:()=>import("@/pages/HomeView.vue"),
            children:[
                {
                    path:'',
                    component:()=>import("@/pages/Layout/HomeStatistics.vue"),
                },
                {
                    path:'ware',
                    component:()=>import("@/pages/Layout/WareManage.vue"),
                },
                {
                    path:'goods',
                    component:()=>import("@/pages/Layout/GoodsManage.vue"),
                },
                {
                    path:'order',
                    component:()=>import("@/pages/Layout/OrderManage.vue"),
                },
                {
                    path:'employee',
                    component:()=>import("@/pages/Layout/EmployeeManage.vue"),
                },
                {
                    path:'finance',
                    component:()=>import("@/pages/Layout/FinanceManage.vue"),
                },
            ]
        },
    ],
});

export default router;