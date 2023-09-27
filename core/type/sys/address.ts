export interface AddressType {
    pos?: {
        lat: string,
        lng: string
    } | string,
    province?: string,
    city?: string
    district?: string
    address?: string
}

export interface AddressIp {
    pos: {
        lat: string,
        lng: string
    } | string,
    type: AddressPosType
}

export type AddressPosType = 'obj' | 'lat_lng' | 'lng_lat'
export const AddressPosTypeEnum = {
    OBJ: 'obj' as AddressPosType,
    LAT_LNG: 'lat_lng' as AddressPosType,
    LNG_LAT: 'lng_lat' as AddressPosType,
}
export type AddressMapType = 'tx' | 'gd' | 'baidu'
export const AddressMapTypeEnum = {
    TX: 'tx' as AddressMapType,
    GD: 'gd' as AddressMapType,
    BAIDU: 'baidu' as AddressMapType,
}
