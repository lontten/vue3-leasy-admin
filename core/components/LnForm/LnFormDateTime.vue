<template>
  <a-form-item
      :label="label"
      :name="name"
      :rules="rule"
  >
    <a-date-picker show-time
                   :showNow="false"
                   placeholder="选择时间"
                   valueFormat="'YYYY-MM-DD HH:mm:ss'"
                   v-model:value="datetime"
                   @ok="onOk"/>
  </a-form-item>
</template>


<script lang="ts" setup generic="T">

import {LnFormPropsType} from "./lnFormType.ts";
import {Dayjs} from 'dayjs';
import {onMounted, ref} from "vue";

const formData = defineModel<T>()
const {label, name, rule} = defineProps<LnFormPropsType>()

const datetime = ref<Dayjs>()

const onOk = (value: Dayjs) => {
  setFormData(value)
};

onMounted(() => {
  datetime.value = getFormData()
})

const setFormData = (data: any) => {
  let v = formData.value
  if (v) {
    v[name] = data
  }
}

const getFormData = (): any => {
  let v = formData.value
  if (v) {
    return v[name]
  }
  return null
}

</script>

