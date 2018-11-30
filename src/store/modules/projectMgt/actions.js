import axios from 'axios'
import API from '@/apis/api'
import * as TYPES from './mutationTypes'

export default {
    //项目主列表
    getProjectList({commit}, params) {
        return axios.get(API.PROJECT_LIST, {params})
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_LIST, {result,params})})
            .catch(error => Promise.reject(error))
    },

    resetSearchCriteria({commit}) {
        commit(TYPES.RESET_SEARCH_CRITERIA)
    },

    async getCurrentProject(data, params) {
        return axios.get(API.PROJECT_LIST, {params}).then(response => {
            if (response.data && response.data.code === '0' && response.data.result ) {
                const list = response.data.result.data
                return list && list.length > 0 ? list[0] : {}
            } else {
                Promise.resolve({})
            }
        }).catch(error => Promise.reject(error))
    },

    async saveEnv({dispatch}, params) {
        try {
            await axios.post(API.PROJECT_ENV_CONFIG, params).then(response => response.data)
            if (params.isAdmin === '1') {
                await dispatch('getProjectList', params.searchParams)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    },
    // 上传部署包保存
    saveUplaod({commit}, params) {
        return axios.post(API.PROJECT_UPLOAD_CONFIG, params)
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_UPLOAD_CONFIG, result)})
            .catch(error => Promise.reject(error))
    },
    // 白名单设置
    setWhiteIp({commit},params) {
        return axios.get(API.WHITE_IP_SETTING ,{params})
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_WHITE_IP_SETTING,result)})
            .catch(error => Promise.reject(error))
    },

    setEamil({commit},params) {
        return  axios.get(API.EMAIL_SETTING ,{params})
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_EAMIL_SETTING,result)})
            .catch(error => Promise.reject(error))
    },

    // 开始部署
    getProjectDeploy(data, params) {
        return axios.get(API.PROJECT_DEPLOY, {params})
            .then(response => {
                return response.data
            })
            .catch(error => Promise.reject(error))
    },

    // 启动
    getProjectStart(data, params) {
        return axios.post(API.PROJECT_START, params)
            .then(response => {
                return response.data
            })
            .catch(error => Promise.reject(error))
    },

    // 停止
    getProjectStop(data, params) {
        return axios.get(API.PROJECT_STOP, {params})
            .then(response => {
                return response.data
            })
            .catch(error => Promise.reject(error))
    },

    //历史查询
    getHistoryList({commit}, params) {
        return axios.post(API.PROJECT_HISTORYLIST, params)
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_HISTORYLIST, result)})
            .catch(error => Promise.reject(error))
    },

    //实例数查询
    getExampleList({commit}, params) {
        return axios.get(API.PROJECT_EXAMPLELIST, {params})
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_EXAMPLELIST, result)})
            .catch(error => Promise.reject(error))
    },
    // 切换版本
    changeVersion({commit}, params) {
        return axios.get(API.PROJECT_CHANGEVERSION, {params})
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_CHANGEVERSION, result)})
            .catch(error => Promise.reject(error))
    },
    // 基础监控页面获取图表数据
    monitorApi(commit, data) {
        console.log(data, 222)
        debugger
        return  axios.get(data.url, data)
            .then(response => {
                if (response.data.code == 0) {
                    return response.data.result
                }
            })
            // .then(({result}) => {commit(TYPES.GET_MONITOR_CHARTS,result)})
            .catch(error => Promise.reject(error))
    }
}
