<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-input-number :id="name"
                    v-model:value="formData[name]"
                    :min="min"
                    :max="max"
                    v-bind="config"
                    style="width: 100%"/>
  </a-form-item>
</template>


<script lang="ts" setup>
import {LnFormItemPropsType} from "./lnFormType.ts";

const formData = defineModel<any>()
const {
  label, name, rule, min, max,
  extra, config
} = defineProps<LnFormItemPropsType>()

</script>

