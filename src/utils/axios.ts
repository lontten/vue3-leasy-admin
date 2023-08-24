import axios, {AxiosInstance} from "axios";
import {message} from "ant-design-vue";
import router from "../../core/config/routes.ts";
// @ts-ignore
import {useSysInitStore} from "@core/stores/sysInitStore.ts";
// @ts-ignore
import {removeToken} from "@core/utils/login.ts";

let apis = new Map()
apis.set("base", import.meta.env.VITE_URL_BASE)
// apis.set("hf", import.meta.env.VITE_URL_hf)


let map = new Map<string, AjaxFuns>();

apis.forEach((value, key) => {
    map.set(key, ex(axios.create({
        baseURL: value,
        timeout: 1000 * 5
    })))
})


function ex(ax: AxiosInstance): AjaxFuns {
    ax.interceptors.request.use(
        (config) => {
            let initStore = useSysInitStore();
            config.headers = {
                'Content-Type': 'application/json',
                'token': initStore.token,
            } as any
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    ax.interceptors.response.use(
        resp => {
            const resData = resp.data as ajaxData;
            const code = resData.code
            const data = resData.data
            const msg = resData.msg

            if (code.startsWith('F')) {
                console.log("后台bug， debug使用", data, msg)
                showErrMsg('服务器异常！')
                return resp
            } else if (code.startsWith('M')) {
                console.log("直接弹窗提示")
                showErrMsg(msg)
                return resp
            } else if (code.startsWith('B')) {
                console.log("前端-参数错误，用户前端debug使用", data, msg)
                showErrMsg(msg)
                return resp
            } else if (['Q001', 'Q004'].indexOf(code) !== -1) {
                console.log('未登录，code,', code)
                removeToken()
                showErrMsg(msg)
                toLoginPage()
                return resp
            } else if ('Q006' === code) {
                console.log("账号冻结；提示账号冻结;前端跳转登陆页面")
                showErrMsg('账号冻结')
                toLoginPage()
                return resp
            } else if ('Q007' === code) {
                console.log("账号已加入黑名单；提示账号已拉黑;前端跳转登陆页面")
                showErrMsg('账号已加入黑名单')
                toLoginPage()
                return resp
            } else if ('Q002' === code) {
                console.log("无权限；前端错误，用户不应该能调用到改接口。", data, msg)
                showErrMsg('无权限')
                return resp
            }
            return resp
        },
        error => {
            showErr().then()
            return {
                data: {
                    code: 4001,
                    data: error.response.status
                }
            }
        }
    )


    const showErr = async () => {
        message.error('服务异常')
    };


    async function get(url: string, params = {} = {}): Promise<ajaxData> {
        return new Promise((resolve) => {
            ax.get<ajaxData>(url, {params: params,}).then(resp => {
                resolve(resp.data)
            })
        })
    }

    async function post(url: string, data = {}): Promise<ajaxData> {
        return new Promise((resolve) => {
            ax.post<ajaxData>(url, data).then(resp => {
                resolve(resp.data)
            })
        })
    }

    async function put(url: string, data = {}): Promise<ajaxData> {
        return new Promise((resolve) => {
            ax.put<ajaxData>(url, data).then(resp => {
                resolve(resp.data as ajaxData)
            })
        })
    }


    async function del(url: string, data = {}): Promise<ajaxData> {
        return new Promise((resolve) => {
            ax.delete<ajaxData>(url, data).then(resp => {
                resolve(resp.data)
            })
        })
    }

    return {
        get: get,
        post: post,
        put: put,
        del: del,
    }
}

export const baseReq = (url?: string) => {
    if (!url) {
        url = 'base'
    }
    let af = map.get(url);
    if (!af) {
        throw new Error('url not found')
    }
    return af
}

const showErrMsg = (data: string) => {
    message.error(data).then()
}

interface ajaxData {
    code: string
    data: any
    msg: any
}

type AjaxFun = (url: string, data?: any) => Promise<ajaxData>

interface AjaxFuns {
    get: AjaxFun
    post: AjaxFun
    put: AjaxFun
    del: AjaxFun
}

const toLoginPage = () => {
    router.push('/login').then()
}
