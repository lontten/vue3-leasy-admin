import {baseReq} from "@/utils/axios.ts";

const req = baseReq()
export const apiLogin = (data: any) => {
    return req.post('/login/account', data);
};