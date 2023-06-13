<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >
    <a-input v-model:value="formData[name]"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">

import {LnFormPropsType} from "./lnFormType.ts";

const formData = defineModel<T>()
const {label, name, rule} = defineProps<LnFormPropsType>()

</script>

