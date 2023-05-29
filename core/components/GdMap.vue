<template>
  <div id="container"></div>

</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import {onMounted, reactive} from "vue";

const state = reactive({
  path: [],
  current_position: [],
});

let map;
let marker;
let infoWindow;
let geolocation; //ip定位

//进行地图初始化
const initMap = async () => {
  const AMap = await AMapLoader.load({
    key: "5297e3a63a0d02c70822e57f95edc42d",             // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })

  const lnglat = new AMap.LngLat(116.397, 39.918); //默认位置


  // 初始化
  marker, map = new AMap.Map("container", {  //设置地图容器id
    viewMode: "2D",    //是否为3D地图模式
    zoom: 11,           //初始化地图级别
    center: lnglat, //初始化地图中心点位置
    // mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
  });

  //为地图注册click事件获取鼠标点击出的经纬度坐标
  map.on('click', function (e) {
    console.log(e)
    console.log('lng,lat::' + e.lnglat.getLng() + ',' + e.lnglat.getLat())

    addMarker([e.lnglat.getLng(), e.lnglat.getLat()])

  });


  // 显示工具条
  let toolbar;
  AMap.plugin('AMap.ToolBar', function () { // 异步加载插件
    toolbar = new AMap.ToolBar(); // 缩放工具条实例化
    map.addControl(toolbar);
  });


  // 实例化点标记
  function addMarker(lnglat) {
    clearMarker()
    marker = new AMap.Marker({
      icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      position: lnglat,
      offset: new AMap.Pixel(-20, -60)
    });
    marker.setMap(map);
  }

  // 清除 marker
  function clearMarker() {
    if (marker) {
      marker.setMap(null);
      marker = null;
    }
  }


  // 自动定位ip
  AMap.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认：true
      timeout: 10000, // 设置定位超时时间，默认：无穷大
      offset: [10, 20],  // 定位按钮的停靠位置的偏移量
      zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      position: 'RT' //  定位按钮的排放位置,  RB表示右下
    });

    // map.addControl(geolocation);
    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        onComplete(result)
      } else {
        onError(result)
      }
    });

    function onComplete(data) {
      // data是具体的定位信息
      console.log('data是具体的定位信息', data)
      //自定定位到网页ip的位置
      map.setCenter([data.position.lng, data.position.lat], true)
    }

    function onError(data) {
      // 定位出错
      console.log('定位出错', data)
    }
  })

}


onMounted(() => {
  initMap();
})
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}


.info-title {
  font-weight: bolder;
  color: #000;
  font-size: 14px;
  width: 250px;
  line-height: 26px;
  padding: 0 0 0 6px;
}

.info-content {
  width: 250px;
  padding: 4px;
  color: #666666;
  line-height: 23px;
  font: 12px Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial;
}

.info-content img {
  float: left;
  margin: 3px;
}

.amap-info-combo .keyword-input {
  height: auto;
}
</style>

