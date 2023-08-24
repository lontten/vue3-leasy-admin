<template>
  <a-table bordered
           :columns="columns"
           :data-source="dataSource"
           :scroll="{ x: 1300, y: 1000 }"

           pagination:false
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


  </a-table>
</template>
<script lang="ts" setup generic="T">
import {computed, onMounted, ref} from 'vue';
import {LnTablePropsType} from "@core/components/LnForm/lnFormType.ts";
import {list2obj} from "@core/utils/arr.ts";

const queryData = defineModel<any>()
const columnsBase = defineModel<any[]>('columns')
const {
  config,
  subParam
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


/**
 * 开关切换时，调用对应的函数，执行成功后，调用loadData重新加载数据
 * @param e
 * @param column
 * @param record
 */
const switchChange = async (e: any, column: any, record: any) => {
  switchRef.value[column.dataIndexLeasySwitch] = e
  const c: any = !e
  const ok = await column.switchConfig[c].fun(record)
  if (!ok) {
    await loadData()
  }
}


// @ts-ignore
const dataSource = computed(() => {
  let list: any[] = data.value
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

const data = ref([])
const loadData = async () => {
  data.value = await queryData.value(subParam)
}
onMounted(async () => {
  await loadData()
})

</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
