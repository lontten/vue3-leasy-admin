<template>
  <div>
    <a-form
        ref="formRef"
        :model="searchData"
        class="ant-advanced-search-form"
        name="advanced_search"
        @finish="onFinish"
        v-show="columnList.length>0"
    >

      <a-row :gutter="24">

        <template v-for="(item ,index) in columnList" :key="index">
          <a-col v-show="expand || index <= 6" :span="8">

            <!--      渲染 valueType: valueEnum 类型 -->
            <a-form-item v-if="item.valueEnum "
                         :label="item.title"
                         :name="item.dataIndex"
            >
              <a-select
                  ref="select"
                  v-model:value="searchData[item.dataIndex]"
                  :options="selectOptionList[index]"
              ></a-select>
            </a-form-item>

            <!--      渲染 valueType: switchConfig 类型 -->
            <a-form-item v-else-if="item.switchConfig "
                         :label="item.title"
                         :name="item.dataIndex"
            >
              <a-select
                  ref="select"
                  v-model:value="searchData[item.dataIndex]"
                  :options="selectOptionList[index]"
              ></a-select>
            </a-form-item>

            <a-form-item v-else-if="item.valueType=='datetime' "
                         :label="item.title"
                         :name="item.dataIndex"
            >
              <a-date-picker show-time
                             :showNow="false"
                             placeholder="选择时间"
                             valueFormat="YYYY-MM-DD HH:mm:ss"
                             v-model:value="searchData[item.dataIndex]"
              />
            </a-form-item>

            <a-form-item v-else
                         :label="item.title"
                         :name="item.dataIndex"
            >
              <a-input v-model:value="searchData[item.dataIndex]"></a-input>
            </a-form-item>


          </a-col>
        </template>

        <slot name="search"
              :expand="expand"
              :num="columnList.length"
        ></slot>


      </a-row>

      <a-row>
        <a-col :span="24" style="text-align: right">
          <a-button html-type="submit" type="primary">搜索</a-button>
          <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">重置</a-button>
          <a style="font-size: 12px" @click="expand = !expand">
            <template v-if="expand">
              <UpOutlined/>
            </template>
            <template v-else>
              <DownOutlined/>
            </template>
            折叠
          </a>
        </a-col>
      </a-row>

    </a-form>
  </div>
</template>
<script lang="ts" setup>
import {computed, ref} from 'vue';
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import type {FormInstance} from 'ant-design-vue';
import {isHasList} from "../utils/arr.ts";
import {LnTableColumnType} from "../type/table.ts";


const columns = defineModel<LnTableColumnType[]>()
const searchData = defineModel<any>('searchData')
const columnList = computed(() => {
  return toList()
})

interface Props {
  onSearchEvent: (e: any) => void
}

const {onSearchEvent} = defineProps<Props>()


const expand = ref(false);
const formRef = ref<FormInstance>({});

const onFinish = (values: any) => {
  onSearchEvent(values)
};


const toList = () => {
  const v = columns.value
  if (!v) {
    return []
  }
  return v.filter(value => {
    if (value.dataIndex == 'operation') {
      return false
    }
    if (value.hideInSearch) {
      return false
    }
    return true
  })
}

const selectOptionList = computed(() => {
  const list = toList()
  if (!isHasList(list)) {
    return []
  }
  return list.map((v: any) => {
    let arr = []

    if (v.valueEnum) {
      for (let valueEnumKey in v.valueEnum) {
        arr.push(v.valueEnum[valueEnumKey])
      }
    }

    if (v.switchConfig) {
      arr.push({
        label: v.switchConfig.true.label,
        value: v.switchConfig.true.value,
      })
      arr.push({
        label: v.switchConfig.false.label,
        value: v.switchConfig.false.value,
      })
    }

    return arr

  })
})

</script>
<style scoped>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}

[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255, 255, 255, 0.04);
}
</style>
