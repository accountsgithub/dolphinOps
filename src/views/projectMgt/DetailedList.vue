<template>
    <div style="background: #ffffff">
        <div style="border-bottom: 1px #edeff4 solid;height: 46px;line-height: 46px;"><span class="title-style">综合平台技术框架</span></div>
        <div style="margin-top: 8px">
            <el-tabs type="border-card" @tab-click="tabChange">
                <el-tab-pane label="实例数列表">
                    <list-panel>
                        <!-- main start -->
                        <template slot="main">
                            <el-table
                                :data="searchList"
                                class="list"
                                highlight-current-row
                                style="width: 100%"
                                stripe>
                                <el-table-column
                                    prop="podName"
                                    label="podName"/>
                                <el-table-column
                                    prop="ip"
                                    label="Ip"/>
                                <el-table-column
                                    prop="port"
                                    label="端口"/>
                                <el-table-column
                                    prop="node"
                                    label="node"/>
                                <el-table-column
                                    align="center"
                                    fixed="right"
                                    label="操作">
                                    <template slot-scope="scope">
                                        <a class="tableActionStyle" :href="downloadHref(scope.row.podName)" target="_blank">下载日志</a>
                                        <a class="tableActionStyle" v-if="scope.row.monitorUrl != '<no value>'" :href="scope.row.monitorUrl" target="_blank">监控</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- main end -->

                        <!-- pagination start -->
                        <template slot="pagination">
                            <el-pagination
                                v-if="listPaging.total != 0"
                                :page-size="listPaging.pageSize"
                                :total="listPaging.total"
                                :current-page="listPaging.pageNo + 1"
                                class="pagination"
                                layout="total, sizes, prev, pager, next, jumper"
                                @size-change="handleSizeChange"
                                @current-change="handlePageChange"/>
                        </template>
                        <!-- pagination end -->
                    </list-panel>
                </el-tab-pane>
                <el-tab-pane label="部署历史">
                    <search-panel>
                        <el-form
                            :inline="true"
                            size="small"
                            :model="searchCriteria"
                            class="formPanel"
                            label-width="80px">
                            <el-form-item label="人员">
                                <el-input
                                    v-model="searchCriteria.creatorName"/>
                            </el-form-item>

                            <el-form-item>
                                <el-button
                                    type="primary"
                                    icon="el-icon-search"
                                    @click="searchListMethod()" class="tableLastButtonStyleB" style="margin-right: -20px;">搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </search-panel>
                    <list-panel>
                        <!-- main start -->
                        <template slot="main">
                            <el-table
                                :data="searchList"
                                class="list"
                                highlight-current-row
                                style="width: 100%"
                                stripe>
                                <el-table-column
                                    prop="version"
                                    label="版本号"
                                    width="180"/>
                                <el-table-column
                                    prop="uploadMode"
                                    label="发布方式"
                                    width="180"/>
                                <el-table-column
                                    prop="uploadType"
                                    label="发布类型"/>
                                <el-table-column
                                    prop="statusLabel"
                                    label="状态"/>
                                <el-table-column
                                    prop="creatorName"
                                    label="创建人">
                                </el-table-column>
                                <el-table-column
                                    prop="createTime"
                                    label="部署时间"/>
                                <el-table-column
                                    align="center"
                                    label="操作">
                                    <template slot-scope="scope">
                                        <el-button class="icon iconfont icon-ic-change" :class="[{tableLastButtonStyleW: true}]" @click="changeType(scope.row.id)">版本切换</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- main end -->

                        <!-- pagination start -->
                        <template slot="pagination">
                            <el-pagination
                                v-if="listPaging.total != 0"
                                :page-size="listPaging.pageSize"
                                :total="listPaging.total"
                                :current-page="listPaging.pageNo + 1"
                                class="pagination"
                                layout="total, sizes, prev, pager, next, jumper"
                                @size-change="handleSizeChange"
                                @current-change="handlePageChange"/>
                        </template>
                        <!-- pagination end -->
                    </list-panel>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    name: 'DetailedList',
    data() {
        return {
            titleText: '',
            tabType: '0',
            searchExample: {
                projectId: this.$route.params.id,
                pageNo: 0,
                pageSize: 10
            },
            searchCriteria: {
                projectId: this.$route.params.id,
                creatorName: '',
                pageNo: 0,
                pageSize: 10
            }
        }
    },
    mounted() {
        this.searchListMethod()
    },
    methods: {
        ...mapActions(['getHistoryList', 'getExampleList', 'changeVersion']),
        // 历史查询
        searchListMethod() {
            if (this.tabType == '0') {
                const params = this.searchExample
                this.getExampleList(params)
            } else if (this.tabType == '1') {
                const params = this.searchCriteria
                this.getHistoryList(params)
            }
        },
        // 历史重置
        reset() {
            this.searchCriteria = {
                projectId: this.$route.params.id,
                creatorName: '',
                pageNo: 0,
                pageSize: 10
            }
        },


        // 切换tab
        tabChange(val) {
            this.tabType = val.index
            this.reset()
            this.searchListMethod()
        },

        // 切换每页数据个数
        handleSizeChange(pageSize) {
            if (this.tabType == '0') {
                const params = Object.assign({}, this.searchExample, {pageSize})
                this.$set(this.searchExample, 'pageSize', pageSize)
                this.getExampleList(params)
            } else if (this.tabType == '1') {
                const params = Object.assign({}, this.searchCriteria, {pageSize})
                this.$set(this.searchCriteria, 'pageSize', pageSize)
                this.getHistoryList(params)
            }
        },

        // 翻页
        handlePageChange(pageNo) {
            if (this.tabType == '0') {
                const params = Object.assign({}, this.searchExample, {pageNo: pageNo - 1})
                this.getExampleList(params)
            } else if (this.tabType == '1') {
                const params = Object.assign({}, this.searchCriteria, {pageNo: pageNo - 1})
                this.getHistoryList(params)
            }
        },
        // 切换版本
        changeType(id) {
            this.$confirm('切换后，线上将变更为此版本，是否继续？','确定将线上版本切换至此版本？', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let params = Object.assign({deployId: id})
                this.changeVersion(params).then(res => {
                    if (res.data.result.status == '200') {
                        this.$message({
                            type: 'success',
                            message: '切换版本成功！'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '切换版本失败！'
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '切换版本失败！'
                })
            })
        },
        // 下载日志
        downloadHref(podName) {
            return `${this.g_Config.BASE_URL}/project/downloadLog/${podName}.text`
        }
    },
    computed: {
        ...mapState({
            searchList: state => state.project.searchList,
            listPaging: state => state.project.listPaging
        })
    }
}
</script>

<style scoped>
    .title-style{
        font-family:PingFangSC-Medium;
        font-size:14px;
        color:#3a3a3a;
        letter-spacing:0;
        font-weight: 800;
        margin-left: 21px;
    }
    .tableActionStyle{
        font-family:PingFangSC-Medium;
        font-size:12px;
        color:#016ad5;
        letter-spacing:0.86px;
        text-align:left;
        margin-right: 10px;
    }
    /deep/.mainContainer__header {
        padding: 0!important;
    }
</style>
