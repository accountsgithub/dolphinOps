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

    async saveEnv({commit}, params) {
        const env = await axios.post(API.PROJECT_ENV_CONFIG, params)
            .then(response => response.data)
            .catch(error => Promise.reject(error))
        commit(TYPES.GET_PROJECT_ENV_CONFIG, env)
    },
    // 启动
    getProjectStart({commit}, params) {
        return axios.post(API.PROJECT_START, params)
            .then(response => response.data)
            .then(({result}) => {commit(TYPES.GET_PROJECT_START, result)})
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
