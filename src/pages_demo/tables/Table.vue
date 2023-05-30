<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, record }">

      <template v-if="column.dataIndex === 'operation'">
        <a @click="edit(column,record)">Edit</a>
        <a @click="edit(column,record)">Edit</a>
      </template>

    </template>
  </a-table>
</template>
<script lang="ts" setup>
import type {UnwrapRef} from 'vue';
import {computed, reactive, ref} from 'vue';
import {useRequest} from "vue-request";
import axios from "axios";

const columns = [
  {
    title: '名字',
    dataIndex: 'dictName',
    width: 500,
  },
  {
    title: '详情',
    dataIndex: 'dictInfo',
    width: 250,
  },
  {
    title: '排序',
    dataIndex: 'dictSort',
    width: '20%',
  },
  {
    title: 'uid',
    dataIndex: 'uid',
    width: '10%',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: '10%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];

interface DataItem {
  uid: string;
  dictName: string;
  dictSort: number;
  dictInfo: string;
}

const getDictListPage = async () => {
  return axios.post('api/dict/list/page', {
    data: {
      pageIndex: 1,
      pageSize: 10
    },
  });
};

const {data, run, loading} = useRequest(getDictListPage);
run()
console.log('page data:: ',data)
const dataSource=computed(()=>data.value?.data.data.records)
console.log('s',dataSource)

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
