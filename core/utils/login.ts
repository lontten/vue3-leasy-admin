import {useSysInitStore} from "../stores/sysInitStore.ts";

export const isAuthenticated = () => {
    let initStore = useSysInitStore();
    return !initStore.isLogin()
}

