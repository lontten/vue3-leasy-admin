<template>

  <div class="overview">
    <div class="card">

      <order-card
          currentTitle="今日订单数量"
          totalTitle="总订单数量"
          pre-num="232"
          preTitle="昨日订单数量"
          preShortTitle="昨日"

          currentNum="3343"
          totalNum="3343434"
          yesterdayNum="22"

          ratioNum="232%"
          ratioTitle="日同比"
          :ratioType="true"
          :width="width"
      ></order-card>


      <order-card
          currentTitle="今日订单数量"
          totalTitle="总订单数量"
          pre-num="232"
          preTitle="昨日订单数量"
          preShortTitle="昨日"

          currentNum="3343"
          totalNum="3343434"
          yesterdayNum="22"

          ratioNum="232%"
          ratioTitle="日同比"
          :ratioType="true"
          :width="width"
      ></order-card>


      <order-card
          currentTitle="今日订单数量"
          totalTitle="总订单数量"
          pre-num="232"
          preTitle="昨日订单数量"
          preShortTitle="昨日"

          currentNum="3343"
          totalNum="3343434"
          yesterdayNum="22"

          ratioNum="232%"
          ratioTitle="日同比"
          :ratioType="true"
          :width="width"
      ></order-card>


      <order-card
          currentTitle="今日订单数量"
          totalTitle="总订单数量"
          pre-num="232"
          preTitle="昨日订单数量"
          preShortTitle="昨日"

          currentNum="3343"
          totalNum="3343434"
          yesterdayNum="22"

          ratioNum="232%"
          ratioTitle="日同比"
          :ratioType="true"
          :width="width"
      ></order-card>

    </div>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <a-typography-title :level="4">其他功能</a-typography-title>
    <Bar></Bar>

  </div>


</template>
<script lang="ts" setup>
import {greet, to_html} from "lram-wasm";
import {Bar} from "@src/components/Ka.tsx";
import OrderCard from "@core/components/overview/orderCard.vue";
const width = "386px"

console.log('wasm')
// greet()
let s = to_html();
console.log('to html:,', s);


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
