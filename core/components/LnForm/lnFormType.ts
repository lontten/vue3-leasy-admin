export interface LnFormPropsType {
    label?: string
    name?: string
    rule?: any[],
    min?: number,
    max?: number,
    uploadType: 'oss' | 'cos' | 'http',
    useJson?: boolean,
    fileTypeList?: string[],
    fileSizeMax?:number,
}
