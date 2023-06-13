<template>
  ---
  <ProForm v-model="data" :formColumns="formColumns"></ProForm>
  <button @click="click">bbb</button>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ProForm from "../../../core/components/ProForm.vue";

let data = ref<any>();

data.value = {
  ka: 'ka',
  ka1: 6,
  info: 'info',
  avatar:'https://project-temp-file.oss-cn-hangzhou.aliyuncs.com/006-dir/1685760327975.svg'
}
const formColumnsData = [
  {
    name: 'name',
    label: '姓名',
    type: 'text',
  },
  {
    name: 'age',
    label: '年龄',
    type: 'text',
  },
]

const formColumns = ref(formColumnsData)

const click = () => {
  data.value.age++
}


</script>
<style scoped>
</style>
