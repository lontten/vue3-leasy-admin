// 文件压缩配置
export interface FileUploadConfig {
    zipConfig?: {
        zipNum?: number
        sizeMax?: number
    },
    fileStatusEvent?: any
}
