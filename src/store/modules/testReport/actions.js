// import * as types from './mutationTypes'
import api from '@/apis/api'
import axios from 'axios'

export default {
    getTestReportListApi(params) {
        return axios.get(api.TESTREPORT_LIST, {params}).then(
            response => {
                return response.data
            }
        ).catch(
            error => Promise.reject(error)
        )
    }
}
