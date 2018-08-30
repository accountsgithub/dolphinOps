import * as TYPES from './mutationTypes'

export default {
    //项目列表
    [TYPES.GET_PROJECT_LIST](state, payload) {
        const {pageNo, pageSize, total} = payload
        Object.assign(state, {
            elements: payload.data,
            paging: {pageNo, pageSize, total}
        })
    },
    // 启动
    [TYPES.GET_PROJECT_START]() {},
    // 历史查询
    [TYPES.GET_PROJECT_HISTORYLIST](state, payload) {
        console.log(state)
        console.log(payload)
        const {pageNo, pageSize, total} = payload
        Object.assign(state, {
            searchList: payload.data,
            listPaging: {pageNo, pageSize, total}
        })
    },
    // 实例数查询
    [TYPES.GET_PROJECT_EXAMPLELIST](state, payload) {
        const {pageNo, pageSize, total} = payload
        Object.assign(state, {
            searchList: payload.data,
            listPaging: {pageNo, pageSize, total}
        })
    }
}
