<template>
  <a-table bordered
           :columns="columns"
           :data-source="dataSource"
           :scroll="{ x: 1300, y: 1000 }"

           :pagination="pagination"
           :loading="loading"
           @change="handleTableChange"

           row-key="id"
           :row-selection="selectedRowsConfig"
           v-bind="config"

  >
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

      <!--      渲染 valueType: img 类型 -->
      <template v-if="column.valueType === 'img'  ">
        <img width="50" height="50" :src="record[column.dataIndex]">
        <!--        <a-image-->
        <!--            :width="40"-->
        <!--            :height="40"-->
        <!--            :src="record[column.dataIndex]"-->
        <!--        />-->
      </template>

      <!--      渲染 valueType: valueEnum 类型 -->
      <template v-if="column.valueEnum ">
        <span>
           {{ column.valueEnum[record[column.dataIndex]] ? column.valueEnum[record[column.dataIndex]].label : '' }}
        </span>
      </template>

      <!--      渲染 valueType: valueEnum 类型 -->
      <template v-if="column.switchConfig ">
        <span>
            <a-switch
                v-model:checked="record[column.dataIndexLeasySwitch]"
                :checked-children="column.switchConfig.true.label"
                :un-checked-children="column.switchConfig.false.label"
                @change="(e:any)=>switchChange(e,column,record)"
            />
          <span v-show="switchRef[column.dataIndexLeasySwitch]"></span>
        </span>
      </template>


      <template v-if="column.key === 'state'">
            <span>
              <a-badge status="success"/>
              Finished
            </span>
      </template>


      <template v-if="column.dataIndex === 'operation'">

        <slot name="lnOperation" :data="record"></slot>
      </template>

    </template>


    <!--    二级表格-->
    <template #expandedRowRender>
      <TableCore v-model="queryDataExpanded"
                 v-model:columns="columnsExpanded"
                 :config="{
                   pagination:false
                 }"
      >

        <template #lnOperation="{data}">
          <slot name="lnOperationExpanded" :data="data"></slot>
        </template>

      </TableCore>
    </template>


  </a-table>
</template>
<script lang="ts" setup generic="T">
import {computed, onMounted, ref, watch} from 'vue';
import {usePagination} from "vue-request";
import {TableProps} from "ant-design-vue";
import {LnTablePropsType} from "@core/components/LnForm/lnFormType.ts";

const queryData = defineModel<any>()
const queryDataExpanded = defineModel<any>('queryDataExpanded')
const columnsBase = defineModel<any[]>('columns')
const columnsExpanded = defineModel<any[]>('columnsExpanded')
const searchKey = defineModel<any>('searchKey')
const selectedRows = defineModel<any>('selectedRows')
const {
  config,
} = defineProps<LnTablePropsType>()

const switchRef = ref<any>({})
const columns = computed(() => {
  return columnsBase.value?.filter(v => !v.hideInTable).map(value => {
    if (value.valueEnum) {
      value.valueEnum = list2obj(value.valueEnum)
    }
    return value
  }).map(v => {
    if (v.switchConfig) {
      v.dataIndexLeasySwitch = v.dataIndex + '_leasy_switch'
    }
    return v
  })
})

const list2obj = (list: any) => {
  let obj: any = {}
  if (list) {
    if (list instanceof Array) {
      list.forEach(value => obj[value.value] = value)
    } else {
      return list
    }
  }
  return obj;
}

const switchChange = async (e: any, column: any, record: any) => {
  switchRef.value[column.dataIndexLeasySwitch] = e
  const c: any = !e
  const ok = await column.switchConfig[c].fun(record)
  if (!ok) {
    await loadData()
  }
}

// table-------------------------
const queryDataInt = async (param: any) => {
  let data = await queryData.value(param)
  data.total = Number.parseInt(data.total)
  return data
}
const {
  data,
  run,
  loading,
  current,
  pageSize,
  total,
} = usePagination(queryDataInt, {
  pagination: {
    currentKey: 'pageIndex',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
    totalPageKey: 'pages',
  },
});


// @ts-ignore
const dataSource = computed(() => {
  let list: any[] = data.value?.records || []
  const columnList: any[] = columns.value?.filter(v => v.switchConfig) || []
  list = list.map(value => {
    for (let columnListElement of columnList) {
      const isChecked = value[columnListElement.dataIndex] == columnListElement.switchConfig.true.value
      value[columnListElement.dataIndexLeasySwitch] = isChecked
    }
    return value
  })
  return list
});


const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange: TableProps['onChange'] | any = (
    pag: { pageSize: number; current: number },
    filters: any,
    sorter: any,
) => {
  run({
    pageSize: pag.pageSize!,
    pageIndex: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
    ...searchKey.value,
  });
};


const loadData = () => {
  run({
    pageSize: pageSize.value,
    pageIndex: current.value,
    ...searchKey.value,
  })
}


// 多选----------------
type Key = string | number;
const selectedRowKeyList = ref<Key[]>([]);
const onSelectChange = (selectedRowKeys: Key[]) => {
  const list = dataSource.value.filter((v: any) => selectedRowKeys.includes(v.id))
  selectedRows.value = list
  selectedRowKeyList.value = selectedRowKeys;
};
const selectedRowsConfig = computed(() => {
  if (!selectedRows.value) {
    return undefined
  }
  return {selectedRowKeys: selectedRowKeyList, onChange: onSelectChange}
})


watch(searchKey, () => {
  loadData()
})

onMounted(() => {
  run({
    pageSize: 10,
    pageIndex: 1,
  });
})


// 把 方法暴露给父组件
defineExpose({loadData})
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
