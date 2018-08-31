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
                    </el-table-column>
                    <el-table-column
                        prop="version"
                        label="当前版本"/>
                    <el-table-column
                        prop="path"
                        label="外部路径">
                        <template slot-scope="scope">
                            <a class="pathHerf" :href="getPath(scope.row.path)" target="_blank">{{getPath(scope.row.path)}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="操作">
                        <template slot-scope="scope">
                            <a class="tableActionStyle" @click="dialogInfo(scope.row.id)">查看详情</a>
                            <a class="tableActionStyle" @click="dialogChange(scope.row)">变更</a>
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
        <el-dialog
            title="环境配置-编辑"
            top="30vh"
            width="600px"
            :visible.sync="envConfigDialog">
            <el-form
                size="small"
                label-width="100px"
                style="margin-top: -25px"
                :rules="rules"
                ref="envForm"
                :model="envConfigForm">
                <el-tabs>
                    <el-tab-pane label="基础信息">
                        <el-form-item label="实例数" prop="instanceNumber">
                            <el-input
                                placeholder="请输入实例数"
                                v-model="envConfigForm.instanceNumber">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="内存(单位MB)" prop="memorySize">
                            <el-select
                                style="width:100%"
                                v-model="envConfigForm.memorySize"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label"/>
                            </el-select>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 环境变量 -->
                    <el-tab-pane label="环境变量" style="text-align: center">
                        <el-table :data="envConfigForm.envVariables" width="100%" highlight-current-row stripe>
                            <el-table-column property="label" label="变量">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.key"
                                              placeholder="请输入变量"></el-input>
                                    <span v-if="!scope.row.isNew" >{{scope.row.key}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="value" label="值">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.value"
                                              placeholder="请输入值"></el-input>
                                    <el-tooltip placement="top-start" effect="light">
                                        <div slot="content" style="width: 300px; white-space: nowrap; word-break: break-word">{{scope.row.value}}</div>
                                        <span v-if="!scope.row.isNew" class="noWrap">{{scope.row.value}}</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="deleteItem(scope.row, 'envVariables')">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button class="addRowBtn" icon="el-icon-plus" size="mini" @click="addNewItem('envVariables')">添加环境变量</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="IP别名" style="text-align: center">
                        <el-table :data="envConfigForm.ipAlias" width="100%" highlight-current-row stripe>
                            <el-table-column property="label" label="IP别名">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.key"
                                              placeholder="请输入IP别名"></el-input>
                                    <span v-if="!scope.row.isNew">{{scope.row.key}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="value" label="IP">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.value"
                                              placeholder="请输入IP"></el-input>
                                    <span v-if="!scope.row.isNew">{{scope.row.value}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="value" label="别名备注">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.desc"
                                              placeholder="请输入别名备注"></el-input>
                                    <span v-if="!scope.row.isNew">{{scope.row.desc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="deleteItem(scope.row, 'ipAlias')">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button class="addRowBtn" icon="el-icon-plus" size="mini" @click="addNewItem('ipAlias')">添加环境变量</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeEnvDialog">取消</el-button>
                <el-button type="primary" @click="saveEnvConfig">保存</el-button>
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
        const NumberApply = (rule, value, callback) => {
            if (value === '' || !value) {
                callback(new Error('请输入实例数'));
            } else if (!/^\d+$/.test(value)) {
                callback(new Error('实例数必须是正整数'));
            } else {
                callback();
            }
        };

        return {
            // import begin
            dialogExpoVisible: false,
            envConfigDialog: false,
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
            },
            options: MEMORY_SIZE,
            envConfigForm: {
                projectId: '',
                instanceNumber: '',
                memorySize: '',
                envVariables: [],
                ipAlias: []
            },
            rules: {
                instanceNumber: [
                    { required: true, message: '请输入实例数', trigger: 'blur' },
                    { validator: NumberApply, trigger: 'blur' }
                ],
                memorySize: [
                    { required: true, message: '请输入内存大小', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        ...mapActions(['getProjectList', 'getProjectStart', 'saveEnv']),

        getPath(path) {
            if (path && /\[(.*)\]?/g.test(path)) {
                return JSON.parse(path)[0]
            }
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
        dialogChange(record) {
            this.envConfigDialog = true
            this.envConfigForm.projectId = record.id;
            this.envConfigForm.instanceNumber = record.instanceNumber
            this.envConfigForm.memorySize = record.memorySize
            this.envConfigForm.envVariables = record.env ? JSON.parse(record.env) : []
            this.envConfigForm.ipAlias = record.ipAlias ? JSON.parse(record.ipAlias) : []
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

        addNewItem(prop) {
            this.envConfigForm[prop].push({isNew: true})
        },

        deleteItem(row, prop) {
            this.envConfigForm[prop] = this.envConfigForm[prop].filter(item => item != row);
        },

        closeEnvDialog() {
            this.envConfigDialog = false
            this.$refs['envForm'].resetFields();
        },

        saveEnvConfig() {
            const {instanceNumber, memorySize, envVariables, ipAlias, projectId} = this.envConfigForm
            const params = {
                projectId,
                instance: instanceNumber,
                memory: memorySize,
                env: JSON.stringify(envVariables),
                ipAlias: JSON.stringify(ipAlias),
                searchParams: this.searchCriteria
            }
            this.saveEnv(params).then(() => {
                this.closeEnvDialog()
            })
        }
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
    .pathHerf {
        color: #016ad5 !important;
    }

    .addRowBtn {
        margin-top: 18px;
    }
    .noWrap {
        white-space: nowrap !important;
    }
</style>
