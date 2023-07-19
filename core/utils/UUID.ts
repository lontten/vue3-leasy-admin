export const is_uuid_zero = (str: string) => {
    if (str == "00000000000000000000000000000000") {
        return true
    }

    if (str == "00000000-0000-0000-0000-000000000000") {
        return true
    }
    return false
}
