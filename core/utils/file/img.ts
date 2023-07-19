//图片添加水印
import {changeFileNameSuffix} from "./file.ts";
import {FileZipConfig} from "../../type/sys/file.ts";

export const imgZip = async (file: File, config: FileZipConfig) => {
    const newFile = await imgZipCore(file, config)
    return newFile;
}


export const fileToDataURL = (file: Blob): Promise<any> => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = (e) => resolve((e.target as FileReader).result)
        reader.readAsDataURL(file)
    })
}
const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = dataURL
    })
}
export const canvas2file = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
}
/**
 * 图片压缩方法
 * @param {Object}  file 图片文件
 * @param config
 * @returns 压缩后的新图片
 */
export const imgZipCore = async (file: File, config: FileZipConfig) => {
    let fileType = 'image/jpeg'
    if (!config.zipNum) {
        config.zipNum = 0.5
    }

    const fileName = changeFileNameSuffix(file.name, 'jpg')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const base64 = await fileToDataURL(file)
    const img = await dataURLToImage(base64)
    canvas.width = img.width
    canvas.height = img.height
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, img.width, img.height)
    const blob = (await canvas2file(canvas, fileType, config.zipNum)) as Blob // quality:0.5可根据实际情况计算
    const newFile = await new File([blob], fileName, {
        type: fileType
    })
    if (newFile.size > file.size) {
        return file;
    }
    return newFile
}

