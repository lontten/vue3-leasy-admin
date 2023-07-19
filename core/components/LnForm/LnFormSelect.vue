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
        @change="onChange"
        :disabled="disabled"
    ></a-select>


  </a-form-item>
</template>


<script lang="ts" setup generic="T">

import {LnFormItemPropsType} from "./lnFormType.ts";
import {watchEffect} from "vue";

const formData = defineModel<T>()
const {
  label, name, rule, extra, selectOptionList = [],
  onChange, disabled = false
} = defineProps<LnFormItemPropsType>()
const setFormData = (data: any) => {
  let v = formData.value
  if (v) {
    v[name] = data
  }
}

watchEffect(() => {
  if (selectOptionList.length == 0) {
    setFormData('')
  }
})


</script>

