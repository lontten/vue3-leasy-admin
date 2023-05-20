<template>
  <div id="container"></div>


</template>
<script lang="ts" setup>
import {onMounted} from "vue";

const TMap: any = (window as any).TMap;

let address = defineModel<{
  lat: string,
  lng: string
} | string>()

interface Props {
  type?: 'obj' | 'lat_lng' | 'lng_lat'
}

const {type = 'lng_lat'} = defineProps<Props>()

// 创建信息窗
let info //POI信息窗


let map;


const initMap = () => {


  //定义地图中心点坐标
  const center = new TMap.LatLng(39.984120, 116.307484);
  //定义map变量，调用 TMap.Map() 构造函数创建地图
  map = new TMap.Map(document.getElementById('container'), {
    center: center,//设置地图中心点坐标
    zoom: 17.2,   //设置地图缩放级别
    // pitch: 43.5,  //设置俯仰角
    rotation: 45    //设置地图旋转角度
  });

  // 创建POI信息窗
  info = new TMap.InfoWindow({
    map,
    position: map.getCenter()
  }).close();
  //Map实例创建后，通过on方法绑定点击事件
  map.on("click", clickHandler)

  //-------------------


};

//定义事件处理方法
const clickHandler = (e: any) => {
  const lat = e.latLng.getLat().toFixed(6);
  const lng = e.latLng.getLng().toFixed(6);
  console.log("您点击的坐标经纬度是：" + lng + "," + lat);
  switch (type) {
    case 'obj':
      address.value = {lng: lng, lat: lat};
      break
    case 'lat_lng':
      address.value = `${lat},${lng}`;
      break
    case 'lng_lat':
      address.value = `${lng},${lat}`;
      break
  }


  // 获取click事件返回的poi信息
  let poi = e.poi;
  if (poi) {
    // 拾取到POI
    console.log('poi', poi)
    info.setContent(poi.name).setPosition(poi.latLng).open();
  } else {
    // 没有拾取到POI
    info.close();
  }

}


onMounted(() => {
  initMap()

})

</script>
<style scoped>
#container {
  /*地图(容器)显示大小*/
  width: 100%;
  height: 100%;
}
</style>
