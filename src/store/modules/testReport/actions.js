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
    },
    // 获取项目异常情况
    getExceptionListApi(data, params) {
        return axios.get(api.PROJECTEXCEPTION_LIST, {params}).then(
            response => response.data.result
        ).catch(
            response => response.data
        )
    },
    // 获取环境变量
    getEnvApi(data, params) {
        return axios.get(api.ENVDATA, {params}).then(
            response => response.data
        ).catch(
            response => response.data
        )
    },
    // 获取下拉项目列表
    getProjectListApi(data, params) {
        return axios.get(`${api.PROJECTLIST + params.env  }/projects`).then(
            response => response.data
        ).catch(
            response => response.data
        )
    }
}
