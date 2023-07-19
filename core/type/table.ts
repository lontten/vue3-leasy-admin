// badge的状态类型
export type BadgeStateType = 'success' | 'processing' | 'default' | 'error' | 'warning'
export type ColumnsValueType = 'tags' | 'string' | 'money' | 'number' | 'text' | 'img' | 'switch' | 'datetime' | 'date'


// export type valueEnumType = {
//     [key: string | number]: {
//         label: string,
//         state?: BadgeStateType,
//         color?: string
//     }
// }

export type valueEnumType = {
    label: string,
    value: string,
    state?: BadgeStateType,
    color?: string
}

export interface LnTableColumnType {
    title?: string,
    dataIndex: string,
    width?: string | number,
    ellipsis?: boolean,  //...省略
    fixed?: string,

    hideInSearch?: boolean
    hideInTable?: boolean

    valueType?: ColumnsValueType,
    valueEnum?: valueEnumType[] | any[],
    switchConfig?: any,
    badgeState?: BadgeStateType
}
