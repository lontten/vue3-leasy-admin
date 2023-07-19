import {MockMethod} from 'vite-plugin-mock'
import {ResponseType} from "../../type/api";
import {PageType} from "../../type/page";

export default [
    {
        url: '/api/dict/list/page',
        method: 'post',
        response: ({query, body}): ResponseType<PageType<any>> => {
            const {pageIndex, pageSize, key1, key2} = body
            console.log('body:', body)
            return {
                "code": "A000",
                "data": {
                    "records": [
                        {
                            "id": "1",
                            "createTime": "string1",
                            "updateTime": "string1",
                            "dictInfo": "string",
                            "dictSort": 1,
                            "uid": "string1",
                            "dictName": "string1",
                            "dictImg": "string1",
                            dictTagList: ['121', 'jsdafk'],
                        },
                        {
                            "id": "2",
                            "createTime": "string2",
                            "updateTime": "string2",
                            "dictInfo": "string",
                            "dictSort": 2,
                            "uid": "string2",
                            "dictName": "string2",
                            "dictImg": "string2",
                            dictTagList: ['121', 'jsdafk'],
                        }
                    ],
                    "total": 2,
                    "pages": 1,
                    "current": 1,
                    "size": 10
                },
                "msg": {}
            }
        },
    },
    {
        url: '/api/dict',
        method: 'post',
        response: ({body}): ResponseType<any> => {
            console.log('body:', body)
            return {
                "code": "A000",
                "data": {},
                "msg": {}
            }
        },
    },
    {
        url: '/api/dict/{id}',
        method: 'put',
        response: ({query, body}): ResponseType<any> => {
            console.log('id:', query.id)
            console.log('body:', body)
            return {
                "code": "A000",
                "data": {},
                "msg": {}
            }
        },
    },
    {
        url: '/api/dict/{id}',
        method: 'delete',
        response: ({query}): ResponseType<any> => {
            console.log('id:', query.id)
            return {
                "code": "A000",
                "data": {},
                "msg": {}
            }
        },
    },
] as MockMethod[]
