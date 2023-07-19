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
                    :disabled="disabled"
                    style="width: 100%"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">
import {LnFormItemPropsType} from "./lnFormType.ts";

const formData = defineModel<T>()
const {
  label, name, rule, min, max,
  extra, disabled = false
} = defineProps<LnFormItemPropsType>()

</script>

