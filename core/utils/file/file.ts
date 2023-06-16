//获取文件后缀名
export const getFileNameSuffix = (fileName: string) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1);
}
//获取文件后缀名 带 .
export const getFileNameSuffixDot = (fileName: string) => {
    return fileName.substring(fileName.lastIndexOf('.'));
}

//修改文件后缀名 带 .
export const changeFileNameSuffix = (fileName: string, suffix: string) => {
    return fileName.substring(0, fileName.lastIndexOf('.') + 1) + suffix;
}
