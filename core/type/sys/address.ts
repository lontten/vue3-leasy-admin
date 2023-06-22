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

export type AddressPosType = 'obj' | 'lat_lng' | 'lng_lat'
export type AddressMapType = 'tx' | 'gd' | 'baidu'
