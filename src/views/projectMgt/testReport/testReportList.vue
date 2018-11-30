<template>
    <el-row>
        <div v-loading="isLoading" style="background-color: #ffffff">
            <div class="page-title-style">
                <span>Requests Summary</span>
                <div>
                    <el-button type="primary" class="tableLastButtonStyleW">{{$t('testPage.showHistoryRecord_button')}}</el-button>
                    <el-button :disabled="!serialNo" type="primary" class="tableLastButtonStyleW icon iconfont icon-ic-loaddown" @click="downloadAllDetailMethod"></el-button>
                    <el-button type="primary" class="tableLastButtonStyleW icon iconfont icon-ic-refresh" @click="getTestReportListMethod('first')"></el-button>
                </div>
            </div>
            <div class="status-div-style">
                <proportion-com :data="summaryData"></proportion-com>
            </div>
            <div>
                <el-table :data="testReportList">
                    <el-table-column prop="name" :label="$t('testPage.apiName_label')"></el-table-column>
                    <el-table-column prop="responseCode" :label="$t('testPage.testResult_label')">
                        <template class="test-fail-style" slot-scope="scope">
                            {{testResultMethod(scope.row)}}
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
                <el-pagination v-if="paginationData.total != 0" :current-page="paginationData.pageNo + 1" class="paginationStyle" @size-change="sizeChange" @current-change="currentChange" :page-size="paginationData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.total"></el-pagination>
            </div>
        </div>
    </el-row>
</template>

<script>
import proportionCom from '@/views/projectMgt/testReport/components/proportionCom'
import {mapActions} from 'vuex'
export default {
    name: 'testReportList',
    components: {
        proportionCom
    },
    data() {
        return {
            // 加载状态
            isLoading: false,
            // 列表数据结合
            testReportList: [],
            // 状态图数据集
            summaryData: [],
            // 总流水号
            serialNo: '',
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
        this.getTestReportListMethod('first')
        this.getSummaryDataMethod()
    },
    methods: {
        ...mapActions([
            'getTestReportListApi',
            'getSummaryDataApi',
            'downloadTestReport'
        ]),
        // 获取状态图方法
        getSummaryDataMethod() {
            let params = Object.assign({mark: this.$route.params.mark})
            this.getSummaryDataApi(params).then(data => {
                if (data.result && data.result.data) {
                    this.summaryData = data.result.data
                    this.serialNo = data.result.serialNo
                } else {
                    this.summaryData = []
                }
            })
        },
        // 转换测试结果
        testResultMethod(row) {
            if (row.responseCode == '0') {
                return this.$t('testPage.success_message')
            } else {
                return this.$t('testPage.fail_message')
            }
        },
        // 查询测试报告数据列表
        getTestReportListMethod(type) {
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
                    this.testReportList = result.data
                    this.paginationData.pageNo = result.pageNo
                    this.paginationData.pageSize = result.pageSize
                    this.paginationData.total = result.total
                } else {
                    this.testReportList = []
                }
            })
        },
        // 下载接口明细
        downloadApiDetailMethod(row) {
            return `${this.g_Config.BASE_URL}/rap_log/down?id=${row.id}`
        },
        // 下载汇总明细
        downloadAllDetailMethod() {
            window.open(`${this.g_Config.BASE_URL}/rap_log/down?serialNo=${this.serialNo}`)
        },
        // 切换每页数据个数
        sizeChange(val) {
            this.paginationData.pageSize = val
            this.getTestReportListMethod()
        },
        // 翻页方法
        currentChange(val) {
            this.paginationData.pageNo = val - 1
            this.getTestReportListMethod()
        }
    }
}
</script>

<style lang="scss" scoped>
    /*页面介绍及基本按键div样式*/
    .page-title-style{
        height: 60px;
        background-color: #ffffff;
        border-bottom: 1px solid #EDEFF4;
        display: flex;
        line-height: 60px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .page-title-style span{
        margin-left: 22px;
        ont-family: PingFangSC-Medium;
        font-size: 14px;
        color: #686F79;
        letter-spacing: 0;
    }.page-title-style div{
         margin-right: 22px;
     }
    /*状态条div样式*/
    .status-div-style {
        height: 257px;
        width: auto;
        background-color: #F9FBFD;;
        margin: 35px 22px;
    }
    /*测试结果字体颜色样式*/
    .test-fail-style {
        color: #FC5555;
    }
    /*操作标签样式*/
    .tableActionStyle {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #016ad5;
        letter-spacing: 0.86px;
        text-align: left;
        margin-right: 10px;
    }
</style>
