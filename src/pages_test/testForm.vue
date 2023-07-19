<template>

  <LnForm v-model="formData" :onFinish="onOk">
    <LnFormSelect label="地址类型" name="spuAddressType"
                  v-model="formData"
                  :selectOptionList="opList"
                  :config="{
                     mode:'multiple'
                  }"
    ></LnFormSelect>
  </LnForm>

</template>
<script lang="ts" setup>
import {ref} from "vue";
import LnForm from "../../core/components/LnForm.vue";
import LnFormSelect from "../../core/components/LnForm/LnFormSelect.vue";

const formData = ref({})
const opList = ref([
  {
    label: 'aa',
    value: 11
  },
  {
    label: 'bb',
    value: 22
  },


])
const onOk = () => {
  console.log('ok,', formData.value)
}
</script>
<style lang="scss" scoped>

</style>
