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
                <el-button @click="importDialog">导入部署包</el-button>
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
                            <a v-for="(path,index) in scope.row.path" :key="index" :href="openPage(path)">{{path}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <a class="tableActionStyle" @click="dialogInfo(scope.row.id)">查看详情</a>
                            <a class="tableActionStyle" @click="dialogChange(scope.row.id)">变更</a>
                            <a class="tableActionStyle" @click="beginDeploy(scope.row)">启动</a>
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
        <el-dialog title="导入部署包"
                   :visible.sync="dialogExpoVisible"
                   :before-close="beforeClose"
                   width="600px">
            <el-upload
                class="upload-demo"
                drag
                :before-upload="beforeAvatarUpload"
                :on-success="handleSuccess"
                :on-exceed="onexceed"
                :limit="1"
                name="pack"
                :action="url">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传rar/zip文件，且不超过10M</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="beforeClose" class="dialogButtonW">取消</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
import { mappingValue} from '@/utils'
import {MEMORY_SIZE} from '@/constants'
export default {
    data() {
        return {
            // import begin
            dialogExpoVisible: false,
            url: `${this.g_Config.BASE_URL}/project/import.do`,
            exportData: {},
            fileList: [],
            defaultUploadList: [],
            // import end
            searchCriteria: {
                name: '',
                pageNo: 0,
                pageSize: 10
            },
            // 启动
            startForm: {
                projectId: '',
                instance: '',
                memory: ''
            }
        }
    },
    methods: {
        ...mapActions(['getProjectList', 'getProjectStart']),

        openPage(path) {
            window.open(path)
        },
        // import begin
        importDialog() {
            this.dialogExpoVisible = true
        },

        // 详情
        dialogInfo(id) {
            this.$router.push({name: 'detailedList', params: {id: id}})
        },
        // 变更
        dialogChange(id) {
            console.log(id)
        },
        // 启动
        beginDeploy(val) {
            this.$confirm('是否确认启动项目？', '确认启动', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '正在启动请稍后'
                })
                console.log(val)
                this.startForm.projectId = val.id
                this.startForm.instance = val.instanceNumber
                this.startForm.memory = val.memorySize
                let params = Object.assign(this.startForm)
                this.getProjectStart(params).then(res => {
                    if (res.data.result.status == '200') {
                        this.searchProject()
                    }
                })
            }).catch(e => {
                console.log(e)
            })
        },
        beforeAvatarUpload(file) {
            const isZip = file.type === 'application/zip'
            const isLtM = file.size / 1024 / 1024 < 10
            if (!isZip) {
                this.$message.error('上传头像图片只能是 rar/zip 格式!')
            }
            if (!isLtM) {
                this.$message.error('上传头像图片大小不能超过 10MB!')
            }
            return isZip && isLtM;
        },
        beforeClose(done) {
            this.defaultUploadList = []
            done()
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        searchProject() {
            const params = this.searchCriteria
            this.getProjectList(params)
        },
        handleSuccess(file) {
            if (file.status == '200') {
                this.$message({
                    message: '导入成功！',
                    type: 'success'
                })
                this.dialogExpoVisible = false
                this.defaultUploadList = []
            }
        },
        onexceed() {
            this.$message({
                message: '只允许上传一个文件！',
                type: 'warning'
            })
        },
        // import end

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
            list: (state) => {
                return state.project.elements
            },
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

    .tableActionStyle{
        font-family:PingFangSC-Medium;
        font-size:12px;
        color:#016ad5;
        letter-spacing:0.86px;
        text-align:left;
        margin-right: 10px;
    }
    .projectDropDown {
        font-size: 12px !important;
        border: 1px solid $dropDown-border-color !important;
        border-radius:4px;
        padding: 4px 12px;
    }
    .el-upload-dragger{
        width: 560px;
    }
</style>
