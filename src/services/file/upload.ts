import axios from "axios";

export const fileUploadOssPolicy = async () => {
    return await axios.get("/api/file/upload/oss/policy")
}

export const fileUploadCosPolicy = async () => {
    return await axios.get("/api/file/upload/cos/policy")
}
