import {useSysInitStore} from "../stores/sysInitStore.ts";
import router from "../config/routes.ts";

export const TOKEN_NAME = "p031-admin-leasy"
export const isAuthenticated = () => {
    let initStore = useSysInitStore();
    return initStore.isLogin()

}


export const removeToken = () => {
    let initStore = useSysInitStore();
    initStore.token = ''
    router.push('/login').then()
}
