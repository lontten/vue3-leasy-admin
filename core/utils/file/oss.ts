import {fileUploadOssPolicy} from "@src/services/file/upload.ts";
import {message} from "ant-design-vue";
import {v4} from "uuid";
import axios from "axios";
import {imgZip} from "./img.ts";
import {getFileNameSuffixDot} from "./file.ts";
import {getVideoInfoImgFile} from "./video.ts";
import {FileUploadConfig} from "../../type/sys/file.ts";

// @ts-ignore
export const ossFileUpload = async (file: any, config?: FileZipConfig) => {
    let newFile = file
    if (config) {
        newFile = await imgZip(file, config)
    }

    const {code, data} = await fileUploadOssPolicy();
    if (code != 'A000') {
        console.log('获取oss policy 失败')
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
    try {
        const {statusText} = await axios.post(ossData.host, formData, {headers: {"Content-Type": 'multipart/form-data'}})
        if (statusText == 'OK') {
            file.status = 'done'
            const url = ossData.host + "/" + nameStr
            file.url = url
            file.updateFileUrl = url
            return url
        }
    } catch (e) {
        console.log('put host', e)
    }
    file.status = 'error'
    return null
}


// @ts-ignore
export const ossVideoUpload = async (file: any, config?: FileUploadConfig) => {
    let newFile = file
    if (!config) {
        config = {}
    }
    if (config.zipConfig) {
        newFile = await imgZip(file, config)
    }

    const {code, data} = await fileUploadOssPolicy();
    if (code != 'A000') {
        console.log('获取oss policy 失败')
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
    if (config.fileStatusEvent) {
        config.fileStatusEvent('uploading')
    }
    try {
        const {statusText} = await axios.post(ossData.host, formData, {headers: {"Content-Type": 'multipart/form-data'}})
        if (statusText == 'OK') {
            if (config.fileStatusEvent) {
                config.fileStatusEvent('done')
            }
            const url = ossData.host + "/" + nameStr
            file.updateFileUrl = url

            // --------------file-img
            file.url = await videoImgUpload(file, nameStr)

            return url
        }
    } catch (e) {
        console.log('put host', e)
    }
    if (config.fileStatusEvent) {
        config.fileStatusEvent('error')
    }
    return null
}

const videoImgUpload = async (file: any, fileName: string) => {
    const {file: imgFile} = await getVideoInfoImgFile(file)

    const {code, data} = await fileUploadOssPolicy();
    if (code != 'A000') {
        console.log('获取oss policy 失败')
        message.error('文件上传失败!');
        return null
    }
    const ossData = data

    let nameStr = fileName + '.cover_img.jpg'

    const formData = {
        key: nameStr,
        policy: ossData.policy, // 输入你获取的的policy
        OSSAccessKeyId: ossData.accessId, // 输入你的AccessKeyId
        success_action_status: '200', // 让服务端返回200,不然，默认会返回204
        Signature: ossData.signature, // 输入你获取的的signature
        file: imgFile
    }
    try {
        const {statusText} = await axios.post(ossData.host, formData, {headers: {"Content-Type": 'multipart/form-data'}})
        if (statusText == 'OK') {
            return ossData.host + "/" + nameStr
        }
    } catch (e) {
        console.log('put host', e)
    }
    return null
}
