import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import router from '../router'
import Cookies from 'js-cookie'
import zh from '@/lang/zh'
import en from '@/lang/en'

let language = Cookies.get('language')

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
axios.interceptors.request.use(
    config => {
        NProgress.start()
        return config
    },
    err => {
        Message.error('Server error. Please try again.')
        return Promise.reject(err)
    }
)
axios.interceptors.response.use(
    response => {
        NProgress.done()
        const { data, config } = response

        if (data.status == '401') {
            router.push('/login')
            return
        }

        if (data.status != '200') {
            // /oauth/password 接口  无法进行身份识别需在前端进行中英文处理（略坑。。。）
            if (
                config.url.indexOf('/oauth/password') === -1 ||
                language === 'zh'
            ) {
                Message.error(data.message || '')
            } else {
                if (data.message === zh.common.loginErrorMes1) {
                    Message.error(en.common.loginErrorMes1)
                } else if (data.message === zh.common.loginErrorMes2) {
                    Message.error(en.common.loginErrorMes2)
                }
            }
            return Promise.reject(data)
        }
        return response
    },
    err => {
        NProgress.done()
        Message.error('Server error. Please try again.')
        return Promise.reject(err)
    }
)

let API = {
    LOGIN: '/oauth/password',
    LOGIN_OUT: '/user/logout',
    UPDATE_PASSWORD: '/user/password',
    I18N: '/i18n',

    //项目主列表
    PROJECT_LIST: '/project/list.do',

    //变更
    PROJECT_ENV_CONFIG: 'project/config',

    //上传部署信息保存
    PROJECT_UPLOAD_CONFIG: 'project/import/confirm',

    // 开始部署
    PROJECT_DEPLOY: '/project/deploy/exec',

    // 启动
    PROJECT_START: '/project/start',

    // 停止
    PROJECT_STOP: '/project/delete',

    // 历史查询
    PROJECT_HISTORYLIST: '/project/deploy/list.do',
    // 实例数查询
    PROJECT_EXAMPLELIST: '/project/instance/list.do',
    // 版本切换
    PROJECT_CHANGEVERSION: '/project/deploy',
    //白名单设置
    WHITE_IP_SETTING: '/project/white_set',
    //添加告警邮箱
    EMAIL_SETTING: '/project/email_set',
    //sz 命令下载
    WEBTERMLOG: '/project/WebtermLog/log',

    // 版本1.1.7
    // 获取测试报告列表
    TESTREPORT_LIST: '/rap_log',
    // 获取状态图方法
    SUMMARY_DATA: '/rap_summary/summary',
    // 获取测试历史数据
    TESTHISTORY_LIST: '/rap_summary',
    // 获取项目异常情况
    PROJECTEXCEPTION_LIST: '/comparison/test/errors',
    // 获取环境变量
    ENVDATA: '/api/getEnv',
    // 获取下拉项目列表
    PROJECTLIST: '/common/'
}

// if (process.env.NODE_ENV === 'development') {
//     API = Object.keys(API).reduce((map, key) => {
//         map[key] = `/dolphinOps/${API[key]}`
//         return map
//     }, {})
// }

export default API
