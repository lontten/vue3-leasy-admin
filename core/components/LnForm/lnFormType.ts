import {AddressMapType, AddressPosType} from "../../type/sys/address.ts";

export interface LnFormPropsType {
    label?: string
    name?: string
    rule?: any[],
    min?: number,
    max?: number,
    uploadType?: 'oss' | 'cos' | 'http',
    useJson?: boolean,
    fileTypeList?: string[],
    fileSizeMax?:number,


    addressMapType?:AddressMapType //地图类型
    addressPosType?:AddressPosType //地址经纬读类型
}
