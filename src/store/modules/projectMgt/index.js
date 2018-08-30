import actions from './actions'
import mutations from './mutations'

const state = {
    elements: [],
    paging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
        pagerCount: 6
    },
    searchList: [],
    listPaging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
        pagerCount: 6
    }
}

export default {
    state,
    actions,
    mutations
}
