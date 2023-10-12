<template>


a
  <TxMapGuide :address="address"></TxMapGuide>


</template>
<script lang="ts" setup>

import {AddressPosTypeEnum} from "@core/type/sys/address.ts";
import TxMapGuide from "@core/components/map/TxMapGuide.vue";

let address: any = {
  pos: "39.977263,116.337063",
  type: AddressPosTypeEnum.LAT_LNG,
}

address = {
  pos: {
    lat: 39.977263,
    lng: 116.337063,
  },
  type: AddressPosTypeEnum.OBJ,
}


</script>
<style lang="scss" scoped>
.overview {
  background-color: #ececec;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;


  .card {
    display: flex;

  }

}

</style>
