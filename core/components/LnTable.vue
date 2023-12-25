<template>
  <div>
    <PrivaSearchHeader v-model="columns" v-model:searchData="searchData" :onSearchEvent="searchFun">

      <template #search="{expand,num}">
        <slot name="search"
              :expand="expand"
              :num="num"
        ></slot>
      </template>


    </PrivaSearchHeader>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="loadData">刷新
      <redo-outlined/>
    </a-button>
    <slot name="head"></slot>

    <div style="margin-bottom: 16px" v-show="hasSelected">
      <slot name="selectHead" :data="selectedRows"></slot>
      <span style="margin-left: 8px">
          {{ `已选中 ${selectedRows?.length} 项` }}
      </span>
    </div>

    <TableCore v-model="queryData"
               v-model:queryDataExpanded="queryDataExpanded"
               v-model:columns="columns"
               v-model:columnsExpanded="columnsExpanded"
               v-model:searchKey="searchKey"
               v-model:selectedRows="selectedRows"
               ref="tableRef"
    >

      <template #lnOperation="{data}">
        <slot name="lnOperation" :data="data"></slot>
      </template>


      <template #lnOperationExpanded="{data}">
        <slot name="lnOperationExpanded" :data="data"></slot>
      </template>


    </TableCore>
  </div>
</template>
<script lang="ts" setup generic="T">
import PrivaSearchHeader from "./PrivaSearchHeader.vue";
import TableCore from "./TableCore.vue";
import {computed, ref} from "vue";


const queryData = defineModel<T>()
const queryDataExpanded = defineModel<any>('queryDataExpanded')
const columns = defineModel<any[]>('columns')
const columnsExpanded = defineModel<any[]>('columnsExpanded')
const searchData = defineModel<any>('searchData')
const selectedRows = defineModel<any>('selectedRows')
const hasSelected = computed(() => selectedRows.value && selectedRows.value.length > 0);


const searchKey = ref({})
const searchFun = (e: any) => {
  searchKey.value = e
}

//---
const tableRef = ref()
const loadData = () => {
  tableRef.value.loadData()
}
const loadDataExpanded = (id: any) => {
  tableRef.value.loadDataExpanded(id)
}
// 把 方法暴露给父组件
defineExpose({loadData, loadDataExpanded})
</script>

