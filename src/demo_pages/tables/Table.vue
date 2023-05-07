<!-- eslint-disable prettier/prettier -->
<template>
    <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #bodyCell="{ column, text, record }">


            <template v-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="currentRows[record.key]">
                        <a-typography-link
                                @click="save(record.key)">Save</a-typography-link>
                        <a-popconfirm
                                title="Sure to cancel?"
                                @confirm="cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a @click="edit(record.key)">Edit</a>
                    </span>
                </div>
            </template>


        </template>
    </a-table>
</template>
<script lang="ts" setup>
import {cloneDeep} from 'lodash-es';
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
const edit = (key: string) => {
    currentRows[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (key: string) => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], currentRows[key]);
    delete currentRows[key];
};
const cancel = (key: string) => {
    delete currentRows[key];
};


</script>
<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>
