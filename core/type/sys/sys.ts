//页面tab

// 项目基础配置
export interface BaseConfigType {
    baseUrl?: string
    outDir?: string
}

export interface StoreUserInfoType {
    avatar?: string,//用户头像
    nickname?: string,//用户昵称
    showName?: string,//展示的用户名
    roles?: string[],//用户角色列表
    routers?: string[], //可浏览路由
}
