<template>
    <el-row>
        <div v-loading="isLoading" style="background-color: #ffffff">
            <div>
                <el-table :data="testReportList"
                          class="list"
                          highlight-current-row
                          style="width: 100%"
                          stripe>
                    <el-table-column prop="name" :label="$t('testPage.apiName_label')"></el-table-column>
                    <el-table-column prop="responseCode" :label="$t('testPage.testResult_label')">
                        <template class="test-fail-style" slot-scope="scope">
                            {{testResultMethod(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" :label="$t('testPage.requestPath_label')">
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
                    <el-table-column prop="httpMethod" :label="$t('testPage.requestType_label')"></el-table-column>
                    <el-table-column prop="requestBody" :label="$t('testPage.requestValue_label')">
                        <template slot-scope="scope">
                            <div slot="reference">
                                <el-popover v-if="scope.row.requestBody&&scope.row.requestBody.length>20" trigger="hover" placement="top">
                                    <p class="popover-style">{{ scope.row.requestBody }}</p>
                                    <div slot="reference">
                                        <span size="medium">{{ scope.row.requestBody.substring(0,20) }}…</span>
                                    </div>
                                </el-popover>
                                <div v-else >
                                    <span class="overKeyWidth">{{ scope.row.requestBody }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="responseStatus" :label="$t('testPage.responseStatus_label')"></el-table-column>
                    <el-table-column prop="responseBody" :label="$t('testPage.responseValue_label')">
                        <template slot-scope="scope">
                            <div slot="reference">
                                <el-popover v-if="scope.row.responseBody&&scope.row.responseBody.length>20" trigger="hover" placement="top">
                                    <p class="popover-style">{{ scope.row.responseBody }}</p>
                                    <div slot="reference">
                                        <span size="medium">{{ scope.row.responseBody.substring(0,20) }}…</span>
                                    </div>
                                </el-popover>
                                <div v-else >
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
export default {
    name: 'apiReasonList',
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
        }
    }
}
</script>

<style type="less" scoped>
    // popover样式
    .popover-style {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #409EFF;
        max-width: 600px;
        word-wrap: break-word;
        max-height: 100px;
        overflow-y: auto;
    }
</style>
