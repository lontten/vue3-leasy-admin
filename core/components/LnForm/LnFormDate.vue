<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-date-picker v-model:value="formData[name]" v-bind="config"/>
  </a-form-item>
</template>

<script lang="ts" setup>
import {LnFormItemPropsType} from "./lnFormType";
const formData = defineModel<any>()
const {
  label, name, rule,
  extra, config
} = defineProps<LnFormItemPropsType>()

</script>

