import { createRouter,createWebHistory } from "vue-router";
import forget from "@/pages/forget.vue";
import LoginView from "@/pages/LoginView.vue";
import phone from "@/pages/phone.vue";
const router = createRouter({
    history:createWebHistory(),
    routes :[
        {
            path:'/',
            component: LoginView
        },
        {
            path:'/home',
            component:()=>import("@/pages/HomeView.vue")
        },
        {
            path :'/forget',
            component :forget
        },
        {
            path :'/phone',
            component :phone
        }
    ],
});

export default router;