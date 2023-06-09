import {createRouter, createWebHistory} from "vue-router";
import {baseConfig} from "../../config/config.ts";
import {routes} from "../../config/routes.ts";
import {useSysInitStore} from "../stores/sysInitStore.ts";

const router = createRouter({
    // 我们在这里使用 history 模式。
    history: createWebHistory(baseConfig.baseUrl),
    routes, // `routes: routes` 的缩写
})

router.beforeEach(async (to, _from) => {
    let initStore = useSysInitStore();
    if (
        // 检查用户是否已登录
        initStore.isLogin() &&
        // ❗️ 避免无限重定向
        (to.path !== '/login')
    ) {
        const {roles, routers} = initStore.getUserInfo()
        if (routers) {
            return routers.includes(to.path)
        }
        if (roles) {

        }

        // 将用户重定向到登录页面
        return {path: '/login'}
    }
})


export default router;
