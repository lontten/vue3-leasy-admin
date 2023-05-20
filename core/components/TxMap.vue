<template>
  <div id="container"></div>


  <div id="panel">
    <p>输入关键字，将展示相关地点提示，点击提示可定位到该处。</p>
    <input id='keyword' type="text" v-model="keyword">
    <input id="search" type="button" class="btn" value="搜索" @click="searchByKeyword"/>
    <ul id="suggestionList">
      <li v-for="(item,index) in suggestionList">
        <a href="#" @click="setSuggestion(index)">
          {{ item.title }}
          <span class="item_info">{{ item.address }}</span>
        </a>
      </li>
    </ul>
  </div>

</template>
<script lang="ts" setup>
import {onMounted, ref, toValue, watch} from "vue";

const TMap: any = (window as any).TMap;

let address = defineModel<{
  lat: string,
  lng: string
} | string>()

interface Props {
  type?: 'obj' | 'lat_lng' | 'lng_lat'
}

const {type = 'lng_lat'} = defineProps<Props>()
let map;

// 创建信息窗
let info //POI信息窗

const suggestionList = ref([])
// let suggestionList = []; //搜索建议列表
let search;  // 新建一个地点搜索类
let suggest; // 新建一个关键字输入提示类
let markers;
let infoWindowList


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

  //-------------------搜索建议初始化
  search = new TMap.service.Search({pageSize: 10}); // 新建一个地点搜索类
  suggest = new TMap.service.Suggestion({
    // 新建一个关键字输入提示类
    pageSize: 10, // 返回结果每页条目数
    region: '北京', // 限制城市范围
    regionFix: true, // 搜索无结果时是否固定在当前城市
  });
  markers = new TMap.MultiMarker({
    map: map,
    geometries: [],
  });
  infoWindowList = Array(10);


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


const keyword = ref('')


watch(keyword, (value) => {
  // 使用者在搜索框中输入文字时触发
  suggest
      .getSuggestions({keyword: keyword.value, location: map.getCenter()})
      .then((result) => {
        suggestionList.value = result.data;
      })
      .catch((error) => {
        console.log(error);
      });
})

function setSuggestion(index) {
  // 点击输入提示后，于地图中用点标记绘制该地点，并显示信息窗体，包含其名称、地址等信息
  infoWindowList.forEach((infoWindow) => {
    infoWindow.close();
  });
  infoWindowList.length = 0;
  keyword.value = suggestionList.value[index].title;

  markers.setGeometries([]);
  markers.updateGeometries([
    {
      id: '0', // 点标注数据数组
      position: suggestionList.value[index].location,
    },
  ]);
  var infoWindow = new TMap.InfoWindow({
    map: map,
    position: suggestionList.value[index].location,
    content: `<h3>${suggestionList.value[index].title}</h3><p>地址：${suggestionList.value[index].address}</p>`,
    offset: {x: 0, y: -50},
  });
  infoWindowList.push(infoWindow);
  map.setCenter(suggestionList.value[index].location);
  markers.on('click', (e) => {
    infoWindowList[Number(e.geometry.id)].open();
  });

}

function searchByKeyword() {
  // 关键字搜索功能
  infoWindowList.forEach((infoWindow) => {
    infoWindow.close();
  });
  infoWindowList.length = 0;
  markers.setGeometries([]);
  search
      .searchRectangle({
        keyword: keyword.value,
        bounds: map.getBounds(),
      })
      .then((result) => {
        result.data.forEach((item, index) => {
          var geometries = markers.getGeometries();
          var infoWindow = new TMap.InfoWindow({
            map: map,
            position: item.location,
            content: `<h3>${item.title}</h3><p>地址：${item.address}</p><p>电话：${item.tel}</p>`,
            offset: {x: 0, y: -50},
          });
          infoWindow.close();
          infoWindowList[index] = infoWindow;
          geometries.push({
            id: String(index),
            position: item.location,
          });
          markers.updateGeometries(geometries);
          markers.on('click', (e) => {
            infoWindowList[Number(e.geometry.id)].open();
          });
        });
      });
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
