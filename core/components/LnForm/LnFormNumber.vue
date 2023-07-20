<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-input-number :id="name"
                    v-model:value="formData[name]"
                    v-bind="config"
                    style="width: 100%"/>
  </a-form-item>
</template>


<script lang="ts" setup>
import {LnFormItemPropsType} from "./lnFormType.ts";

const formData = defineModel<any>()
const {
  label, name, rule,
  extra, config
} = defineProps<LnFormItemPropsType>()

</script>

