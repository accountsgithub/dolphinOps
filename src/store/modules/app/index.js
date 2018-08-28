import actions from './actions/actions'
import mutations from './mutations/mutation'
import Cookies from 'js-cookie'

const state = {
    sidebar: {
        opened: !+Cookies.get('sidebarStatus'),
        withoutAnimation: false
    },
    device: 'desktop',
    dialog: false
}

export default{
    state,
    actions,
    mutations
}
