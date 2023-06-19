
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
