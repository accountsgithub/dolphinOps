<template>
    <el-row>
        <div class="search-div-style">
            <el-form :model="searchForm" ref="searchForm" :inline="true" size="small" label-width="100px" class="page-title-style">
                <div>
                    <el-form-item :label="$t('exceptionPage.searchTime_label')" prop="time">
                        <el-date-picker
                            v-model="searchForm.time"
                            type="datetimerange"
                            :clearable="false"
                            :editable="false"
                            :range-separator="$t('exceptionPage.separator_label')"
                            :start-placeholder="$t('exceptionPage.beginTime_label')"
                            :end-placeholder="$t('exceptionPage.endTime_label')">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('exceptionPage.projectName_label')" prop="project">
                        <el-select v-model="searchForm.project" clearable filterable :placeholder="$t('exceptionPage.projectName_placeholder')">
                            <el-option v-for="(item) in projectList" :key="item.mark" :value="item.mark" :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div style="margin-right: 10px;">
                    <el-form-item>
                        <el-button type="primary" @click="getExceptionListMethod('first')" class="tableLastButtonStyleB icon iconfont icon-ic-search">{{$t('common.search_button')}}</el-button>
                        <el-button @click="resetSearchMethod" class="tableLastButtonStyleW icon iconfont icon-ic-refresh">{{$t('common.reset_button')}}</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div style="background-color: #ffffff">
            <div class="mark-title-style">
                <span>{{$t('route.exceptionPage')}}</span>
            </div>
            <div>
                <el-table :data="exceptionList"
                          class="list"
                          highlight-current-row
                          style="width: 100%"
                          stripe>
                    <el-table-column prop="project" :label="$t('exceptionPage.projectMark_label')" align="left" min-width="23%"></el-table-column>
                    <el-table-column prop="projectName" :label="$t('exceptionPage.projectName_label')" align="left" min-width="23%"></el-table-column>
                    <!--<el-table-column prop="uri" :label="$t('exceptionPage.url_label')" align="left" min-width="25%"></el-table-column>-->
                    <el-table-column prop="statusCode" :label="$t('exceptionPage.responseStatus_label')" align="left" min-width="23%"></el-table-column>
                    <el-table-column prop="respCnt" :label="$t('exceptionPage.responseCount_label')" align="right" min-width="23%"></el-table-column>
                    <el-table-column align="center" min-width="10%"></el-table-column>
                </el-table>
                <el-pagination v-if="paginationData.total != 0" :current-page="paginationData.pageNo + 1" class="pagination" @size-change="sizeChange" @current-change="currentChange" :page-size="paginationData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationData.total"></el-pagination>
            </div>
        </div>
    </el-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'exceptionPage',
    data() {
        return {
            searchForm: {
                time: [new Date()-3600*1000*24, new Date()-60*1000],
                project: ''
            },
            exceptionList: [],
            projectList: [],
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
        this.getExceptionListMethod('first')
        this.getProjectListMethod() // 查询项目下拉列表
        // this.getEnvMethod()
    },
    methods: {
        ...mapActions([
            'getExceptionListApi',
            'getProjectListApi',
            'getEnvApi'
        ]),
        // 获取环境变量
        getEnvMethod() {
            this.getEnvApi().then(res => {
                if (res.code == '0' && res.status == 200) {
                    let params = Object.assign({env: res.result})
                    this.getProjectListMethod(params)
                }
            })
        },
        // 获取下拉项目列表
        getProjectListMethod() {
            this.getProjectListApi().then(res => {
                this.projectList = res.result
            })
        },
        // 获取项目异常情况数据
        getExceptionListMethod(type) {
            if (!this.searchForm.time) {
                this.$message({
                    type: 'warning',
                    message: this.$t('exceptionPage.searchTime_validate')
                })
            } else {
                let jsonTemp = {
                    start: this.searchForm.time[0].valueOf() / 1000,
                    end: this.searchForm.time[1].valueOf() / 1000,
                    project: this.searchForm.project,
                    pageSize: this.paginationData.pageSize,
                    pageNo: type == 'first' ? 0 : this.paginationData.pageNo
                }
                let params = Object.assign(jsonTemp)
                this.getExceptionListApi(params).then(result => {
                    if (result && result.data) {
                        this.exceptionList = result.data
                        this.paginationData.pageNo = result.pageNo
                        this.paginationData.pageSize = result.pageSize
                        this.paginationData.total = result.total
                    } else {
                        this.$message({
                            type: 'error',
                            message: this.$t('exceptionPage.searchError_message')
                        })
                    }
                })
            }
        },
        // 查询重置
        resetSearchMethod() {
            this.$refs['searchForm'].resetFields()
            this.getExceptionListMethod('first')
        },
        // 切换每页数据个数
        sizeChange(val) {
            this.paginationData.pageSize = val
            this.getExceptionListMethod()
        },
        // 翻页方法
        currentChange(val) {
            this.paginationData.pageNo = val - 1
            this.getExceptionListMethod()
        }
    }
}
</script>

<style type="scss" scoped>
    /*搜索框div样式*/
    .search-div-style {
        min-height: 76px;
        background-color: #ffffff;
        border-bottom: 1px solid #EDEFF4;
        margin-bottom: 10px;
    }
    /*页面介绍及基本按键div样式*/
    .page-title-style{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        min-height: 76px;
        padding-top: 21px;
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
    /*table间距样式*/
    .list {
        padding: 0 30px;
        &.el-table::before {
            height: 0 !important;
        }
    }
</style>
