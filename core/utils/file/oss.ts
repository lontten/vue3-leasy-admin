import {fileUploadOssPolicy} from "@/services/file/upload.ts";
import {message} from "ant-design-vue";
import {v4} from "uuid";
import axios from "axios";
import {imgZip} from "./img.ts";
import {FileZipConfig} from "../../type/sys.ts";
import {getFileNameSuffix, getFileNameSuffixDot} from "./file.ts";

// @ts-ignore
export const ossFileUpload = async (file: any, config?: FileZipConfig) => {
    let newFile = file
    if (config) {
        newFile = await imgZip(file, config)
    }

    const v = await fileUploadOssPolicy();
    const {code, data} = v.data
    if (code != 'A000') {
        message.error('文件上传失败!');
        return null
    }
    const ossData = data

    const fileName = file.name
    let nameStr = ossData.dir + v4() + getFileNameSuffixDot(fileName);

    const formData = {
        key: nameStr,
        policy: ossData.policy, // 输入你获取的的policy
        OSSAccessKeyId: ossData.accessId, // 输入你的AccessKeyId
        success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        Signature: ossData.signature, // 输入你获取的的signature
        file: newFile
    }
    file.status = 'uploading'
    console.log('do ing up')
    try {
        const {statusText} = await axios.post(ossData.host, formData, {headers: {"Content-Type": 'multipart/form-data'}})
        if (statusText == 'OK') {
            file.status = 'done'
            return ossData.host + "/" + nameStr
        }
    } catch (e) {
        console.log('put host', e)
    }

    file.status = 'error'
    return null
}

