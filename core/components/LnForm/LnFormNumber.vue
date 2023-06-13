<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >
    <a-input-number :id="name" v-model:value="formData[name]" :min="min" :max="max"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">
import {LnFormPropsType} from "./lnFormType.ts";

const formData = defineModel<T>()
const {label, name, rule, min, max} = defineProps<LnFormPropsType>()

</script>

