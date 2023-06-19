import {defineStore} from "pinia";
import {ref} from "vue";
import {StoreInitType, StoreUserInfoType} from "../type/sys/sys.ts";

export const useSysInitStore =
    defineStore('sys_init', () => {
        const data = ref<StoreInitType>({})

        function setToken(token: string) {
            data.value.token = token
        }

        function removeToken() {
            data.value.token = undefined
        }

        function setUserInfo(userInfo: StoreUserInfoType) {
            data.value.userInfo = userInfo
        }

        function isLogin() {
            if (data.value.token && data.value.userInfo) {
                if (data.value.userInfo.nickname) {
                    return true
                }
            }
            return false
        }

        function getUserInfo():StoreUserInfoType  {
            return data.value.userInfo || {}
        }

        return {setToken, removeToken, setUserInfo, isLogin, getUserInfo}
    })
