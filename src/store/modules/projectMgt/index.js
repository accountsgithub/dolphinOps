import actions from './actions'
import mutations from './mutations'

const state = {
    searchCriteria: {
        mark: '',
        name: '',
        pageNo: 0,
        pageSize: 10
    },
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
    },
    historyList: [],
    historyListPaging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
        pagerCount: 6
    },
    // 审核人
    auditor: '',
    // 基础监控页面获取图表数据

}

export default {
    state,
    actions,
    mutations
}
