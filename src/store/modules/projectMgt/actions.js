import axios from 'axios'
import API from '@/apis/api'
import * as TYPES from './mutationTypes'

export default {
    //项目主列表
    getProjectList({commit}, params) {
        return axios.get(API.PROJECT_LIST, {params})
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_LIST, result)})
            .catch(error => Promise.reject(error))
    },

    async saveEnv({dispatch}, params) {
        try {
            await axios.post(API.PROJECT_ENV_CONFIG, params).then(response => response.data)
            await dispatch('getProjectList', params.searchParams)
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

    // 开始部署
    getProjectDeploy({commit}, params) {
        return axios.get(API.PROJECT_DEPLOY, params)
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_DEPLOY, result)})
            .catch(error => Promise.reject(error))
    },

    // 启动
    getProjectStart({commit}, params) {
        return axios.post(API.PROJECT_START, params)
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_START, result)})
            .catch(error => Promise.reject(error))
    },

    // 停止
    getProjectStop({commit}, params) {
        return axios.get(API.PROJECT_STOP, params)
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_STOP, result)})
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
    }
}
