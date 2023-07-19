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
                   :disabled="disabled"
    />
  </a-form-item>
</template>


<script lang="ts" setup generic="T">
import 'dayjs/locale/zh-cn';
import {LnFormItemPropsType} from "./lnFormType.ts";

const formData = defineModel<T>()
const {
  label, name, rule,
  extra, disabled = false
} = defineProps<LnFormItemPropsType>()

const datetimeFormat = "YYYY-MM-DD HH:mm:ss"

</script>

