import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {
        path:'/',
        component:()=>import("@/views/LoginView.vue"),
    },
    {
        path:'/home',
        component:()=>import("@/views/HomeView.vue"),
    },
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;