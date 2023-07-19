import {canvas2file} from "./img.ts";

const loadVideoFile = (url: string) => {
    return new Promise(function (resolve) {
        let video = document.createElement("video");
        video.setAttribute('crossOrigin', 'anonymous');//处理跨域
        video.setAttribute('src', url);
        video.setAttribute('width', '400');
        video.setAttribute('height', '240');
        video.setAttribute('preload', 'auto');
        video.addEventListener('loadeddata', () => {
            resolve(video)
        });
    })
}


export const getVideoInfo = async (file: File | string | any): Promise<VideoInfoType> => {
    if (file instanceof File) {
        file = URL.createObjectURL(file)
    }
    const video: any = await loadVideoFile(file)
    const {duration, videoWidth, videoHeight} = video

    const canvas: any = document.createElement("canvas")
    canvas.width = videoWidth
    canvas.height = videoHeight
    canvas.getContext("2d").drawImage(video, 0, 0, videoWidth, videoHeight); //绘制canvas
    const dataURL = canvas.toDataURL('image/jpeg'); //转换为base64

    return {
        dataURL,
        duration, videoWidth, videoHeight
    }
}

export const getVideoInfoImgFile = async (file: File | string | any): Promise<VideoInfoType> => {
    if (file instanceof File) {
        file = URL.createObjectURL(file)
    }
    const video: any = await loadVideoFile(file)
    const {duration, videoWidth, videoHeight} = video

    const canvas: any = document.createElement("canvas")
    canvas.width = videoWidth
    canvas.height = videoHeight
    canvas.getContext("2d").drawImage(video, 0, 0, videoWidth, videoHeight); //绘制canvas
    const blob = (await canvas2file(canvas, 'image/jpeg', 0.5)) as Blob // quality:0.5可根据实际情况计算
    const newFile = await new File([blob], 'x.jpg', {
        type: 'image/jpeg'
    })
    return {
        file: newFile,
        duration, videoWidth, videoHeight
    }
}

interface VideoInfoType {
    dataURL?: string,
    file?: File,
    duration: number,
    videoWidth: number,
    videoHeight: number,
}
