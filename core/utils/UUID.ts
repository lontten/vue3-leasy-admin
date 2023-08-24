/**
 * 判断字符串 是不是 为0的uuid
 * @param str
 */
export const is_uuid_zero = (str: string) => {
    if (str == "00000000000000000000000000000000") {
        return true
    }
    return str == UUID_ZERO;
}
export const UUID_ZERO = "00000000-0000-0000-0000-000000000000"
