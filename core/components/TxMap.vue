<template>
  <div class="map">
    <div class="map-base">

      <div id="container"></div>
      <div id="panel">
        <p>搜索</p>
        <input id='keyword' type="text" v-model="keyword">
        <input id="search" type="button" class="btn" value="搜索" @click="searchByKeyword"/>
      </div>

    </div>

    <div class="ssx-search" v-show="true">
      <h4>下属行政区查询</h4>
      <div class="input-item">
        <div class="title">省市区</div>
        <select id='province' style="width:200px" @change='search2'></select>
      </div>
      <div class="input-item">
        <div class="title">地级市</div>
        <select id='city' style="width:200px" @change='search2'></select>
      </div>
      <div class="input-item">
        <div class="title">区县</div>
        <select id='district' style="width:200px" @change='search2'></select>
      </div>
      <div class="input-item" v-show="false">
        <div class="title">街道</div>
        <select id='street' style="width:200px" @change='search2'></select>
      </div>
    </div>


    <div class="ssx-search2" v-if="false">
      <h4>下属行政区查询2</h4>
      <LnSsx :getSsxList="getSsxList"></LnSsx>
    </div>

  </div>


</template>
<script lang="ts" setup>
import {onMounted, ref, toValue} from "vue";
import {AddressPosType, AddressPosTypeEnum, AddressType} from "../type/sys/address.ts";
import {addressPosForm, addressPosTo} from "../utils/address.ts";
import LnSsx from "./LnSsx.vue";

const TMap: any = (window as any).TMap;

let address = defineModel<AddressType>()

interface Props {
  type?: AddressPosType
}

const {type = AddressPosTypeEnum.LNG_LAT} = defineProps<Props>()
let map;

// 创建信息窗
let info //POI信息窗

//搜索提示
let search;  // 新建一个地点搜索类
let suggest; // 新建一个关键字输入提示类
let geocoder; //ip转化地址类
let markers;
let infoWindowList

//省市县
let provinceSelect;
let citySelect;
let districtSelect;
let areaSelect;
let provinceList = [];
let cityList = [];
let districtList = [];
let areaList = [];
let district;
let polygons;

let ssx1List = ref([])

const focus = () => {
  console.log('focus');
};


const initMap = async () => {
  //定义地图中心点坐标
  let center = new TMap.LatLng(39.984120, 116.307484);
  if (address.value && address.value?.pos) {
    const {lat, lng} = addressPosForm(address.value?.pos, type)
    center = new TMap.LatLng(lat, lng);
  } else {
    const ipLocation = new TMap.service.IPLocation(); // 新建一个IP定位类
    const result = await ipLocation.locate({})
    if (result.status==0){
      const {lat, lng} =result.result.location
      center = new TMap.LatLng(lat, lng);
    }
  }


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

  geocoder = new TMap.service.Geocoder(); // 新建一个正逆地址解析类


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


  //------------------省市县
  provinceSelect = document.getElementById('province');
  citySelect = document.getElementById('city');
  districtSelect = document.getElementById('district');
  areaSelect = document.getElementById('street');
  district = new TMap.service.District({
    // 新建一个行政区划类
    polygon: 2, // 返回行政区划边界的类型
  });
  polygons = new TMap.MultiPolygon({
    map: map,
    geometries: [],
  });
  district.getChildren().then((result) => {
    // 获取省市区列表及其边界信息
    provinceList = result.result[0];
    provinceSelect.add(new Option('---请选择---'));
    provinceList.forEach((province, index) => {
      provinceSelect.add(new Option(province.fullname, index.toString()));
    });
    ssx1List.value = provinceList.map(value => {
      return {
        label: value.fullname,
        value: value.fullname,
      }
    })
    citySelect.innerHTML = '';
    districtSelect.innerHTML = '';
    areaSelect.innerHTML = '';
  });

};


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


const getSsxList = () => {
  return []
}

const keyword = ref('')


const searchByKeyword = async () => {
  // 关键字搜索功能
  infoWindowList.forEach((infoWindow) => {
    infoWindow.close();
  });

  infoWindowList.length = 0;
  markers.setGeometries([]);

  const result = await search.searchRectangle({
    keyword: toValue(keyword),
    bounds: map.getBounds(),
  })

  result.data.forEach((item, index) => {
    const geometries = markers.getGeometries();
    const infoWindow = new TMap.InfoWindow({
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
    markers.on('click', async (e) => {
      if (flagCanOne) {
        await searchClick(e, result.data)
      }
    });
  });

}

//防止searchClick多次重复调用
let flagCanOne = true
const searchClick = async (e: any, list: any[]) => {
  flagCanOne = false
  const info = list[e.geometry.id]
  let addressInfo: any = await pos2Address(e.latLng)
  console.log(addressInfo)  //这个log不能删除，不然会有bug
  addressInfo.address = info.address + '-' + info.title
  address.value = addressInfo
  infoWindowList[Number(e.geometry.id)].open();
  flagCanOne = true
}

// -------------------------------------------------------------


function search2(selector) {
  selector = selector.target
  console.log(selector.value)
  if (selector.id === 'province' && selector.value) {
    citySelect.innerHTML = '';
    districtSelect.innerHTML = '';
    areaSelect.innerHTML = '';
    citySelect.add(new Option('---请选择---'));
    district
        .getChildren({id: provinceList[selector.value].id})
        .then((result) => {
          // 根据选择的省市区获取其下级行政区划及其边界
          cityList = result.result[0];
          cityList.forEach((city, index) => {
            citySelect.add(new Option(city.fullname, index.toString()));
          });
        });
    drawPolygon(
        provinceList[selector.value].id,
        provinceList[selector.value].polygon
    ); // 根据所选区域绘制边界
  } else if (selector.id === 'city' && selector.value) {
    districtSelect.innerHTML = '';
    areaSelect.innerHTML = '';
    districtSelect.add(new Option('---请选择---'));
    district.getChildren({id: cityList[selector.value].id}).then((result) => {
      // 根据选择的地级市或直辖市区获取其下级行政区划及其边界
      if (result.result[0].length > 0 && result.result[0][0].id.length > 6) {
        // 直辖市的区的下级即为街道级，故略过一级
        districtList = [];
        districtSelect.innerHTML = '';
        districtSelect.add(new Option('---------'));
        areaList = result.result[0];
        areaSelect.add(new Option('---请选择---'));
        areaList.forEach((district, index) => {
          areaSelect.add(new Option(district.fullname, index.toString()));
        }); // 根据所选区域绘制边界
      } else {
        // 非直辖市的地级市之下有区县级
        districtList = result.result[0];
        districtList.forEach((district, index) => {
          districtSelect.add(new Option(district.fullname, index.toString()));
        });
      }
    });
    drawPolygon(cityList[selector.value].id, cityList[selector.value].polygon);
    // 根据所选区域绘制边界
  } else if (selector.id === 'district' && selector.value) {
    areaSelect.innerHTML = '';
    district
        .getChildren({id: districtList[selector.value].id})
        .then((result) => {
          // 根据选择的区县获取其下级行政区划及位置
          areaList = result.result[0];
          areaList.forEach((area: any, index) => {
            areaSelect.add(new Option(area.fullname, index.toString()));
          });
        });
    areaSelect.add(new Option('---请选择---'));
    drawPolygon(
        districtList[selector.value].id,
        districtList[selector.value].polygon
    );
  } else if (selector.id === 'street' && selector.value) {
    map.setCenter(areaList[selector.value].location);
    // 街道级仅提供位置信息不提供边界信息，故以设置地图中心代替边界绘制
  }
}


interface SsxSelectorType {
  id: 'province' | 'city' | 'district',
  value: number
}

function search3(selector: SsxSelectorType) {


  if (selector.id === 'province' && selector.value) {
    citySelect.innerHTML = '';
    districtSelect.innerHTML = '';
    areaSelect.innerHTML = '';
    citySelect.add(new Option('---请选择---'));
    district
        .getChildren({id: provinceList[selector.value].id})
        .then((result) => {
          // 根据选择的省市区获取其下级行政区划及其边界
          cityList = result.result[0];
          cityList.forEach((city, index) => {
            citySelect.add(new Option(city.fullname, index.toString()));
          });
        });
    drawPolygon(
        provinceList[selector.value].id,
        provinceList[selector.value].polygon
    ); // 根据所选区域绘制边界
  } else if (selector.id === 'city' && selector.value) {
    districtSelect.innerHTML = '';
    areaSelect.innerHTML = '';
    districtSelect.add(new Option('---请选择---'));
    district.getChildren({id: cityList[selector.value].id}).then((result) => {
      // 根据选择的地级市或直辖市区获取其下级行政区划及其边界
      if (result.result[0].length > 0 && result.result[0][0].id.length > 6) {
        // 直辖市的区的下级即为街道级，故略过一级
        districtList = [];
        districtSelect.innerHTML = '';
        districtSelect.add(new Option('---------'));
        areaList = result.result[0];
        areaSelect.add(new Option('---请选择---'));
        areaList.forEach((district, index) => {
          areaSelect.add(new Option(district.fullname, index.toString()));
        }); // 根据所选区域绘制边界
      } else {
        // 非直辖市的地级市之下有区县级
        districtList = result.result[0];
        districtList.forEach((district, index) => {
          districtSelect.add(new Option(district.fullname, index.toString()));
        });
      }
    });
    drawPolygon(cityList[selector.value].id, cityList[selector.value].polygon);
    // 根据所选区域绘制边界
  } else if (selector.id === 'district' && selector.value) {
    areaSelect.innerHTML = '';
    district
        .getChildren({id: districtList[selector.value].id})
        .then((result) => {
          // 根据选择的区县获取其下级行政区划及位置
          areaList = result.result[0];
          areaList.forEach((area, index) => {
            areaSelect.add(new Option(area.fullname, index.toString()));
          });
        });
    areaSelect.add(new Option('---请选择---'));
    drawPolygon(
        districtList[selector.value].id,
        districtList[selector.value].polygon
    );
  } else if (selector.id === 'street' && selector.value) {
    map.setCenter(areaList[selector.value].location);
    // 街道级仅提供位置信息不提供边界信息，故以设置地图中心代替边界绘制
  }
}


/**
 * 边界绘制
 * @param placeId
 * @param polygonArray
 */
function drawPolygon(placeId, polygonArray) {
  // 根据多边形顶点坐标数组绘制多边形
  polygons.remove(polygons.getGeometries().map((item) => item.id));
  let bounds = [];
  const newGeometries = polygonArray.map((polygon, index) => {
    bounds.push(fitBounds(polygon));
    return {
      id: `${placeId}_${index}`,
      paths: polygon,
    };
  });
  bounds = bounds.reduce((a, b) => {
    return fitBounds([
      a.getNorthEast(),
      a.getSouthWest(),
      b.getNorthEast(),
      b.getSouthWest(),
    ]);
  });
  polygons.updateGeometries(newGeometries);
  map.fitBounds(bounds);
}

function fitBounds(latLngList) {
  // 由多边形顶点坐标数组计算能完整呈现该多边形的最小矩形范围
  if (latLngList.length === 0) {
    return null;
  }
  let boundsN = latLngList[0].getLat();
  let boundsS = boundsN;
  let boundsW = latLngList[0].getLng();
  let boundsE = boundsW;
  latLngList.forEach((point: any) => {
    point.getLat() > boundsN && (boundsN = point.getLat());
    point.getLat() < boundsS && (boundsS = point.getLat());
    point.getLng() > boundsE && (boundsE = point.getLng());
    point.getLng() < boundsW && (boundsW = point.getLng());
  });
  return new TMap.LatLngBounds(
      new TMap.LatLng(boundsS, boundsW),
      new TMap.LatLng(boundsN, boundsE)
  );
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
