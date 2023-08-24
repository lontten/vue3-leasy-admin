import {LnTableColumnType} from "@core/type/table.ts";

export const dictColumns: LnTableColumnType[] = [
    {
        title: 'code',
        dataIndex: 'dictCode',
        valueType: 'text',
        hideInSearch: true,
    },
    {
        title: 'lable',
        dataIndex: 'dictCodeShowLable',
        valueType: 'text',
        hideInSearch: true,
    },
    {
        title: 'value',
        dataIndex: 'dictInfoValue',
        valueType: 'text',
        hideInSearch: true,
    },

    {
        title: '操作',
        dataIndex: 'operation',
        width: '150px',
        fixed: 'right',
    },
];
