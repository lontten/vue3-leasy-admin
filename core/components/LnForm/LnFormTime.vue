<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-time-picker v-model:value="formData[name]" :disabled="disabled"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">

import {LnFormItemPropsType} from "./lnFormType.ts";

const formData = defineModel<T>()
const {label, name, rule, extra, disabled = false} = defineProps<LnFormItemPropsType>()

</script>

