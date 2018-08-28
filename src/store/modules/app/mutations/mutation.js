import * as TYPES from '../mutationTypes'
import Cookies from 'js-cookie'

export default {
    [TYPES.TOGGLE_SIDE_BAR](state) {
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
    },

    [TYPES.CLOSE_SIDE_BAR](state, withoutAnimation) {
        Cookies.set('sidebarStatus', 1)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },

    [TYPES.TOGGLE_DEVICE](state, device) {
        state.device = device
    },

    [TYPES.MODEL_STATUS](state, payload) {
        state.dialog = payload
    },

    [TYPES.GET_PERMISSIONS](state, payload) {
        state.permissions = payload
    },

    [TYPES.GET_MENU_PERMISSIONS](state, payload) {
        state.menuPermissions = payload
    }
}
