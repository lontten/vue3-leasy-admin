import axios from "axios";

export const fileUploadOssPolicy = async () => {
    return await axios.get("/file/upload/oss/policy")
}
