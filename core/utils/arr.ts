export const isHasList = (arr: any) => {
    if (arr) {
        if (arr instanceof Array) {
            return arr.length > 0
        }
    }
    return false
}
