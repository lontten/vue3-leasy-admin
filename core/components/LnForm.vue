<template>
  <a-form
      :model="formData"
      name="basic"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >

    <slot></slot>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }" v-if="showSubmit">
      <a-button type="primary" html-type="submit">保存</a-button>
    </a-form-item>
  </a-form>
</template>


<script lang="ts" setup generic="T">


import {LnFormPropsType} from "./LnForm/lnFormType.ts";

const formData = defineModel<T>()
const {
  showSubmit = true,
  labelCol = {span: 4},
  wrapperCol = {span: 16},
  onFinish,
  onFinishFailed,
} = defineProps<LnFormPropsType>()


</script>

