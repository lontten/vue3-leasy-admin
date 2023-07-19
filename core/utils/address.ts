import {AddressPosType} from "../type/sys/address.ts";

export const addressPosTo = (address: { lat: string, lng: string }, type: AddressPosType) => {
    const {lat, lng} = address
    let pos
    switch (type) {
        case 'obj':
            pos = {lng: lng, lat: lat};
            break
        case 'lat_lng':
            pos = `${lat},${lng}`;
            break
        case 'lng_lat':
            pos = `${lng},${lat}`;
            break
    }
    return pos
}

export const addressPosForm = (pos: any, type: AddressPosType) => {
    let address
    let lat
    let lng
    switch (type) {
        case 'obj':
            address = pos
            break
        case 'lat_lng':
            lat = pos.split(',')[0]
            lng = pos.split(',')[1]
            address = {lng: lng, lat: lat}
            break
        case 'lng_lat':
            lat = pos.split(',')[1]
            lng = pos.split(',')[0]
            address = {lng: lng, lat: lat}
            break
    }
    return address
}
