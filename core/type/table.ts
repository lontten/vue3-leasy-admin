
// badge的状态类型
export type BadgeStateType = 'success' | 'processing' | 'default' | 'error' | 'warning'
export type ColumnsValueType = 'tags' | 'string' | 'money' | 'number' | 'text'


export type valueEnumType = {
    [key: string | number]: {
        label: string,
        state?: BadgeStateType,
        color?: string
    }
}

export interface TableColumnType {
    title?: string,
    dataIndex: string,
    width?: string | number,

    hideInSearch?: boolean
    hideInTable?: boolean

    valueType?: ColumnsValueType,
    valueEnum?: valueEnumType,
    badgeState?: BadgeStateType
}
