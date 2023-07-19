export interface SysTabType {
    title: string
    content: string
    key: string
    closable?: boolean
}

export interface SysNavTreeType {
    name: string //显示的名字
    namePaths?: string[] //内部计算-临时属性
    path: string
    key: string
    icon: string
    roles?: string[]
    show?: boolean
    children?: SysNavTreeType[]
}
