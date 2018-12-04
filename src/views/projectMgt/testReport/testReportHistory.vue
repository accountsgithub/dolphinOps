<template>
    <el-row>
        <div v-loading="isLoading" style="background-color: #ffffff">
            <div>
                <el-table :data="testApiReasonList">
                    <el-table-column prop="name" :label="$t('testPage.apiName_label')" align="center">
                        <template slot-scope="scope">
                            {{timestampToTimeFun(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" :label="$t('testPage.requestPath_label')"></el-table-column>
                    <el-table-column prop="httpMethod" :label="$t('testPage.requestType_label')"></el-table-column>
                    <el-table-column prop="requestBody" :label="$t('testPage.requestValue_label')"></el-table-column>
                    <el-table-column prop="responseStatus" :label="$t('testPage.responseStatus_label')"></el-table-column>
                    <el-table-column prop="responseBody" :label="$t('testPage.responseValue_label')"></el-table-column>
                    <el-table-column prop="message" :label="$t('testPage.exceptionInfo_label')"></el-table-column>
                    <el-table-column :label="$t('testPage.operation')" align="center">
                        <template slot-scope="scope">
                            <a class="tableActionStyle" target="_blank" :href="downloadApiDetailMethod(scope.row)">{{$t('testPage.downloadApiDetail_button')}}</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="paginationData.total != 0" :current-page="paginationData.pageNo + 1" class="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="paginationData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.total"></el-pagination>
            </div>
        </div>
    </el-row>
</template>

<script>
import util from '@/utils/util.js'
export default {
    name: 'testReportHistory',
    data() {
        return {
            isLoading: false,
            testApiReasonList: [],
            // 分页数据集合
            paginationData: {
                pageNo: 0,
                pageSize: 10,
                total: 0,
                totalPages: 0,
                pagerCount: 6
            }
        }
    },
    mounted() {
        this.getTestApiReasonListMethod('first')
    },
    methods: {
        getTestApiReasonListMethod(type) {
            this.isLoading = true
            let jsonTemp = {
                pageNo: type == 'first' ? 0 : this.paginationData.pageNo,
                pageSize: type == 'first' ? 10 : this.paginationData.pageSize,
                f_eq_mark: this.$route.params.mark,
                f_eq_serialNo: this.serialNo
            }
            let params = Object.assign(jsonTemp)
            this.getTestReportListApi(params).then(result => {
                this.isLoading = false
                if (result && result.data) {
                    this.testApiReasonList = result.data
                    this.paginationData.pageNo = result.pageNo
                    this.paginationData.pageSize = result.pageSize
                    this.paginationData.total = result.total
                } else {
                    this.testApiReasonList = []
                }
            })
        },
        // 时间格式转换
        timestampToTimeFun(val) {
            if (val) {
                return util.timestampToTime(val)
            } else {
                return '---'
            }
        }
    }
}
</script>

<style scoped>

</style>
