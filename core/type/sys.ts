//页面tab

export interface SysTabType {
    title: string
    content: string
    key: string
    closable?: boolean
}

export interface SysNavTreeType {
    name: string
    path: string
    key: string
    icon: string
    children?: SysNavTreeType[]
}
