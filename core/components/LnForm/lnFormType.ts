import {AddressMapType, AddressPosType} from "../../type/sys/address.ts";
import {SelectOptionType} from "../../type/form.ts";

export interface LnFormItemPropsType {
    label: string
    name: string
    rule?: any[],
    extra?: string, //备注
    config?: any,



    uploadType?: 'oss' | 'cos' | 'http',  //文件上传的方式
    useJson?: boolean, //数组结构的数据是否使用json格式
    fileTypeList?: string, //可上传的文件类型列表使用,分割，例如： "image/png, image/jpeg"
    fileSizeMax?: string, //可上传的最大文件格式大小, kK,mM,gG
    fileNum?: number, //可上传的文件数量


    addressMapType?: AddressMapType //地图类型
    addressPosType?: AddressPosType //地址经纬读类型

    showSsx?: boolean //显示省市县
    ssxName?: string //省市县字段名字

    minRows?: number //多行文本高度
    maxRows?: number //多行文本高度

    selectOptionList?:SelectOptionType[] //选项列表

    onChange?: any

}

export interface LnFormPropsType {
    labelCol?: any //表单字段的宽度
    wrapperCol?: any //整体宽度
    modalWith?: string //模态框宽度

    showSubmit?: boolean //提交按钮是否显示

    onOk?: any
    onFinish?: any
    onFinishFailed?: any

    title?: string //表单标题
}

export interface LnTablePropsType {
    columns?: any[] //字段
}
