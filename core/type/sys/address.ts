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
