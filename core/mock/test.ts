import {MockMethod} from 'vite-plugin-mock'

export default [
    {
        url: '/api/get',
        method: 'get',
        response: ({query}) => {
            return {
                code: 0,
                data: {
                    name: 'ss',
                },
            }
        },
    },
    {
        url: '/api/file/upload/oss/policy',
        method: 'get',
        timeout: 2000,
        response: ({query, body}) => {
            return {
                "code": "A000",
                "data": {
                    "accessId": "LTAI5tPuEtszEjMpSnnk5orR",
                    "policy": "eyJleHBpcmF0aW9uIjoiMjAyMy0wNi0xNFQwODowNDoyMy41MzJaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIwMDYtZGlyLyJdXX0=",
                    "signature": "7QcEI930wp+kOXpPfWy24r3ll9Q=",
                    "dir": "006-dir/",
                    "host": "https://project-temp-file.oss-cn-hangzhou.aliyuncs.com",
                    "expire": "1686729863"
                },
                "msg": "成功"
            }
        },
    },
    {
        url: '/api/post',
        method: 'post',
        timeout: 2000,
        response: {
            code: 0,
            data: {
                name: 'vben',
            },
        },
    },
    {
        url: '/api/text',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody = ''
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            res.setHeader('Content-Type', 'text/plain')
            res.statusCode = 200
            res.end(`hello, ${reqbody}`)
        },
    },
] as MockMethod[]
