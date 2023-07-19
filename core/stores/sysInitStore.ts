import {defineStore} from "pinia";
import {ref} from "vue";
import {StoreUserInfoType} from "../type/sys/sys.ts";

export const useSysInitStore =
    defineStore('sys_init', () => {
        const token = ref<string>('')
        const userInfo = ref<StoreUserInfoType>({})

        function isLogin() {
            if (token.value){
                return true
            }
            if (token.value && userInfo.value) {
                if (userInfo.value.nickname) {
                    return true
                }
            }
            return false
        }

        return {userInfo, token, isLogin}
    }, {
        persist: true,
    })
