<template>

  <div class="ssx">
    <a-select
        v-model:value="province"
        style="width: 120px"
        :options="provinceList.map(v => ({ value: v }))"
    ></a-select>

    <a-select
        v-model:value="city"
        style="width: 120px"
        :options="cityList.map(v => ({ value: v }))"
    ></a-select>

    <a-select
        v-model:value="area"
        style="width: 120px"
        :options="areaList.map(v => ({ value: v }))"
    ></a-select>
  </div>

</template>
<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';

const {getSsxList} = defineProps()


let provinceList: any[] = []
let cityList: any[] = []
let areaList: any[] = []


const province = ref();
const city = ref();
const area = ref();


watch(province, async () => {
  cityList = await getSsxList(province)
  city.value = cityList[0];
});

watch(city, async () => {
  areaList = await getSsxList(city)
  area.value = areaList[0];
});

onMounted(async () => {
  provinceList = await getSsxList()
  province.value = provinceList[0]
})
</script>
<style lang="scss" scoped>
.ssx{
  display: flex;
  flex-direction: column;
}
</style>
