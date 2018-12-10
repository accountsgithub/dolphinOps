<template>
    <!-- search -->
    <div style="background-color: #eceef3">
        <SearchPanel>
            <el-form :inline="true"
                     size="small"
                     :model="searchCriteria"
                     class="formPanel"
                     label-width="95px">
                <div>
                    <el-form-item :label="$t('projectMgt.name_label')">
                        <el-input v-model="searchCriteria.name"
                                  @keyup.enter.native="searchProject"
                                  :placeholder="$t('projectMgt.name_placeholder')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('projectMgt.mark_label')">
                        <el-input v-model="searchCriteria.mark"
                                  @keyup.enter.native="searchProject"
                                  :placeholder="$t('projectMgt.mark_placeholder')"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary"
                               @click="searchProject"
                               class="tableLastButtonStyleB icon iconfont icon-ic-search">{{$t('common.search_button')}}</el-button>
                    <el-button @click="reset"
                               class="tableLastButtonStyleW icon iconfont icon-ic-refresh"
                               style="margin-right: -10px;">{{$t('common.reset_button')}}</el-button>
                </el-form-item>
            </el-form>
        </SearchPanel>

        <list-panel>
            <!-- header start -->
            <template slot="header">
                <span class="header__title">{{$t('projectMgt.project_list_title')}}</span>
                <el-button @click="importDialog"
                           class="tableLastButtonStyleW icon iconfont icon-ic-import">{{$t('projectMgt.import_button')}}</el-button>
            </template>
            <!-- header end -->

            <!-- main start -->
            <template slot="main">
                <el-table :data="list"
                          class="list"
                          highlight-current-row
                          style="width: 100%"
                          stripe>
                    <el-table-column prop="mark"
                                     :label="$t('projectMgt.mark_label')" />
                    <el-table-column prop="name"
                                     :label="$t('projectMgt.name_label')">
                        <template slot-scope="scope">
                            <a href="javascript:;"
                               class="table-link"
                               v-if="scope.row.state !== 5"
                               @click="dialogInfo(scope.row)">{{scope.row.name}}
                            </a>
                            <span v-else>{{scope.row.name}}</span>
                    </template></el-table-column>
                    <el-table-column prop="instanceNumber"
                                     :label="$t('projectMgt.instanceNumber_label')" />
                    <el-table-column prop="version"
                                     :label="$t('projectMgt.version_label')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.version">{{scope.row.version}}</span>
                            <span v-else>—</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stateTxt"
                                     width="140"
                                     :label="$t('projectMgt.status_label')">
                        <template slot-scope="scope">
                            <tableStatus :statusType="scope.row.stateTxt"></tableStatus>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.operate_label')"
                                     :width="185">
                        <template slot-scope="scope">
                            <div class="oper-col">
                                <template>
                                    <i class="icon iconfont icon-qidong table-action" :title="$t('projectMgt.start_button')" @click="startUp(scope.row)" v-if="(scope.row.state === 0 || scope.row.state === 4) && scope.row.deployStatus !== 5" style="color:#82c362;"></i>
                                    <i class="icon iconfont icon-qidong table-action" :title="$t('projectMgt.deploy_button')" @click="beginDeploy(scope.row)" v-else-if="scope.row.deployStatus === 5" style="color:#82c362;"></i>
                                    <i class="icon iconfont icon-tingzhi table-action" :title="$t('projectMgt.stop_button')" @click="stopDeploy(scope.row)" v-else-if="scope.row.state === 1" style="color:red;"></i>
                                    <i class="icon iconfont icon-qidong table-action disabled" v-else></i>
                                </template>
                                <i class="icon iconfont icon-shezhi table-action" :title="$t('projectMgt.change_button')" @click="dialogChange(scope.row)" v-if="scope.row.state !== 5"></i>
                                <i class="icon iconfont icon-shezhi table-action disabled" :title="$t('projectMgt.change_button')" v-else></i>
                                <i class="icon iconfont icon-jichujiankong table-action" :title="$t('projectMgt.monitorcharts')" @click="monitorcharts(scope.row)"></i>
                                <el-dropdown trigger="click">
                                    <i class="icon iconfont icon-gengduo table-action"></i>
                                    <el-dropdown-menu slot="dropdown" class="more-ops">
                                        <el-dropdown-item>
                                            <a class="table-link">
                                                <i class="icon iconfont icon-rizhi table-action-more" :title="$t('projectMgt.unifiedLog')"></i>
                                                {{$t('projectMgt.unifiedLog')}}
                                            </a>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <a class="table-link">
                                                <i class="icon iconfont icon-peizhi table-action-more" :title="$t('projectMgt.unifiedConfig')"></i>
                                                {{$t('projectMgt.unifiedConfig')}}
                                            </a>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <template v-if="scope.row.rapStatus !== '2'">
                                                <a class="table-link" href="javascript:;" v-if="scope.row.state === 1" @click="testPageMethod(scope.row)">
                                                    <i class="icon iconfont icon-shezhi table-action-more" :title="$t('testPage.autoTest_button')"></i>
                                                    {{$t('testPage.autoTest_button')}}
                                                </a>
                                                <a class="table-link disabled" href="javascript:;" v-else>
                                                    <i class="icon iconfont icon-shezhi table-action-more disabled" :title="$t('testPage.autoTest_button')"></i>
                                                    {{$t('testPage.autoTest_button')}}
                                                </a>
                                            </template>
                                            <template v-else>
                                                <a class="table-link" href="javascript:;" @click="goTestReport(scope.row)">
                                                    <i class="icon iconfont icon-zidongceshijieguo table-action-more" :title="$t('projectMgt.testReport')"></i>
                                                    {{$t('projectMgt.testReport')}}
                                                </a>
                                            </template>
                                        </el-dropdown-item>
                                        <!-- <el-dropdown-item>
                                            <a class="table-link">
                                                <i class="icon iconfont icon-zidingyijiankong table-action-more" :title="$t('projectMgt.customChart')"></i>
                                                {{$t('projectMgt.customChart')}}
                                            </a>
                                        </el-dropdown-item> -->
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- main end -->

            <!-- pagination start -->
            <template slot="pagination">
                <el-pagination v-if="paging.total != 0"
                               :page-size="paging.pageSize"
                               :total="paging.total"
                               :current-page="paging.pageNo + 1"
                               class="pagination"
                               layout="total, sizes, prev, pager, next, jumper"
                               @size-change="handleSizeChange"
                               @current-change="handlePageChange" />
            </template>
            <!-- pagination end -->
        </list-panel>
        <env-modify v-on:update:close="envDialogOnClose"
                    v-on:add:item="addNewItem"
                    v-on:delete:item="deleteItem"
                    v-on:update:uploadType="handelUploadType"
                    :onClose="envDialogOnClose"
                    :envConfigDialog.sync="envConfigDialog"
                    :envConfigForm.sync="envConfigForm"
                    :dialogType.sync="dialogType"
                    :importId.sync="importId"
                    :refresh="searchProject"
                    isAdmin="0">
        </env-modify>
        <import-package v-on:update:close="handleImportDialogClose"
                        v-on:env:dialog:open="handleEnvDialogOpen"
                        :dialogExpoVisible.sync="dialogExpoVisible">
        </import-package>
        <white-list v-on:update:close="handleWhiteIpDialogClose"
                    :whiteIpDialog.sync="whiteIpDialog"
                    :whiteIpFrom.sync="whiteIpFrom"></white-list>
        <email-list v-on:update:close="handleEmailListDialogClose"
                    :EmailDialog.sync="EmailDialog"
                    :EmailForm.sync="EmailForm"></email-list>
        <charts :chartsDialog.sync="chartsDialog"
                :layerType="baseImageType"
                :project.sync="CurrentProject"
                v-on:update:close="chartsDialogOnClose"></charts>
    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SearchPanel } from '@/components/layout'
import tableStatus from '@/components/Status'
import EnvModify from './part/EnvModify'
import ImportPackage from './part/ImportPackage'
import WhiteList from './part/WhiteList'
import EmailList from './part/EmailList'
import charts from './part/ProjectMonitor'
export default {
    components: {
        SearchPanel,
        tableStatus,
        charts,
        'env-modify': EnvModify,
        'import-package': ImportPackage,
        'white-list': WhiteList,
        'email-list': EmailList
    },

    data() {
        return {
            dialogType: 'upload',
            // import begin
            dialogExpoVisible: false,
            envConfigDialog: false,
            whiteIpDialog: false,
            EmailDialog: false,
            exportData: {},
            tempPS: 10,
            tempPN: 0,
            defaultUploadList: [],
            // 启动
            startForm: {
                projectId: '',
                instance: '',
                memory: ''
            },
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
            EmailForm: {
                projectId: '',
                emails: ''
            },
            statusArray: [
                this.$t('projectMgt.stop_data'),
                this.$t('projectMgt.running_data'),
                this.$t('projectMgt.deploy_data'),
                this.$t('projectMgt.start_data'),
                this.$t('projectMgt.error_data'),
                this.$t('projectMgt.init_data'),
                this.$t('projectMgt.systemError_data')],
            basePath: '',
            ifprod: false,
            // 基础监控
            chartsDialog: false,
            CurrentProject: Object,
            baseImageType: null
        }
    },
    created: function() {
        var location = (`${window.location}`).split('/');
        var path = location[2];
        this.basePath = path;
        if (path.indexOf('prod') !== -1) {
            this.ifprod = true;
        }
    },
    methods: {
        ...mapActions(['getProjectList', 'getProjectStart', 'saveEnv', 'saveUplaod', 'getProjectStop', 'getProjectDeploy', 'setWhiteIp', 'setEmail', 'resetSearchCriteria']),

        getPath(path) {
            if (path && /\[(.*)\]?/g.test(path)) {
                return JSON.parse(path)[0]
            }
        },
        // 详情
        dialogInfo(row) {
            if (row.state === 5) {
                return
            }
            this.$router.push({ name: 'detailedList', params: { id: row.id, proName: row.name } })
        },
        submitUpload() {
            this.$refs.upload.submit()
        },
        searchProject() {
            const params = this.searchCriteria
            params['pageNo'] = 0
            this.getProjectList(params)
        },
        reset() {
            this.resetSearchCriteria();
            this.getProjectList(this.searchCriteria)
        },
        handleSizeChange(pageSize) {
            this.tempPS = pageSize
            const params = Object.assign({}, this.searchCriteria, { pageSize })
            this.getProjectList(params)
        },
        handlePageChange(pageNo) {
            const params = Object.assign({}, this.searchCriteria, { pageNo: pageNo - 1 })
            this.getProjectList(params)
        },
        // 变更
        dialogChange(record) {
            this.dialogType = ''
            this.envConfigForm.version = ''
            this.envConfigForm.desc = ''
            this.envConfigForm.uploadType = 0

            this.envConfigDialog = true
            this.envConfigForm.uploadType = record.uploadType
            this.envConfigForm.projectId = record.id
            this.envConfigForm.instanceNumber = record.instanceNumber
            this.envConfigForm.memorySize = record.memorySize
            this.envConfigForm.envVariables = record.env ? JSON.parse(record.env) : []
            this.envConfigForm.ipAlias = record.ipAlias ? JSON.parse(record.ipAlias) : []
        },
        // 变更取消
        envDialogOnClose() {
            this.envConfigDialog = false;
            this.envConfigForm.uploadType = 0;
            this.envConfigForm.ipAlias = []
            this.envConfigForm.envVariables = []
        },
        addNewItem(prop) {
            this.envConfigForm[prop].push({ isNew: true })
        },

        deleteItem(row, prop) {
            this.envConfigForm[prop] = this.envConfigForm[prop].filter(item => item != row);
        },
        handelUploadType(type) {
            this.envConfigForm.uploadType = type
        },
        importDialog() {
            this.dialogExpoVisible = true;
        },
        handleImportDialogClose() {
            this.dialogExpoVisible = false;
        },
        handleEnvDialogOpen(file) {
            if (file.result) {
                this.envConfigForm.auditor = file.result.auditorName
                this.envConfigForm.instanceNumber = file.result.instanceNumber
                this.envConfigForm.memorySize = file.result.memorySize
                this.envConfigForm.tempPath = file.result.tempPath
                // this.importId = file.result.id
            }
            this.dialogType = 'upload'
            this.envConfigDialog = true
        },
        //开始部署
        beginDeploy(val) {
            this.$confirm(this.$t('projectMgt.isDeploy_message'), this.$t('projectMgt.sureDeploy_message'), {
                confirmButtonText: this.$t('common.sure_button'),
                cancelButtonText: this.$t('common.cancel_button'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.deploying_message')
                })
                let params = Object.assign({ id: val.desireDeployId })
                this.getProjectDeploy(params).then(res => {
                    if (res.status === 200) {
                        this.searchProject()
                    }
                })
            }).catch((
            ) => {
                this.$message({
                    message: this.$t('projectMgt.cancel_message')
                })
            })
        },

        // 启动
        startUp(val) {
            this.$confirm(this.$t('projectMgt.isStart_message'), this.$t('projectMgt.sureStart_message'), {
                confirmButtonText: this.$t('common.sure_button'),
                cancelButtonText: this.$t('common.cancel_button'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.starting_message')
                })
                this.startForm.projectId = val.id
                this.startForm.instance = val.instanceNumber
                this.startForm.memory = val.memorySize
                let params = Object.assign(this.startForm)
                this.getProjectStart(params).then(res => {
                    if (res.status === 200) {
                        this.searchProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.start_message')
                })
            })
        },

        // 停止
        stopDeploy(val) {
            this.$confirm(this.$t('projectMgt.isStop_message'), this.$t('projectMgt.sureStop_message'), {
                confirmButtonText: this.$t('common.sure_button'),
                cancelButtonText: this.$t('common.cancel_button'),
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: this.$t('projectMgt.stoping_message')
                })
                let params = Object.assign({ name: val.mark })
                this.getProjectStop(params).then(res => {
                    if (res.status === 200) {
                        this.searchProject()
                    }
                })
            }).catch(() => {
                this.$message({
                    message: this.$t('projectMgt.stop_message')
                })
            })
        },
        // 自动化测试
        testPageMethod(row) {
            this.$router.push({ name: 'testReport', params: { mark: row.mark } })
        },
        // 测试报告
        goTestReport(row) {
            if (localStorage.getItem('path')) {
                localStorage.removeItem('path')
            }
            localStorage.setItem('path', row.path)
            this.$router.push({ name: 'testReport', params: { mark: row.mark } })
        },
        // 基础监控
        monitorcharts(item) {
            // console.log(item.baseImage)
            // console.log(this.trasBaseImage(item.baseImage))
            let baseImageType = this.trasBaseImage(item.baseImage)
            // console.log('baseImageType', baseImageType)
            if (baseImageType === 'tomcat') {
                // console.log('tomcat弹出')
                this.chartsDialog = true
                this.CurrentProject = item
                this.baseImageType = 'tomcat'
            } else if (baseImageType === 'others') {
                // console.log('orthers弹出')
                this.chartsDialog = true
                this.CurrentProject = item
                this.baseImageType = 'others'
            } else {
                console.log('没有图表数据')
                this.baseImageType = ''
            }
        },
        // baseImage处理
        trasBaseImage(type) {
            if (type.length && type.indexOf('tomcat') != -1) {
                return 'tomcat'
            } else if (type.length) {
                return 'others'
            } else {
                return false
            }
        },
        //白名单设置
        whiteIpConfig(row) {
            this.whiteIpDialog = true
            this.whiteIpFrom.projectId = row.id
            this.whiteIpFrom.whiteList = row.whiteList
        },

        addEmail(row) {
            this.EmailDialog = true
            this.EmailForm.projectId = row.id
            this.EmailForm.emails = row.emails

        },
        handleWhiteIpDialogClose() {
            this.whiteIpDialog = false
        },
        handleEmailListDialogClose() {
            this.EmailDialog = false
        },
        chartsDialogOnClose() {
            console.log('进入关闭')
            this.chartsDialog = false
            // this.CurrentProject = {}
        }
    },

    computed: {
        ...mapState({
            list: (state) => {
                return state.project.elements
            },
            paging: state => state.project.paging,
            auditor: 'admin',
            searchCriteria: state => state.project.searchCriteria
        }),
        isOffLine() {
            return this.g_Config.ISOFFLINE === '1'
        }
    },


    mounted() {
        const _this = this
        let params = this.searchCriteria
        this.getProjectList(params)
        this.interval = setInterval(() => {
            params = _this.searchCriteria
            _this.getProjectList(params)
        }, 15000);
    },

    destroyed() {
        clearInterval(this.interval)
    },
    /*eslint-disable*/
  beforeRouteEnter (to, from, next) {
    try {
      if (JSON.parse(localStorage.getItem('token')) === 'project') {
        next(vm => {
          vm.$router.replace({ name: 'projectItem' })
        })
      } else {
        next()
      }
    }
    catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/common.scss";

.oper-col .disabled {
    color:#979797;
}
.el-dropdown-menu /deep/ .disabled {
    color:#979797;
}

// 操作标签样式
.table-link {
  color: #016ad5;
}
.table-action {
  margin-right: 24px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #016ad5;
  letter-spacing: 0.86px;
  text-align: left;
  cursor: pointer;
}
.table-action-more {
  margin-right: 10px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #016ad5;
  letter-spacing: 0.86px;
  text-align: left;
  cursor: pointer;
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

.formPanel {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
}
.more-ops a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
</style>
