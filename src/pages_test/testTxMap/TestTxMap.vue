<template>

  <div class="map">
    <TxMap v-model="address" type="obj"></TxMap>
  </div>
  <!--  <GdMap></GdMap>-->
</template>
<script lang="ts" setup>
import TxMap from "../../../core/components/TxMap.vue";
import {ref, watch} from "vue";

const address = ref({
  address: "海淀区万柳光大花园(泉宗路南100米)-集雅阁",
  city: "北京市",
  district: "海淀区",
  pos: {lng: '116.300573', lat: '39.962979'},
  province: "北京市",
})
watch(address, () => {
  console.log('addreess-www::', address.value)
})

</script>
<style lang="scss" scoped>
.map {
  width: 1000px;
  height: 600px;
  border: green solid 1px;
}
</style>
