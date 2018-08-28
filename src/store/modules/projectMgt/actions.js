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
    }
}
