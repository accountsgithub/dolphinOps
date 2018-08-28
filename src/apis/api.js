import axios from 'axios'
import {Message} from 'element-ui'
import NProgress from 'nprogress'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
    NProgress.start()
    return config
}, err => {
    Message.error('服务器错误，请重试')
    return Promise.reject(err)
})
axios.interceptors.response.use(response => {
    NProgress.done()
    const {data} = response
    if (data.status != '200') {
        Message.error(data.message || '')
        return Promise.reject(data)
    }
    return response
}, err => {
    NProgress.done()
    Message.error('服务器错误，请重试')
    return Promise.reject(err)
})

let API = {
    LOGIN: '/oauth/password',
    LOGIN_OUT: '/oauth2/logout',

    //项目主列表
    PROJECT_LIST: '/project/list.do'
}

// if (process.env.NODE_ENV === 'development') {
//     API = Object.keys(API).reduce((map, key) => {
//         map[key] = `/dolphinOps/${API[key]}`
//         return map
//     }, {})
// }

export default API

