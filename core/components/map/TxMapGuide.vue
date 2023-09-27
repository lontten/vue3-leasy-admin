<template>
  <div class="map">
    <div class="map-base">
      <div id="container"></div>
    </div>


  </div>


</template>
<script lang="ts" setup>
import {onMounted} from "vue";
import {addressIpToLatLngStr, addressPosTo} from "@core/utils/address.ts";
import {AddressIp, AddressPosTypeEnum} from "@core/type/sys/address.ts";

const TMap: any = (window as any).TMap;


interface Props {
  address: AddressIp
}

const {address} = defineProps<Props>()
let map;

// 创建信息窗
let info //POI信息窗

let geocoder; //ip转化地址类
let markers;
let type = AddressPosTypeEnum.LNG_LAT

const initMap = async () => {
  //定义地图中心点坐标
  let center = new TMap.LatLng(39.984120, 116.307484);


  const ipLocation = new TMap.service.IPLocation(); // 新建一个IP定位类
  const result = await ipLocation.locate({})
  if (result.status == 0) {
    const {lat, lng} = result.result.location
    center = new TMap.LatLng(lat, lng);
  }

  // console.log('定位，', center)
  // console.log('终点，', address)

  let formIPStr = addressIpToLatLngStr({
    pos: center,
    type: AddressPosTypeEnum.OBJ,
  })
  let toIPStr = addressIpToLatLngStr(address)


  var infoWindowLocation = new TMap.LatLng(center.lat, center.lng);//创建一个坐标
//创建InfoWindow实例，并进行初始化
  var infowindow = new TMap.InfoWindow({
    content: "开始", //信息窗口内容
    position: infoWindowLocation,//显示信息窗口的坐标
    map: map
  });
  infowindow.open()


  //定义map变量，调用 TMap.Map() 构造函数创建地图
  map = new TMap.Map(document.getElementById('container'), {
    center: center,//设置地图中心点坐标
    zoom: 15,   //设置地图缩放级别
    // pitch: 43.5,  //设置俯仰角
    rotation: 45    //设置地图旋转角度
  });


  //WebServiceAPI请求URL（驾车路线规划默认会参考实时路况进行计算）
  var url = "https://apis.map.qq.com/ws/direction/v1/driving/"; //请求路径
  url += "?from=" + formIPStr;  //起点坐标
  url += "&to=" + toIPStr;  //终点坐标
  url += "&output=jsonp&callback=cb";  //指定JSONP回调函数名，本例为cb
  url += "&key=" + import.meta.env.VITE_TX_MAP_KEY; //开发key，可在控制台自助创建

  console.log('url,', url)
  //发起JSONP请求，获取路线规划结果
  jsonp_request(url);
};


//浏览器调用WebServiceAPI需要通过Jsonp的方式，此处定义了发送JOSNP请求的函数
function jsonp_request(url) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}

//定义请求回调函数
window.cb = (ret) => {
  //从结果中取出路线坐标串
  var coors = ret.result.routes[0].polyline, pl = [];
  //坐标解压（返回的点串坐标，通过前向差分进行压缩，因此需要解压）
  var kr = 1000000;
  for (var i = 2; i < coors.length; i++) {
    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
  }
  //将解压后的坐标生成LatLng数组
  for (var i = 0; i < coors.length; i += 2) {
    pl.push(new TMap.LatLng(coors[i], coors[i + 1]));
  }
  display_polyline(pl)//显示路线
}


function display_polyline(pl) {
  //创建 MultiPolyline显示折线
  var polylineLayer = new TMap.MultiPolyline({
    id: 'polyline-layer', //图层唯一标识
    map: map,//绘制到目标地图
    //折线样式定义
    styles: {
      'style_blue': new TMap.PolylineStyle({
        'color': '#3777FF', //线填充色
        'width': 6, //折线宽度
        'borderWidth': 5, //边线宽度
        'borderColor': '#FFF', //边线颜色
        'lineCap': 'round' //线端头方式
      })
    },
    //折线数据定义
    geometries: [
      {
        'id': 'pl_1',//折线唯一标识，删除时使用
        'styleId': 'style_blue',//绑定样式名
        'paths': pl
      }
    ]
  });
}

// 经纬度转化地址
const pos2Address = async (pos: any) => {
  map.setCenter(pos);
  const {status, result} = await geocoder.getAddress({location: pos}) // 将给定的坐标位置转换为地址
  if (status != 0) {
    return null
  }
  const {address_component, formatted_addresses} = result
  const {province, city, district} = address_component

  // 显示搜索到的地址
  let address = ''
  if (formatted_addresses) {
    if (formatted_addresses.recommend) {
      address = province + city + formatted_addresses.recommend
    }
  }
  return {
    province, city, district, address, pos: addressPosTo({
      lat: pos.lat,
      lng: pos.lng
    }, type)
  }
}


//定义事件处理方法
const clickHandler = async (e: any) => {
  let addressInfo: any = await pos2Address(e.latLng)
  addressInfo.pos = addressPosTo(e.latLng, type)

  // 获取click事件返回的poi信息
  let poi = e.poi;
  if (poi) {
    // 拾取到POI
    info.setContent(poi.name).setPosition(poi.latLng).open();
    addressInfo.address = addressInfo.address + '-' + poi.name
  } else {
    // 没有拾取到POI
    info.close();
  }

  address.value = addressInfo
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
  max-height: 800px;
}


#panel {
  position: absolute;
  background: #FFF;
  width: 250px;
  padding: 10px;
  z-index: 9999;
  top: 30px;
  left: 30px;
}


.options {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2rem;
}

.title {
  width: 3rem;
  text-align: justify;
  display: inline-block;
  text-align-last: justify;
}


.map {
  display: flex;
}

.ssx-search {
  flex: 1;
}

.map-base {
  width: 100%;
}
</style>
