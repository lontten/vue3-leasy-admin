import {AddressMapType, AddressPosType} from "../../type/sys/address.ts";

export interface LnFormPropsType {
    label?: string
    name?: string
    rule?: any[],
    min?: number,
    max?: number,
    uploadType?: 'oss' | 'cos' | 'http',  //文件上传的方式
    useJson?: boolean, //数组结构的数据是否使用json格式
    fileTypeList?: string[], //可上传的文件类型列表
    fileSizeMax?:number, //可上传的最大文件格式大小


    addressMapType?:AddressMapType //地图类型
    addressPosType?:AddressPosType //地址经纬读类型
}
