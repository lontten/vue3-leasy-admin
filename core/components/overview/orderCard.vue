<template>
  <div class="card" :style="style ">
    <div class="body">
      <div class="body1">
        <div class="center">
          <div style="font-size: larger;font-weight: bold">{{ currentTitle }}</div>
          <a-tag color="blue">{{ preShortTitle }}</a-tag>
        </div>
      </div>
      <div class="body2">
        <a-statistic :value="currentNum" :value-style="{ color: '#d3950c' }" style="margin-right: 50px"/>
      </div>
      <div class="body3">

        <div class="center">
          <div>
            <span style="color: #666666">{{ ratioTitle }}</span>
            <span style="color: red">
              {{ ratioNum }}
              <caret-up-outlined v-if="ratioType"/>
              <caret-down-outlined v-else/>
            </span>
          </div>
          <div><span style="color: #666666">{{ preTitle }} <span>{{ preNum }}</span></span></div>
        </div>
      </div>

    </div>
    <div class="line">
    </div>
    <div class="footer">
      <div class="center">
        <div>{{ totalTitle }}</div>
        <div>{{ totalNum }}</div>
      </div>

    </div>
  </div>

</template>
<script lang="ts" setup>
import {OverviewType} from "./overviewType.ts";
import {computed} from "vue";

const {
  currentTitle, currentNum,
  totalTitle, totalNum,
  preTitle, preShortTitle, preNum,
  ratioNum, ratioTitle, ratioType,
  height, width,
} = defineProps<OverviewType>()


const style = computed(() => {
  let str = ''
  if (height) {
    str += 'height:' + height + ';'
  }
  if (width) {
    str += 'width:' + width + ';'
  }

  return str
})

</script>
<style lang="scss" scoped>
.overview {
  background-color: #ececec;

  .card {
    margin: 10px;
    height: 180px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;


    .body {
      margin-left: 10px;
      margin-right: 10px;
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;


      .body1 {
        display: flex;
        height: 30px;
        flex-direction: column;
        justify-content: center;

        .center {
          display: flex;
          justify-content: space-between;
        }

      }

      .body2 {

      }

      .body3 {
        display: flex;
        height: 30px;
        flex-direction: column;
        justify-content: center;

        .center {
          display: flex;

          div {
            margin-right: 20px;
          }
        }
      }

      padding-bottom: 5px;
    }

    .footer {
      border-top: rgba(66, 66, 66, 0.49) solid 1px;
      padding-top: 5px;
      margin-left: 10px;
      margin-right: 10px;


      display: flex;
      height: 30px;
      flex-direction: column;
      justify-content: center;

      .center {
        display: flex;
        justify-content: space-between;
      }

    }
  }


}

</style>
