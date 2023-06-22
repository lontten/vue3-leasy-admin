<template>
  <ProForm v-model="data">
    <LnFormText label="ka" name="ka"
                v-model="data"
                :rule="[{ required: true, message: 'Please input your username!' }]"
    ></LnFormText>

    <LnFormTextArea label="info" name="info"
                    v-model="data"
                    :rule="[{ required: true, message: 'Please input your username!' }]"
    ></LnFormTextArea>


    <LnFormDateTime label="datetime" name="datetime"
                    v-model="data"
    ></LnFormDateTime>


    <LnFormSelect label="ss" name="ss"
                  v-model="data"
                  :selectOptionList="optionList"
    ></LnFormSelect>
    <button @click="addOption">add</button>


    <LnFormNumber label="ka1" name="ka1"
                  v-model="data"
                  min="3"
                  max="8"
    ></LnFormNumber>
    <LnFormImgListLocal label="avatar" name="avatar"
                        v-model="data"
                        :uploadType="'oss'"
    ></LnFormImgListLocal>
    <LnFormMap addressPrefix="shop"
               v-model="data"
               :addressPosType="AddressPosTypeEnum.LNG_LAT"
               :addressMapType="AddressMapTypeEnum.TX"
    ></LnFormMap>

  </ProForm>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ProForm from "../../../core/components/ProForm.vue";
import LnFormTextArea from "../../../core/components/LnForm/LnFormTextArea.vue";
import LnFormText from "../../../core/components/LnForm/LnFormText.vue";
import LnFormImgListLocal from "../../../core/components/LnForm/LnFormImgListLocal.vue";
import LnFormNumber from "../../../core/components/LnForm/LnFormNumber.vue";
import LnFormMap from "../../../core/components/LnForm/LnFormMap.vue";
import {AddressMapTypeEnum, AddressPosTypeEnum} from "../../../core/type/sys/address.ts";
import LnFormDateTime from "../../../core/components/LnForm/LnFormDateTime.vue";
import LnFormSelect from "../../../core/components/LnForm/LnFormSelect.vue";

let data = ref<any>();

data.value = {
  ka: 'ka',
  ka1: 6,
  info: 'info',
  avatar: ['https://project-temp-file.oss-cn-hangzhou.aliyuncs.com/006-dir/1685760327975.svg'],
  addressSsx1: '',
  addressSsx2: '',
  addressSsx3: '',
  addressInfo: '',
  shopAddressPos: '113.80724398972029,34.79212175582764',
  datetime: null
}


const optionList = ref([
  {
    value: '1',
    label: 'a',
  },
  {
    value: '2',
    label: 'b',
  },
  {
    value: '3',
    label: 'c',
    disabled: true,
  },
  {
    value: '4',
    label: 'd',
  },
])


const addOption = () => {
  optionList.value = []
}

</script>
<style scoped>
</style>
