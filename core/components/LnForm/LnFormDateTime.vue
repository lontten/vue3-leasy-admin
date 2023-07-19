<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
      :extra="extra"
  >
    <a-date-picker show-time
                   :showNow="false"
                   placeholder="选择时间"
                   valueFormat="YYYY-MM-DD HH:mm:ss"
                   :format="datetimeFormat"
                   v-model:value="formData[name]"
                   v-bind="config"
    />
  </a-form-item>
</template>


<script lang="ts" setup>
import 'dayjs/locale/zh-cn';
import {LnFormItemPropsType} from "./lnFormType.ts";

const formData = defineModel<any>()
const {
  label, name, rule,
  extra, config
} = defineProps<LnFormItemPropsType>()

const datetimeFormat = "YYYY-MM-DD HH:mm:ss"

</script>

