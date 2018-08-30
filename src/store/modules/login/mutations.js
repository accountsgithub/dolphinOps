import * as TYPES from './mutationTypes'

export default {
    [TYPES.POST_LOGIN](state, payload) {
        state.isLogin = payload
    },

    [TYPES.GET_LOGOUT](state, payload) {
        state.isLogin = !payload
    }
}
