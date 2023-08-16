<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <RichTextCkeditor v-model:value="formData[name]" v-bind="config"/>
  </a-form-item>
</template>


<script lang="ts" setup>

import {LnFormItemPropsType} from "./lnFormType.ts";
import RichTextCkeditor from "@core/components/RichTextCkeditor.vue";

const formData = defineModel<any>()
const {label, name, rule, extra, config,} = defineProps<LnFormItemPropsType>()

</script>

