import * as TYPES from '../mutationTypes'
import axios from 'axios'
import API from '@/apis/api'
// import Cookies from 'js-cookie' // cookie

export default {
    setLanguage({ commit }, language) {
        commit(TYPES.SETLANGUAGE, language)
    },
    ToggleSideBar: ({ commit }) => {
        commit(TYPES.TOGGLE_SIDE_BAR)
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
        commit(TYPES.CLOSE_SIDE_BAR, withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
        commit(TYPES.TOGGLE_DEVICE, device)
    },

    updateDialog({ commit }, value) {
        commit('MODEL_STATUS', value)
    },
    async modifyPW(data, params) {
        return axios
            .put(API.UPDATE_PASSWORD, params)
            .then(response => {
                return response
            })
            .catch(error => Promise.reject(error))
    }
}
