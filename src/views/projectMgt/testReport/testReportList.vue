<template>
    <el-row>
        <div v-loading="isLoading"
             style="background-color: #ffffff">
            <div class="page-title-style">
                <span>Requests Summary</span>
                <div>
                    <el-button class="tableLastButtonStyleW" @click="linkHistoryMethod">{{$t('testPage.showHistoryRecord_button')}}</el-button>
                    <el-button :disabled="!serialNo" class="tableLastButtonStyleW" @click="downloadAllDetailMethod"><i class="icon iconfont icon-ic-loaddown" style="font-size: 14px;"></i></el-button>
                    <el-button class="tableLastButtonStyleW" @click="testActionMethod"><i class="icon iconfont icon-ceshi" style="font-size: 16px;"></i></el-button>
                </div>
            </div>
            <div v-show="summaryData.length > 0" class="status-div-style">
                <proportion-com :statusData="summaryData"></proportion-com>
            </div>
            <div v-show="testReportList.length > 0">
                <div>
                    <el-form :model="searchForm" ref="searchForm" :inline="true" size="small" label-width="100px">
                        <el-form-item :label="$t('testPage.apiName_label')" prop="f_like_name">
                            <el-input v-model="searchForm.f_like_name"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('testPage.testResult_label')" prop="f_eq_responseCode">
                            <el-input v-model="searchForm.f_eq_responseCode"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('testPage.requestPath_label')" prop="f_like_url">
                            <el-input v-model="searchForm.f_like_url"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form-item>
                        <el-button type="primary" @click="resetTestReportForm('searchForm')" class="tableLastButtonStyleW icon iconfont icon-ic-refresh">{{$t('common.reset')}}</el-button>
                        <el-button type="primary" @click="getTestReportListMethod('first')" class="tableLastButtonStyleB icon iconfont icon-ic-search"> {{$t('common.search')}}</el-button>
                    </el-form-item>
                </div>
                <el-table :data="testReportList"
                          class="list"
                          highlight-current-row
                          style="width: 100%"
                          stripe>
                    <el-table-column prop="name" :label="$t('testPage.apiName_label')"></el-table-column>
                    <el-table-column prop="responseCode" :label="$t('testPage.testResult_label')" align="center">
                        <template class="test-fail-style" slot-scope="scope">
                            <span :class="{'test-response-fail-style':true,'test-response-success-style':scope.row.responseCode == '0'}">{{testResultMethod(scope.row)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" min-width="200px" :label="$t('testPage.requestPath_label')">
                        <template slot-scope="scope">
                            <div slot="reference">
                                <el-popover v-if="scope.row.url&&scope.row.url.length>20" trigger="hover" placement="top">
                                    <p class="popover-style">{{ scope.row.url }}</p>
                                    <div slot="reference">
                                        <span size="medium">{{ scope.row.url.substring(0,20) }}…</span>
                                    </div>
                                </el-popover>
                                <div v-else >
                                    <span class="overKeyWidth">{{ scope.row.url }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="httpMethod" :label="$t('testPage.requestType_label')" align="center"></el-table-column>
                    <el-table-column prop="requestBody" :label="$t('testPage.requestValue_label')">
                        <template slot-scope="scope">
                            <div slot="reference">
                                <el-popover v-if="scope.row.requestBody&&scope.row.requestBody.length>20" trigger="hover" placement="top">
                                    <p class="popover-style">{{ scope.row.requestBody }}</p>
                                    <div slot="reference">
                                        <span size="medium">{{ scope.row.requestBody.substring(0,20) }}…</span>
                                    </div>
                                </el-popover>
                                <div v-else>
                                    <span class="overKeyWidth">{{ scope.row.requestBody }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="responseStatus" :label="$t('testPage.responseStatus_label')" align="center"></el-table-column>
                    <el-table-column prop="responseBody" :label="$t('testPage.responseValue_label')">
                        <template slot-scope="scope">
                            <div slot="reference">
                                <el-popover v-if="scope.row.responseBody&&scope.row.responseBody.length>20" trigger="hover" placement="top">
                                    <p class="popover-style">{{ scope.row.responseBody }}</p>
                                    <div slot="reference">
                                        <span size="medium">{{ scope.row.responseBody.substring(0,20) }}…</span>
                                    </div>
                                </el-popover>
                                <div v-else>
                                    <span class="overKeyWidth">{{ scope.row.responseBody }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="message" :label="$t('testPage.exceptionInfo_label')">
                        <template slot-scope="scope">
                            <div slot="reference">
                                <el-popover v-if="scope.row.message&&scope.row.message.length>20" trigger="hover" placement="top">
                                    <p class="popover-style">{{ scope.row.message }}</p>
                                    <div slot="reference">
                                        <span size="medium">{{ scope.row.message.substring(0,20) }}…</span>
                                    </div>
                                </el-popover>
                                <div v-else >
                                    <span class="overKeyWidth">{{ scope.row.message }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('testPage.operation')" width="200" align="center">
                        <template slot-scope="scope">
                            <a class="tableActionStyle" target="_blank" :href="downloadApiDetailMethod(scope.row)">{{$t('testPage.downloadApiDetail_button')}}</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="paginationData.total != 0" :current-page="paginationData.pageNo + 1" class="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="paginationData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.total"></el-pagination>
            </div>
            <div v-show="summaryData.length < 1 && testReportList.length < 1" class="no-data-background"></div>
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
            // 查询数据集合
            searchForm: {
                f_like_name: '',
                f_eq_responseCode: 0,
                f_like_url: ''
            },
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
        this.getSummaryDataMethod()
    },
    methods: {
        ...mapActions([
            'getTestReportListApi',
            'getSummaryDataApi',
            'downloadTestReport',
            'setTestActionApi'
        ]),
        // 获取状态图方法
        getSummaryDataMethod() {
            let params = Object.assign({mark: this.$route.params.mark})
            this.getSummaryDataApi(params).then(result => {
                if (result && result.data.length > 0) {
                    this.serialNo = result.serialNo
                    this.summaryData = result.data
                    this.getTestReportListMethod('first')
                } else {
                    this.summaryData = []
                    this.testReportList = []
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
        // 跳转历史纪录页面
        linkHistoryMethod() {
            this.$router.push({name: 'historyList', params: {mark: this.$route.params.mark, serialNo: this.serialNo}})
        },
        // 执行测试方法
        testActionMethod() {
            let params = Object.assign({mark: this.$route.params.mark, path: localStorage.getItem('path')})
            this.setTestActionApi(params).then(res => {
                if (res.code == '0' && res.status == 200) {
                    this.$message({
                        type: 'success',
                        message: this.$t('testPage.testActionSuccess_message')
                    })
                    this.getSummaryDataMethod
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message || this.$t('testPage.testActionFail_message')
                    })
                }
            })
        },
        resetTestReportForm(name) {
            console.log(name)
        },
        // 查询测试报告数据列表
        getTestReportListMethod(type) {
            this.isLoading = true
            let jsonTemp = {
                pageNo: type == 'first' ? 0 : this.paginationData.pageNo,
                pageSize: this.paginationData.pageSize,
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
/*@import '~@/styles/common.scss';*/
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
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
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
    /*无数据展示样式*/
    .no-data-background {
        background-image: url('~@/assets/images/pic-no-data.png');
        background-repeat: no-repeat;
        height: 80vh;
        width: auto;
        background-position-x: center;
        background-position-y: center ;
    }
    /*table间距样式*/
    .list {
        padding: 0 30px;
        &.el-table::before {
            height: 0 !important;
        }
    }
    /*popover样式*/
    .popover-style {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #606266;
        max-width: 600px;
        word-wrap: break-word;
        max-height: 100px;
        overflow-y: auto;
    }
/*测试结果样式*/
.test-response-fail-style {
    color: #EF7575;
}
.test-response-success-style {
    color: #82C362;
}
</style>
