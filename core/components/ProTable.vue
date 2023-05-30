<template>
  <div>
    <PrivaSearchHeader v-model="columns" :onSearchEvent="searchFun"></PrivaSearchHeader>
    <Table></Table>
  </div>
</template>
<script lang="ts" setup>
import Table from "../../src/pages_demo/tables/Table.vue";
import PrivaSearchHeader from "./PrivaSearchHeader.vue";

const searchFun = (e: any) => {
  console.log('pro table:search param:', e)
}

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
    hideInSearch: true,
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

</script>

