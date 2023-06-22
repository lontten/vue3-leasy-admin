<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >

    <a-select
        ref="select"
        v-model:value="formData[name]"
        style="width: 120px"
        :options="selectOptionList"
    ></a-select>


  </a-form-item>
</template>


<script lang="ts" setup generic="T">

import {LnFormPropsType} from "./lnFormType.ts";
import {watchEffect} from "vue";

const formData = defineModel<T>()
const {label, name, rule, selectOptionList = []} = defineProps<LnFormPropsType>()


watchEffect(() => {
  if (selectOptionList.length == 0) {
    setFormData('')
  }
})
const setFormData = (data: any) => {
  let v = formData.value
  if (v) {
    v[name] = data
  }
}
</script>

