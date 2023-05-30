<template>
  <a-table :columns="columns" :data-source="dataSource" bordered>
    <template #bodyCell="{ column, record }">


      <!--      渲染 valueType: tags 类型 -->
      <template v-if="column.valueType === 'tags'  ">
        <span>
          <a-tag
              v-for="tag in record[column.dataIndex]"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag }}
          </a-tag>
        </span>
      </template>


      <template v-if="column.key === 'state'">
            <span>
              <a-badge status="success"/>
              Finished
            </span>
      </template>


      <template v-if="column.dataIndex === 'operation'">
        <a @click="edit(column,record)">Edit</a>
        <a @click="edit(column,record)">Edit</a>
      </template>

    </template>
  </a-table>
</template>
<script lang="ts" setup>
import type {UnwrapRef} from 'vue';
import {computed, reactive} from 'vue';
import {useRequest} from "vue-request";
import axios from "axios";
import {TableColumnType} from "../../../core/type/table.ts";

const columns: TableColumnType[] = [
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
    title: 'tags',
    dataIndex: 'dictTagList',
    width: '10%',
    valueType: 'tags'
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
console.log('page data:: ', data)
const dataSource = computed(() => data.value?.data.data.records)
console.log('s', dataSource)

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
