<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-date-picker v-model:value="formData[name]" :disabled="disabled"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">


import {LnFormItemPropsType} from "./lnFormType";

const formData = defineModel<T>()
const {
  label, name, rule,
  extra, disabled = false
} = defineProps<LnFormItemPropsType>()

</script>

