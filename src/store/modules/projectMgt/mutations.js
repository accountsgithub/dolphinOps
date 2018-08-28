import * as TYPES from './mutationTypes'

export default {
    //项目列表
    [TYPES.GET_PROJECT_LIST](state, payload) {
        const {pageNo, pageSize, total} = payload
        Object.assign(state, {
            elements: payload.data,
            paging: {pageNo, pageSize, total}
        })
    }
}
