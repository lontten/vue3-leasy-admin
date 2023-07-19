<template>
  <a-modal v-model:open="open" :title="title"
           @ok="handleOk"
           :width="modalWith"
           ok-text="确认" cancel-text="取消"
  >
    <a-form
        ref="formRef"
        :model="formData"
        name="basic"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        autocomplete="off"
        @finish="onFinish"
    >
      <slot></slot>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup generic="T">
import {FormInstance} from "ant-design-vue";
import {ref} from "vue";
import {LnFormPropsType} from "./LnForm/lnFormType.ts";

const formData = defineModel<T>()
const open = defineModel('open')
const {
  modalWith = '800px',
  labelCol = {span: 4},
  wrapperCol = {span: 16},
  onOk,
  title = ''
} = defineProps<LnFormPropsType>()

const onFinish = (values: any) => {
  console.log('Success:', values);
};

// ----------------modal-------------
const formRef = ref<FormInstance>();

const handleOk = async () => {
  try {
    await formRef.value?.validate();
  } catch (e) {
    console.log(e)
    return
  }
  open.value = false;
  onOk()
  return
};

</script>

