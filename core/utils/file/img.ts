//图片添加水印
import {FileZipConfig} from "../../type/sys.ts";

export const x = (file: any) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img: HTMLImageElement = document.createElement('img');
            img.src = reader.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = 'red';
                ctx.textBaseline = 'middle';
                ctx.font = '33px Arial';
                ctx.fillText('Ant Design Vue', 20, 20);
                canvas.toBlob(resolve);
            };
        };
    });
}
const imgZipCore = (file: any, config: FileZipConfig) => {
    if (!config.zipNum) {
        config.zipNum = 1
    }
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img: HTMLImageElement = document.createElement('img');
            img.src = reader.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                canvas.toBlob(resolve, file.type, config?.zipNum);
            };
        };
    });
}
export const imgZip = async (file: any, config: FileZipConfig) => {
    const newFile: any = await imgZipCore(file, config)
    newFile.name = file.name
    return newFile;
}
