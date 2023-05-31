<template>

  <TxMap v-model="address"></TxMap>
<!--  <GdMap></GdMap>-->
</template>
<script lang="ts" setup>
import TxMap from "../../../core/components/TxMap.vue";
import {ref} from "vue";
import GdMap from "../../../core/components/GdMap.vue";

const address=ref()




</script>
<style scoped>
</style>
