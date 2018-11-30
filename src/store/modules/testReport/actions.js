import axios from 'axios'
import api from '@/apis/api'
// import * as types from './mutationTypes'

export default {
    // 获取测试报告列表数据集
    getTestReportListApi(params) {
        return axios.get(api.TESTREPORT_LIST, {params}).then(
            response => response.data
        ).catch(
            response => response.data
        )
    }
}
