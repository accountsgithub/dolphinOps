import * as types from './mutationTypes'

export default {
    [types.TESTREPORTLIST](state, response) {
        if (response.data.result && response.data.result.data) {
            state.testReportList = response.data.result.data
        } else {
            state.testReportList = []
        }
    }
}
