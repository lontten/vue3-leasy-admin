import {baseReq} from "@src/utils/axios.ts";

const req = baseReq()
export const apiLogin = (data: any) => {
    return req.post('/login/account', data);
};

// 修改密码
export const apiPwdUpd = (data: any) => {
    return req.put('/login/pwd', data);
};