<!-- eslint-disable prettier/prettier -->
<template>
    <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, record }">

            <template v-if="column.dataIndex === 'operation'">
                <a @click="edit(column,record)">Edit</a>
            </template>

        </template>
    </a-table>
</template>
<script lang="ts" setup>
import type {UnwrapRef} from 'vue';
import {reactive, ref} from 'vue';

const columns = [
    {
        title: 'name1',
        dataIndex: 'name',
        width: 500,
    },
    {
        title: 'name',
        dataIndex: 'name',
        width: 250,
    },
    {
        title: 'age',
        dataIndex: 'age',
        width: '20%',
    },
    {
        title: 'address',
        dataIndex: 'address',
        width: '10%',
    },
    {
        title: 'operation',
        dataIndex: 'operation',
    },
];

interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
}


const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const dataSource = ref(data);


const currentRows: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (column: any, row: DataItem) => {
    console.log('row:', row.name)
    console.log('column:', column)
};


</script>
<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>
