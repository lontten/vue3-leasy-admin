<template>
  <a-form-item
      label="省"
      :name="addressSsx1"
      :rules="rule"
  >
    <a-input v-model:value="formData[addressSsx1]" disabled/>
  </a-form-item>
  <a-form-item
      label="市"
      :name="addressSsx2"
      :rules="rule"
  >
    <a-input v-model:value="formData[addressSsx2]" disabled/>
  </a-form-item>
  <a-form-item
      label="县"
      :name="addressSsx3"
      :rules="rule"
  >
    <a-input v-model:value="formData[addressSsx3]" disabled/>
  </a-form-item>

  <a-form-item
      label="经纬度"
      :name="addressPos"
      :rules="rule"
  >
    <a-input v-model:value="formData[addressPos]" disabled/>
  </a-form-item>

  <a-form-item
      label="具体地址"
      :name="addressInfo"
      :rules="rule"
  >
    <a-input-group compact>
      <a-input v-model:value="formData[addressInfo]" style="width: calc(100% - 200px)"/>
      <a-button type="primary" @click="showModal">地图定位</a-button>
    </a-input-group>
  </a-form-item>

  <a-modal width="1000px" style="top: 20px"
           v-model:open="open" @ok="handleOk" class="map-modal">
    <TxMap v-model="address" :type="addressPosType" v-if="addressMapType==AddressMapTypeEnum.TX"></TxMap>
    <GdMap v-model="address" :type="addressPosType" v-if="addressMapType==AddressMapTypeEnum.GD"></GdMap>
  </a-modal>
</template>


<script lang="ts" setup generic="T">

import {LnFormPropsType} from "./lnFormType.ts";
import TxMap from "../TxMap.vue";
import {computed, onMounted, ref} from "vue";
import GdMap from "../GdMap.vue";
import {AddressMapTypeEnum, AddressPosTypeEnum, AddressType} from "../../type/sys/address.ts";

const formData = defineModel<any>()
const {
  addressPrefix,
  label,
  name,
  rule = [{required: true, message: '请设置地图定位!'}],
  addressPosType = AddressPosTypeEnum.LNG_LAT,
  addressMapType = AddressMapTypeEnum.TX
} = defineProps<LnFormPropsType>()

const addressSsx1 = computed(() => {
  return addressPrefix ? addressPrefix + 'AddressSsx1' : 'addressSsx1';
})

const addressSsx2 = computed(() => {
  return addressPrefix ? addressPrefix + 'AddressSsx2' : 'addressSsx2';
})

const addressSsx3 = computed(() => {
  return addressPrefix ? addressPrefix + 'AddressSsx3' : 'addressSsx3';
})

const addressInfo = computed(() => {
  return addressPrefix ? addressPrefix + 'AddressInfo' : 'addressInfo';
})

const addressPos = computed(() => {
  return addressPrefix ? addressPrefix + 'AddressPos' : 'addressPos';
})

const address = ref<AddressType>({})

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  open.value = false;
  formData.value[addressSsx1.value] = address.value?.province
  formData.value[addressSsx2.value] = address.value?.city
  formData.value[addressSsx3.value] = address.value?.district
  formData.value[addressPos.value] = address.value?.pos
  formData.value[addressInfo.value] = address.value?.address
};
onMounted(() => {
  if (formData.value) {
    if (formData.value[addressPos.value]) {
      address.value.pos = formData.value[addressPos.value]
    }
  }
})

</script>
<style lang="scss" scoped>
.map-modal {
  height: 800px;
  width: 1300px;
}
</style>
