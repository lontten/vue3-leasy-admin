<template>
  <div>
    <a-form
        ref="formRef"
        :model="formState"
        class="ant-advanced-search-form"
        name="advanced_search"
        @finish="onFinish"
    >


      <a-row :gutter="24">
        <template v-for="(item,index) in columnList" :key="index">
          <a-col v-show="expand || index <= 6" :span="8">
            <a-form-item
                :label="item.title"
                :name="item.dataIndex"
            >
              <a-input v-model:value="formState[item.dataIndex]" placeholder="placeholder"></a-input>
            </a-form-item>
          </a-col>
        </template>
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
import {computed, reactive, ref, toValue} from 'vue';
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import type {FormInstance} from 'ant-design-vue';

interface Ka {
  title: string
  dataIndex: string
  hideInSearch?: boolean
}


const columns = defineModel<Ka[]>()
const columnList = computed(() => {
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
})

interface Props {
  onSearchEvent: (e: any) => {}
}

const {
  onSearchEvent = (e: any) => {
  }
} = defineProps<Props>()


const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({});
const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
  onSearchEvent(values)
};
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
