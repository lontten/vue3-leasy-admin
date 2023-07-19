import {baseReq} from "@/utils/axios.ts";

export const fileUploadOssPolicy = async () => {
    return await baseReq().get("/file/upload/oss/policy")
}

export const fileUploadCosPolicy = async () => {
    return await baseReq().get("/file/upload/cos/policy")
}
