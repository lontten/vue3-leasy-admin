import {MockMethod} from 'vite-plugin-mock'
import {ResponseType} from "../../type/api";
import {PageType} from "../../type/page";

export default [
    {
        url: '/api/table/list/page',
        method: 'get',
        response: ({query, body}): ResponseType<PageType<any>> => {
            const {pageIndex, pageSize, key1, key2} = body
            console.log('body:', body)
            return {
                "code": "A000",
                "data": {
                    "records": [
                        {
                            "id": "string",
                            "createTime": "string",
                            "updateTime": "string",
                            "payTime": "string",
                            "loApplyStatus": 0,
                            "loPaymentStatus": 0,
                            "loRefundStatus": 0,
                            "loAbolishStatus": 0,
                            "loHandleStatus": 0,
                            "uid": "string",
                            "goodsId": "string",
                            "loAddressId": "string",
                            "loShowTradeNo": "string",
                            "loTitle": "string",
                            "loTargetType": 0,
                            "loPayMoney": 0,
                            "loDscountMoney": 0,
                            "loTotalMoney": 0,
                            "loNum": 0,
                            "ugrId": "string",
                            "loFreightMoney": 0,
                            "goodsTitle": "string",
                            "goodsCoverImg": "string",
                            "loEvaluation": true,
                            "loRemarks": "string",
                            "nickname": "string",
                            "avatar": "string",
                            "loAddressPhone": "string",
                            "loAddressName": "string",
                            "loAddressAddress": "string",
                            "goodsCityDeliveryType": "string",
                            "goodsShowStatusName": "string",
                            "goodsShowStatus": 0
                        }
                    ],
                    "total": 0,
                    "pages": 0,
                    "current": 0,
                    "size": 0
                },
                "msg": {}
            }
        },
    },
] as MockMethod[]
