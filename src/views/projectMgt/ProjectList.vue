<template>
    <!-- search -->
    <div>
        <SearchPanel>
            <el-form
                :inline="true"
                size="small"
                :model="searchCriteria"
                class="formPanel"
                label-width="80px">
                <div>
                    <el-form-item label="项目名称">
                        <el-input
                            v-model="searchCriteria.name"
                            placeholder="项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="项目标识">
                        <el-input
                            v-model="searchCriteria.mark"
                            placeholder="项目标识"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="searchProject" class="tableLastButtonStyleB icon iconfont icon-ic-search">搜索</el-button>
                    <el-button @click="reset" class="tableLastButtonStyleW icon iconfont icon-ic-refresh" style="margin-right: -10px;">重置</el-button>
                </el-form-item>
            </el-form>
        </SearchPanel>

        <list-panel>
            <!-- header start -->
            <template slot="header">
                <span class="header__title">项目列表</span>
                <el-button @click="importDialog" class="tableLastButtonStyleW icon iconfont icon-ic-import">导入部署包</el-button>
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
                        width="180"
                        label="运行状态">
                        <template slot-scope="scope">
                            <tableStatus :statusType="statusArray[+scope.row.state]"></tableStatus>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="instanceNumber"
                        width="80"
                        label="实例数"/>

                    <el-table-column
                        prop="memorySize"
                        width="100"
                        label="内存（MB）">
                    </el-table-column>
                    <el-table-column
                        prop="version"
                        width="100"
                        label="当前版本"/>
                    <el-table-column
                        prop="path"
                        label="外部路径">
                        <template slot-scope="scope">
                            <a class="pathHerf" :href="getPath(scope.row.path)" target="_blank">{{getPath(scope.row.path)}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="250">
                        <template slot-scope="scope">
                            <a class="tableActionStyle" @click="dialogInfo(scope.row)" v-if="scope.row.state != '4' && scope.row.state != '5'">查看详情</a>
                            <a class="tableActionStyle" @click="dialogChange(scope.row)" v-if="scope.row.state != '4' && scope.row.state != '5'">变更</a>
                            <a class="tableActionStyle" @click="stopDeploy(scope.row)" v-if="scope.row.state == '1'">停止</a>
                            <a class="tableActionStyle" @click="startUp(scope.row)" v-else-if="scope.row.state != '1' && scope.row.state != '3'">启动</a>
                            <a class="tableActionStyle" @click="beginDeploy(scope.row)" v-if="scope.row.deployStatus && scope.row.deployStatus == '5'">开始部署</a>
                            <a class="tableActionStyle" v-if="ifprod" @click="whiteIpConfig(scope.row)">白名单设置</a>
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
                   @close="clearItem"
                   width="600px">
            <el-upload
                class="upload-demo"
                drag
                :before-upload="beforeAvatarUpload"
                :on-success="handleSuccess"
                :on-exceed="onexceed"
                :limit="1"
                with-credentials
                :file-list="fileList"
                name="pack"
                :action="url">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传rar/zip文件，且不超过100M</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="beforeClose" class="dialogButtonW">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加白名单" :visible.sync="whiteIpDialog" width="600px">
            <el-form :model="whiteIpFrom" label-width="100px">
                <el-form-item label="地址:">
                    <el-input v-model="whiteIpFrom.whiteList" auto-complete="off" placeholder="请填写白名单地址,多个地址请用逗号 (',') 分隔"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="whiteIpDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveWhiteIp">确 定</el-button>
            </div>
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
                        <el-form-item label="上传类型" v-if="dialogType == 'upload'">
                            <div class="uploadType">
                                <div class="uploadField" :class="{active: envConfigForm.uploadType === 0}" @click="handelUploadType(0)">
                                    BUG修复
                                </div>
                                <div class="uploadField" :class="{active: envConfigForm.uploadType === 1}" @click="handelUploadType(1)">
                                    版本发布
                                </div>
                            </div>
                        </el-form-item>

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

                        <el-form-item label="审核人" v-if="dialogType == 'upload'">
                            <el-input disabled v-model="envConfigForm.auditor">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="版本说明" prop="desc" v-if="dialogType == 'upload'">
                            <el-input type="textarea" v-model="envConfigForm.desc"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <!-- 环境变量 -->
                    <el-tab-pane label="环境变量" style="text-align: center">
                        <el-table :data="envConfigForm.envVariables" width="100%" highlight-current-row stripe>
                            <el-table-column property="label" label="变量">
                                <template slot-scope="scope">
                                    <el-form-item prop="countName" class="VF-style">
                                        <el-input size="small"
                                                  v-if="scope.row.isNew"
                                                  v-model="scope.row.key"
                                                  placeholder="请输入变量" class="validate-text"></el-input>
                                    </el-form-item>
                                    <span v-if="!scope.row.isNew" >{{scope.row.key}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="value" label="值">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.value"
                                              placeholder="请输入值" class="validate-style"></el-input>
                                    <el-tooltip placement="top-start" effect="light">
                                        <div slot="content" style="width: 300px; white-space: nowrap; word-break: break-word">{{scope.row.value}}</div>
                                        <span v-if="!scope.row.isNew" class="noWrap">{{scope.row.value}}</span>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="deleteItem(scope.row, 'envVariables')" class="validate-style">删除</el-button>
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
                                              placeholder="请输入IP别名" class="validate-style"></el-input>
                                    <span v-if="!scope.row.isNew">{{scope.row.key}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="value" label="IP">
                                <template slot-scope="scope" >
                                    <el-form-item prop="IP" class="VF-style">
                                        <el-input size="small"
                                                  v-if="scope.row.isNew"
                                                  v-model="scope.row.value"
                                                  placeholder="请输入IP" class="validate-text"></el-input>
                                    </el-form-item>
                                    <span v-if="!scope.row.isNew">{{scope.row.value}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column property="value" label="别名备注">
                                <template slot-scope="scope">
                                    <el-input size="small"
                                              v-if="scope.row.isNew"
                                              v-model="scope.row.desc"
                                              placeholder="请输入别名备注" class="validate-style"></el-input>
                                    <span v-if="!scope.row.isNew">{{scope.row.desc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column>
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="deleteItem(scope.row, 'ipAlias')" class="validate-style">删除</el-button>
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
import tableStatus from '@/components/Status'
import {SearchPanel} from '@/components/layout'
export default {
    components: {
        SearchPanel,
        tableStatus
    },

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

        // IP验证
        const IPValidate = (rule, value, callback) => {
            if (value !='' && /^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$/.test(value)) {
                callback(new Error('IP格式不正确！'));
            } else {
                callback();
            }
        };

        //变量验证
        const nameValidate = (rule, value, callback) => {
            if (value != '' && /^[A-Za-z_][A-Za-z0-9_]$/.test(value)) {
                callback(new Error('格式不正确！'))
            } else {
                callback();
            }
        }

        return {
            dialogType: 'upload',
            // import begin
            dialogExpoVisible: false,
            envConfigDialog: false,
            whiteIpDialog: false,
            url: `${this.g_Config.BASE_URL}/project/import.do`,
            exportData: {},
            fileList: [],
            tempPS: 10,
            tempPN: 0,
            defaultUploadList: [],
            // import end
            searchCriteria: {
                mark: '',
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
            importId: '', //导入部署包importId参数
            envConfigForm: {
                projectId: '',
                instanceNumber: '',
                memorySize: '',
                envVariables: [],
                ipAlias: [],

                // 上传
                auditor: 'admin',
                desc: '',
                uploadType: 0,
                interval: null,
            },
            whiteIpFrom: {
                projectId: '',
                whiteList: ''
            },
            statusArray: ['已停止','运行中','待部署','启动中','故障','初始','系统崩溃'],
            rules: {
                instanceNumber: [
                    { required: true, message: '请输入实例数', trigger: 'blur' },
                    { validator: NumberApply, trigger: 'blur' }
                ],
                memorySize: [
                    { required: true, message: '请输入内存大小', trigger: 'blur' },
                ],
                auditor: [
                    { required: true, message: '请输入审核人', trigger: 'blur' },
                ],
                uploadType: [
                    { required: true, message: '请输入上传类型', trigger: 'blur' },
                ],
                IP: [
                    { validator: IPValidate, trigger: 'blur' }
                ],
                countName: [
                    { validator: nameValidate, trigger: 'blur' }
                ]
            },
            basePath: '',
            ifprod: false
        }
    },
    created: function() {
        var location = (`${window.location}`).split('/');
        var path= location[2];
        this.basePath=path;
        if (path.indexOf('prod')!==-1) {
            this.ifprod=true;
        }
    },
    methods: {
        ...mapActions(['getProjectList', 'getProjectStart', 'saveEnv', 'saveUplaod', 'getProjectStop', 'getProjectDeploy', 'setWhiteIp']),

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
        dialogInfo(row) {
            debugger
            this.$router.push({name: 'detailedList', params: {id: row.id, proName: row.name}})
        },
        // 变更
        dialogChange(record) {
            this.dialogType = ''
            this.envConfigForm.version = ''
            this.envConfigForm.desc = ''
            this.envConfigForm.uploadType = 0

            this.envConfigDialog = true
            this.envConfigForm.projectId = record.id
            this.envConfigForm.instanceNumber = record.instanceNumber
            this.envConfigForm.memorySize = record.memorySize
            this.envConfigForm.envVariables = record.env ? JSON.parse(record.env) : []
            this.envConfigForm.ipAlias = record.ipAlias ? JSON.parse(record.ipAlias) : []
        },


        //白名单设置
        whiteIpConfig(row) {
            this.whiteIpDialog=true
            this.whiteIpFrom.projectId=row.id
            this.whiteIpFrom.whiteList=row.whiteList
        },

        saveWhiteIp() {
            const params = {
                projectId: this.whiteIpFrom.projectId,
                whiteList: this.whiteIpFrom.whiteList
            }
            this.setWhiteIp(params)
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    })
                    this.whiteIpDialog=false
                })
        },
        //开始部署
        beginDeploy(val) {
            this.$confirm('是否确认部署项目？', '确认部署', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '正在部署请稍后！'
                })
                let params = Object.assign({id: val.desireDeployId})
                this.getProjectDeploy(params).then(res => {
                    if (res.data.result.status == '200') {
                        this.searchProject()
                    }
                })
            }).catch((
            ) => {
                this.$message({
                    message: '操作已取消！'
                })
            })
        },

        // 启动
        startUp(val) {
            this.$confirm('是否确认启动项目？', '确认启动', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '正在启动请稍后！'
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
            }).catch(() => {
                this.$message({
                    message: '操作已取消！'
                })
            })
        },

        // 停止
        stopDeploy(val) {
            this.$confirm('是否确认停止项目？', '确认停止', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '正在停止请稍后！'
                })
                let params = Object.assign({name: val.mark})
                this.getProjectStop(params).then(res => {
                    if (res.data.result.status == '200') {
                        this.searchProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: '操作已取消！'
                })
            })
        },

        beforeAvatarUpload(file) {
            let isZip = file.type.indexOf('zip') !== -1 || file.type.indexOf('rar') !== -1
            const isLtM = file.size / 1024 / 1024 < 100
            if (file.type == '' && file.name) {
                let arrayTemp = file.name.split('.')
                let fileType = arrayTemp[1]
                isZip = fileType === 'rar'
            }
            if (!isZip) {
                this.$message.error('上传文件类型只能是 rar/zip 格式!')
            }
            if (!isLtM) {
                this.$message.error('上传文件大小不能超过 100MB!')
            }
            return isZip && isLtM;
        },
        beforeClose(done) {
            this.dialogExpoVisible = false
            this.fileList = []
            done()
        },
        clearItem() {
            this.fileList = []
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
                this.fileList = []
                this.dialogType = 'upload'
                if (file.result) {
                    this.envConfigForm.auditor = file.result.auditorName
                    this.envConfigForm.instanceNumber = file.result.instanceNumber
                    this.envConfigForm.memorySize = file.result.memorySize
                    this.importId = file.result.id
                }
                this.envConfigDialog = true
            } else {
                this.$message({
                    message: '导入失败！',
                    type: 'error'
                })
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
                mark: '',
                name: '',
                pageNo: 0,
                pageSize: 10
            }
            this.getProjectList(this.searchCriteria)
        },

        handleSizeChange(pageSize) {
            this.tempPS = pageSize
            const params = Object.assign({}, this.searchCriteria, {pageSize})
            this.$set(this.searchCriteria, 'pageSize', pageSize)
            this.getProjectList(params)
        },

        handlePageChange(pageNo) {
            this.tempPN = pageNo-1
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
            this.envConfigForm.uploadType = '0'
        },

        handelUploadType(type) {
            this.envConfigForm.uploadType = type
        },

        saveEnvConfig() {
            this.$refs['envForm'].validate((valid) => {
                if (valid) {
                    const {instanceNumber, memorySize, envVariables, ipAlias, projectId, auditor, desc, uploadType} = this.envConfigForm
                    if (this.dialogType == 'upload') {
                        const params = {
                            importId: this.importId,
                            auditor,
                            desc,
                            uploadType,
                            instanceNumber: instanceNumber,
                            memorySize: memorySize,
                            env: JSON.stringify(envVariables),
                            ipAlias: JSON.stringify(ipAlias)
                        }
                        this.saveUplaod(params).then(() => {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            })
                            this.closeEnvDialog()
                        })
                    } else {
                        const params = {
                            projectId,
                            instance: instanceNumber,
                            memory: memorySize,
                            env: JSON.stringify(envVariables),
                            ipAlias: JSON.stringify(ipAlias),
                            searchParams: this.searchCriteria
                        }
                        this.saveEnv(params).then(() => {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            })
                            this.closeEnvDialog()
                        })
                    }
                }
            })
        }
    },

    computed: {
        ...mapState({
            list: (state) => {
                return state.project.elements
            },
            paging: state => state.project.paging,
            auditor: 'admin'
        })
    },


    mounted() {
        const params = this.searchCriteria
        this.getProjectList(params)
        this.interval = setInterval(this.getProjectList.bind(this, params),15000);
    },

    destroyed() {
        clearInterval(this.interval)
    },

}
</script>

<style lang="scss" scoped>
    @import '~@/styles/common.scss';

    // 操作标签样式
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
    /deep/ .el-upload-dragger{
        width: 560px;
    }
    .pathHerf {
        color: #016ad5 !important;
    }

    .addRowBtn {
        padding: 7px 15px !important;
        margin-top: 18px;
    }
    .noWrap {
        white-space: nowrap !important;
    }

    @include e(body) {
        padding: 0 30px;
        .list {
            padding: 0 30px;
            &.el-table::before {
                height: 0 !important;
            }
        }
    }

    // 验证样式
    .validate-style {
        margin-bottom: 18px;
    }
    .validate-text {
        margin-left: -100px;
        width: 120px;
    }
    .VF-style {
        /deep/ .el-form-item__error {
            left: -100px!important;
        }
    }

    // 上传类型button
    .uploadType {
        display: flex;
        height: 30px;
        line-height: 1px;
        align-items: center;
        .uploadField {
            text-align: center;
            font-family:PingFangSC-Medium;
            font-size:12px;
            color: #606266;
            letter-spacing:0;
            border: 1px solid #dcdfe6;;
            border-radius: 4px;
            width: 78px;
            height: 30px;
            line-height: 28px;
            cursor: pointer;
            margin-right: 20px;
            &:hover, &.active {
                border-color: #409EFF;
                color: #409EFF;
            }
        }
    }

    .formPanel {
        width: 100% !important;
        display: flex;
        justify-content: space-between;
    }

</style>
