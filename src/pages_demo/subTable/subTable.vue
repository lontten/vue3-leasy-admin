<template>
  <LnTable v-model:columns="dictColumns"
           v-model:columnsExpanded="dictColumns"
           v-model="getPage"
           v-model:searchData="searchData"
           v-model:queryDataExpanded="queryDataExpanded"
           bordered ref="tableRef">

    <template #lnOperation="{data}">
      <a-popconfirm
          title="确定删除?"
          @confirm="del(data)"
      >
        <a-button danger>删除</a-button>
      </a-popconfirm>
    </template>


    <template #lnOperationExpanded="{data}">
      <a-popconfirm
          title="确定删除?"
          @confirm="subDel(data)"
      >
        <a-button danger>sub删除</a-button>
      </a-popconfirm>
    </template>

  </LnTable>


</template>

<script setup lang="ts">

import LnTable from "@core/components/LnTable.vue";
import {ref} from "vue";
import {dictListAll, dictListPage} from "@src/services/dict/dict.ts";
import {dictColumns} from "./data.ts";
import {UUID_ZERO} from "@core/utils/UUID.ts";

const tableRef = ref()
const searchData = ref({})


const getPage = async (param: any) => {
  param.dictCode = 'tx_address_ssx'
  param.dictPid = UUID_ZERO
  return await dictListPage(param)
}

const queryDataExpanded = async (param: any) => {
  console.log('queryDataExpanded get page', param)
  return await dictListAll({
    dictPid: param.id
  })
}

const del = (data: any) => {
  console.log('del,', data)
}
const subDel = (data: any) => {
  console.log('subDel,', data)
}

</script>
<style lang="scss" scoped>
.editable-add-btn {
  margin: 0 10px 8px;
}
</style>
