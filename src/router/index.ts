import { createRouter,createWebHistory } from "vue-router";
import LoginView from "@/pages/LoginView.vue";
import LoginAndRegister from "@/components/LoginAndRegister.vue";
import Forget from "@/components/Forget.vue";
import PhoneVerify from "@/components/PhoneVerify.vue";
const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:'/',
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
            path:'/home',
            component:()=>import("@/pages/HomeView.vue"),
            children:[
                {
                    path:'',
                    component:()=>import("@/pages/Layout/数据首页.vue"),
                },
                {
                    path:'b',
                    component:()=>import("@/pages/Layout/商品.vue"),
                },
                {
                    path:'c',
                    component:()=>import("@/pages/Layout/订单.vue"),
                },
                {
                    path:'d',
                    component:()=>import("@/pages/Layout/员工.vue"),
                },
            ]
        },
    ],
});

export default router;