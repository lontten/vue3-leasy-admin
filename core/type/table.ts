import {BadgeStateType, ColumnsValueType} from "./badge.ts";

export interface TableColumnType {
    title?: string,
    dataIndex: string,
    width?: string | number,

    valueType?: ColumnsValueType,
    badgeState?: BadgeStateType
}
