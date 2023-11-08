import {baseReq} from "@src/utils/axios.ts";

export const getUserInfo = async () => {
    const {code, data} = await baseReq().get('/login/current-user' );
    if (code != 'A000') {
        return null
    }
    return data
}
