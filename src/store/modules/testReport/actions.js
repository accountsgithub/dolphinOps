import axios from 'axios'
import api from '@/apis/api'
// import * as types from './mutationTypes'

export default {
    // 获取测试报告列表数据集
    getTestReportListApi(data, params) {
        return axios.get(api.TESTREPORT_LIST, {params}).then(
            response => response.data.result
        ).catch(
            response => response.data
        )
    },
    // 获取状态图数据
    getSummaryDataApi(data, params) {
        return axios.get(api.SUMMARY_DATA, {params}).then(
            response => response.data.result
        ).catch(
            response => response.data
        )
    },
    // 获取测试历史数据
    getTestHistoryListApi(data, params) {
        return axios.get(api.TESTHISTORY_LIST, {params}).then(
            response => response.data.result
        ).catch(
            response => response.data
        )
    }
}
