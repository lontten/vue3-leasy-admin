import {MockMethod} from 'vite-plugin-mock'

export default [
    {
        url: '/api/login/account',
        method: 'post',
        response: ({query, body}) => {
            console.log(query)
            if (body.adminName == 'admin') {
                return {
                    code: 'A000',
                    data: 'p099-admin-token',
                    msg: '成功'
                }
            }
            return {
                code: 'M001',
                msg: '账号或密码错误'
            }
        },
    },

    {
        url: '/api/login/current-user',
        method: 'get',
        response: ({query, body}) => {
            console.log(query, body)
            return {
                code: 'A000',
                data: {
                    nickname: 'admin',
                    avatar: '',
                    roles: ['admin'],
                }
            }
        },
    },


] as MockMethod[]
