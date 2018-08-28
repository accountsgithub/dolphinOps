<template>
    <!-- search -->
    <div>
        <search-panel>
            <el-form
                :inline="true"
                size="small"
                :model="searchCriteria"
                class="formPanel"
                label-width="80px">
                <div class="searchCriteriaContent">
                    <el-form-item label="项目名称">
                        <el-input
                            v-model="searchCriteria.name"
                            placeholder="项目名称"/>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="searchProject">搜索</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </search-panel>

        <list-panel>
            <!-- header start -->
            <template slot="header">
                <span class="header__title">项目列表</span>
                <el-button >导入部署包</el-button>
            </template>
            <!-- header end -->

            <!-- main start -->
            <template slot="main">
                <el-table
                    :data="list"
                    class="list"
                    highlight-current-row
                    style="width: 100%"
                    stripe>
                    <el-table-column
                        prop="name"
                        label="项目名称"
                        width="180"/>
                    <el-table-column
                        prop="mark"
                        label="项目标识"
                        width="180"/>
                    <el-table-column
                        prop="state"
                        label="运行状态"/>
                    <el-table-column
                        prop="instanceNumber"
                        label="实例数"/>

                    <el-table-column
                        prop="memorySize"
                        label="内存（MB）">
                        <template slot-scope="scope">
                            {{ mappingMemory(+scope.row.memorySize) }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="version"
                        label="当前版本"/>
                    <el-table-column
                        prop="path"
                        label="外部路径">
                        <template slot-scope="scope">
                            <a>{{scope.row.path}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作">
                        <template>
                            <el-button type="text">查看详情</el-button>
                            <el-button type="text">变更</el-button>
                            <el-button type="text">启动</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- main end -->

            <!-- pagination start -->
            <template slot="pagination">
                <el-pagination
                    v-if="paging.total != 0"
                    :page-size="paging.pageSize"
                    :total="paging.total"
                    :current-page="paging.pageNo + 1"
                    class="pagination"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"/>
            </template>
            <!-- pagination end -->
        </list-panel>
    </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
import { mappingValue} from '@/utils'
import {MEMORY_SIZE} from '@/constants'
export default {
    data() {
        return {
            searchCriteria: {
                name: '',
                pageNo: 0,
                pageSize: 10
            }
        }
    },
    methods: {
        ...mapActions(['getProjectList']),

        searchProject() {
            const params = this.searchCriteria
            this.getProjectList(params)
        },

        reset() {
            this.searchCriteria = {
                name: '',
                pageNo: 0,
                pageSize: 10
            }
            this.getProjectList(this.searchCriteria)
        },

        handleSizeChange(pageSize) {
            const params = Object.assign({}, this.searchCriteria, {pageSize})
            this.$set(this.searchCriteria, 'pageSize', pageSize)
            this.getProjectList(params)
        },

        handlePageChange(pageNo) {
            const params = Object.assign({}, this.searchCriteria, {pageNo: pageNo - 1})
            this.getProjectList(params)
        },

        mappingMemory(value) {
            return mappingValue(value)(MEMORY_SIZE)
        },
    },

    computed: {
        ...mapState({
            list: state => state.project.elements,
            paging: state => state.project.paging
        })
    },


    mounted() {
        const params = this.searchCriteria
        this.getProjectList(params)
    }
}
</script>

<style lang="scss">
    @import '~@/styles/common.scss';
    .projectDropDown {
        font-size: 12px !important;
        border: 1px solid $dropDown-border-color !important;
        border-radius:4px;
        padding: 4px 12px;
    }
</style>
