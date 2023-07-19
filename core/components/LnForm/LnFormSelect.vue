<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >

    <a-select
        ref="select"
        v-model:value="formData[name]"
        :options="selectOptionList"
        v-bind="config"
        @change="onChange"
    ></a-select>


  </a-form-item>
</template>


<script lang="ts" setup>

import {LnFormItemPropsType} from "./lnFormType.ts";
import {watchEffect} from "vue";

const formData = defineModel<any>()
const {
  label, name, rule, extra, selectOptionList = [],
  onChange, config,
} = defineProps<LnFormItemPropsType>()
const setFormData = (data: any) => {
  let v = formData.value
  if (v) {
    v[name] = data
  }
}

watchEffect(() => {
  console.log('config,', config)
  if (selectOptionList.length == 0) {
    setFormData('')
  }
})


</script>

