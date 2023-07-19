<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-textarea v-model:value="formData[name]" :autoSize="style" v-bind="config"/>
  </a-form-item>
</template>

<script lang="ts" setup>
import {LnFormItemPropsType} from "./lnFormType.ts";
import {computed} from "vue";

const formData = defineModel<any>()
const {
  label, name, rule, extra, minRows = 6, maxRows = 16,
  config,
} = defineProps<LnFormItemPropsType>()


const style = computed(() => {
  return {"maxRows": maxRows, "minRows": minRows}
})

</script>

