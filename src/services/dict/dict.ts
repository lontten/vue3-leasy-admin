import {message} from "ant-design-vue";
import {baseReq} from "@src/utils/axios.ts";

/**
 * 添加
 * @param param
 */
export const dictAdd = async (param: any) => {
    const {code} = await baseReq().post('/dict', param)
    if (code != 'A000') {
        message.error('添加失败')
        return false
    } else {
        message.info('添加成功')
        return true
    }
}

/**
 * 编辑
 * @param param
 */
export const dictUpd = async (param: any) => {
    const id = param.id
    delete param.id
    const {code} = await baseReq().put('/dict/' + id, param)
    if (code != 'A000') {
        message.error('修改失败')
        return false
    } else {
        message.info('修改成功')
        return true
    }
}


/**
 * 列表--分页
 * @param param
 */
export const dictListPage = async (param: any) => {
    const {code, data} = await baseReq().post('/dict/list/page', param);
    if (code != 'A000') {
        return {
            records: [],
            total: 0,
            pages: 0,
            current: 1,
            size: 10
        }
    }
    return data
}

/**
 * 列表--全部
 * @param param
 */
export const dictListAll = async (param: any) => {
    const {code, data} = await baseReq().post('/dict/list/all', param);
    if (code != 'A000') {
        return []
    }
    return data
}

// 模糊查询
export const dictLikeListAll = async (param: any) => {
    const {code, data} = await baseReq().post('/dict/like/list/all', param);
    if (code != 'A000') {
        return []
    }
    return data
}

// 删除
export const dictDel = async (param: any) => {
    const id = param.id
    const {code} = await baseReq().del('/dict/' + id)
    if (code != 'A000') {
        message.error('删除失败')
        return false
    } else {
        message.info('删除成功')
        return true
    }
}

/**
 * 停用
 * @param param
 */

export const dictStop = async (param: any) => {
    const id = param.id
    const {code} = await baseReq().put('/dict/stop/' + id)
    if (code != 'A000') {
        message.error('停用失败')
        return false
    } else {
        message.info('停用成功')
        return true
    }
}

/**
 * 启用
 * @param param
 */

export const dictStart = async (param: any) => {
    const id = param.id
    const {code} = await baseReq().put('/dict/start/' + id)
    if (code != 'A000') {
        message.error('启用失败')
        return false
    } else {
        message.info('启用成功')
        return true
    }
}
