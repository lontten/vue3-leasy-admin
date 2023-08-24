<template>
  <LnTable v-model:columns="dictColumns"
           v-model="getPage"
           v-model:searchData="searchData"
           v-model:selectedRows="selectedRows"
           bordered ref="tableRef">

    <template #lnOperation="{data}">
      <a-popconfirm
          title="确定删除?"
          @confirm="del(data)"
      >
        <a-button danger>删除</a-button>
      </a-popconfirm>
    </template>


    <template #head>
      <a-button class="editable-add-btn">删除</a-button>
    </template>

  </LnTable>


</template>

<script setup lang="ts">

import LnTable from "@core/components/LnTable.vue";
import {ref, watch} from "vue";
import {dictListPage} from "@src/services/dict/dict.ts";
import {dictColumns} from "@src/pages_demo/multSelectTable/data.ts";

const tableRef = ref()

const selectedRows = ref([])
const searchData = ref({})


watch(selectedRows, () => {
  //当多选发生变化时，这里会执行
  console.log('selectedRows', selectedRows.value)
})

const getPage = async (param: any) => {
  param.dictCode = 'tx_address_ssx'
  return await dictListPage(param)
}

const del = (data: any) => {

}

</script>
<style lang="scss" scoped>
.editable-add-btn {
  margin: 0 10px 8px;
}
</style>
