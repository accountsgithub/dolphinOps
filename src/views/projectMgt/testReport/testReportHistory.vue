<template>
    <el-row>
        <div v-loading="isLoading" style="background-color: #ffffff">
            <div class="mark-title-style">
                <span>{{this.$route.params.mark}}</span>
            </div>
            <div>
                <el-table :data="testHistoryList"
                          class="list"
                          highlight-current-row
                          style="width: 100%"
                          stripe>
                    <el-table-column prop="name" :label="$t('testPage.executeTime_label')" align="left">
                        <template slot-scope="scope">
                            {{timestampToTimeFun(scope.row.createTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="interfaceCount" :label="$t('testPage.apiCount_label')" align="right"></el-table-column>
                    <el-table-column prop="successCount" :label="$t('testPage.summarySuccess_label')" align="right"></el-table-column>
                    <el-table-column prop="failCount" :label="$t('testPage.summaryFail_label')" align="right"></el-table-column>
                    <el-table-column :label="$t('testPage.operation')" width="150" align="left">
                        <template slot-scope="scope">
                            <a class="tableActionStyle" target="_blank" @click="linkReasonPageMethod(scope.row)">{{$t('testPage.linkReasonPage_button')}}</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-if="paginationData.total != 0" :current-page="paginationData.pageNo + 1" class="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="paginationData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.total"></el-pagination>
            </div>
        </div>
    </el-row>
</template>

<script>
import {mapActions} from 'vuex'
import util from '@/utils/util.js'
export default {
    name: 'testReportHistory',
    data() {
        return {
            isLoading: false,
            testHistoryList: [],
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
        this.getTestHistoryListMethod('first')
    },
    methods: {
        ...mapActions([
            'getTestHistoryListApi'
        ]),
        getTestHistoryListMethod(type) {
            this.isLoading = true
            let jsonTemp = {
                pageNo: type == 'first' ? 0 : this.paginationData.pageNo,
                pageSize: this.paginationData.pageSize,
                'sorts[0].name': 'createTime',
                f_eq_mark: this.$route.params.mark
            }
            let params = Object.assign(jsonTemp)
            this.getTestHistoryListApi(params).then(result => {
                this.isLoading = false
                if (result && result.data) {
                    this.testHistoryList = result.data
                    this.paginationData.pageNo = result.pageNo
                    this.paginationData.pageSize = result.pageSize
                    this.paginationData.total = result.total
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
        },
        // 跳转查询失败接口原因
        linkReasonPageMethod(val) {
            this.$router.push({name: 'reasonList', params: {mark: val.mark, serialNo: this.$route.params.serialNo}})
        },
        // 切换每页数据个数
        sizeChange(val) {
            this.paginationData.pageSize = val
            this.getTestHistoryListMethod()
        },
        // 翻页方法
        currentChange(val) {
            this.paginationData.pageNo = val - 1
            this.getTestHistoryListMethod()
        }
    }
}
</script>

<style lang="scss" scoped>
    /*操作标签样式*/
    .tableActionStyle {
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #016ad5;
        letter-spacing: 0.86px;
        text-align: left;
        margin-right: 10px;
    }
    /*table间距样式*/
    .list {
        padding: 0 30px;
        &.el-table::before {
            height: 0 !important;
        }
    }
    /*项目标识样式*/
    .mark-title-style {
        height: 60px;
        line-height: 60px;
        border-bottom: solid 1px #EDEFF4;
        padding-left: 30px;
        font-size: 14px;
        color: #686F79;
    }
</style>
