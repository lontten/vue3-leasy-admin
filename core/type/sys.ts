//页面tab

export interface SysTabType {
    title: string
    content: string
    key: string
    closable?: boolean
}

export interface SysNavTreeType {
    name: string
    namePaths?: string[]
    path: string
    key: string
    icon: string
    children?: SysNavTreeType[]
}

// 项目基础配置
export interface BaseConfigType {
    baseUrl?:string
}

// 项目基础配置
export interface FileZipConfig {
    zipNum?:number
    sizeMax?:number
}
