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
    LOGIN_OUT: '/user/logout',

    //项目主列表
    PROJECT_LIST: '/project/list.do',

    //变更
    PROJECT_ENV_CONFIG: 'project/config',

    //上传部署信息保存
    PROJECT_UPLOAD_CONFIG: 'project/import/confirm',

    // 启动
    PROJECT_START: '/project/start',
    // 历史查询
    PROJECT_HISTORYLIST: '/project/deploy/list.do',
    // 实例数查询
    PROJECT_EXAMPLELIST: '/project/instance/list.do',
    // 版本切换
    PROJECT_CHANGEVERSION: '/project/deploy'
}

// if (process.env.NODE_ENV === 'development') {
//     API = Object.keys(API).reduce((map, key) => {
//         map[key] = `/dolphinOps/${API[key]}`
//         return map
//     }, {})
// }

export default API

