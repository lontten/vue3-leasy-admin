import {fileUploadCosPolicy} from "@/services/file/upload.ts";
import {message} from "ant-design-vue";
import * as COS from "cos-nodejs-sdk-v5";
import {v4} from "uuid";
import {getFileNameSuffixDot} from "./file.ts";

const getTxCosConfig = async () => {
    const v = await fileUploadCosPolicy()
    const {code, data} = v.data
    if (code != 'A000') {
        message.error('文件上传失败!');
        return {}
    }
    return data
}


// @ts-ignore
const cosFileUpload = async (file: any, onProgress?: (e: any) => {}) => {
    const data: any = await getTxCosConfig()
    if (!data) {
        return {}
    }

    // 这里省略初始化过程和上传参数
    // @ts-ignore
    const cos = new COS({
        TmpSecretId: data.tmpSecretId,        // 临时密钥的 tmpSecretId
        TmpSecretKey: data.tmpSecretKey,      // 临时密钥的 tmpSecretKey
        SecurityToken: data.sessionToken, // 临时密钥的 sessionToken
        ExpiredTime: data.expiredTime,               // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds

        SimpleUploadMethod: 'putObject', // 强烈建议，高级上传、批量上传内部对小文件做简单上传时使用putObject
    });

    const fileName = file.name
    let nameStr = data.dir + v4() + getFileNameSuffixDot(fileName);

    const resp = await cos.uploadFile({
        FilePath: "",
        Bucket: data.bucket, /* 填写自己的 bucket，必须字段 */
        Region: data.region,     /* 存储桶所在地域，必须字段 */
        Key: nameStr,              /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        StorageClass: 'STANDARD',
        Body: file,
        onProgress: onProgress
    })
    console.log('resp:', resp)
    if (resp.statusCode == 200 && resp.Location) {
        return {
            isOk: true,
            url: 'https://' + resp.Location
        }
    } else {
        return {
            isOk: false,
            url: ''
        }
    }
}

