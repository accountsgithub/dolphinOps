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

    //停止
    [TYPES.GET_PROJECT_STOP]() {},

    // 历史查询
    [TYPES.GET_PROJECT_HISTORYLIST](state, payload) {
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
    },
    // 上传部署包信息保存
    [TYPES.GET_PROJECT_UPLOAD_CONFIG]() {}
}
