import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/style/reset.scss'
import '@/assets/style/emp/iconfont.css'
import { useTokenStore } from './stores/tokenData'

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(pinia);
app.use(ElementPlus)
const token = useTokenStore();

// 全局前置路由守卫 
router.beforeEach((to, from, next) => {
    // 判断是否为存在的路径 不是则回到主页路由
    let check = router.getRoutes().filter((item) => {
        return item.path == to.path
    }).length
    if (!check) {
        next('/')
    }

    // 已登录
    if (token.token) {
        // 不能再跳转到login
        if (to.fullPath == '/login'|| to.path == '/login/forget' || to.path == '/login/phone') {
            next(from.path)
        } else {
            next()
        }
    } else { // 未登录
        if (to.path != '/login' && to.path != '/login/forget' && to.path != '/login/phone') {
            // 不能访问登录页以外的页面
            next('/login')
        } else {
            next()
        }
    }
})

app.mount('#app');

