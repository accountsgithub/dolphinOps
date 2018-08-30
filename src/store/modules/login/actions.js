import * as TYPES from './mutationTypes'
import API from '@/apis/api'
import axios from 'axios'

export default {

    async login({commit}, params) {
        const bodyFormData = new FormData();
        bodyFormData.append('username', params.username);
        bodyFormData.append('password', params.password);

        const token = await axios.post(API.LOGIN, bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(response => response.data.result)
            .catch(error => Promise.reject(error))
        if (token) {
            commit(TYPES.POST_LOGIN, true)
        }
    },

    async logout({commit}) {
        const isLogout = await axios.get(API.LOGIN_OUT)
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            })
            .catch(error => Promise.reject(error))
        commit(TYPES.GET_LOGOUT, isLogout)
    }
}
