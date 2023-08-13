export const isHasList = (arr: any) => {
    if (arr) {
        if (arr instanceof Array) {
            return arr.length > 0
        }
    }
    return false
}
export const list2obj = (list: any | any[]) => {
    let obj: any = {}
    if (list) {
        if (list instanceof Array) {
            list.forEach(value => obj[value.value] = value)
        } else {
            return list
        }
    }
    return obj;
}
