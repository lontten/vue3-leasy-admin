import {createRouter, createWebHistory} from "vue-router";
import {baseConfig} from "../../config/config.ts";
import {routes} from "../../config/routes.ts";
import {isAuthenticated} from "../utils/login.ts";

const router = createRouter({
    // 我们在这里使用 history 模式。
    history: createWebHistory(baseConfig.baseUrl),
    routes, // `routes: routes` 的缩写
})


router.beforeEach(async (to, _from) => {
    if (
        // 检查用户是否已登录
        !isAuthenticated() &&
        // ❗️ 避免无限重定向
        (to.path !== '/login')
    ) {
        console.log("to login")
        // const {roles, routers} = initStore.getUserInfo()
        // if (routers) {
        //     return routers.includes(to.path)
        // }
        // if (roles) {
        //
        // }
        // 将用户重定向到登录页面
        return {path: '/login'}
    }
})


export default router;
