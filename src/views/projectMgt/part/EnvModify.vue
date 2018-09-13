<template>
    <el-dialog
        title="环境配置-编辑"
        top="30vh"
        width="600px"
        :visible.sync="dialogVisible">
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
</template>
<script>
import { mapActions } from 'vuex';
import {MEMORY_SIZE} from '@/constants'
export default {
    name: 'EnvModify',
    props: {
        // 是否是管理员
        isAdmin: {
            type: String
        },
        // 导入部署包importId参数
        importId: {
            type: String
        },
        dialogType: {
            type: String
        },
        // 弹层显隐标志
        envConfigDialog: {
            type: Boolean
        },
        // 表单
        envConfigForm: {
            type: Object
        }
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
            if (
                value != '' &&
                /^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$/.test(
                    value
                )
            ) {
                callback(new Error('IP格式不正确！'));
            } else {
                callback();
            }
        };

        //变量验证
        const nameValidate = (rule, value, callback) => {
            if (value != '' && /^[A-Za-z_][A-Za-z0-9_]$/.test(value)) {
                callback(new Error('格式不正确！'));
            } else {
                callback();
            }
        };
        return {
            options: MEMORY_SIZE,
            rules: {
                instanceNumber: [
                    { required: true, message: '请输入实例数', trigger: 'blur' },
                    { validator: NumberApply, trigger: 'blur' }
                ],
                memorySize: [
                    { required: true, message: '请输入内存大小', trigger: 'blur' }
                ],
                auditor: [{ required: true, message: '请输入审核人', trigger: 'blur' }],
                uploadType: [
                    { required: true, message: '请输入上传类型', trigger: 'blur' }
                ],
                IP: [{ validator: IPValidate, trigger: 'blur' }],
                countName: [{ validator: nameValidate, trigger: 'blur' }]
            }
        };
    },
    computed: {
        dialogVisible: {
            get() {
                return this.envConfigDialog
            },
            set() {
                this.$emit('update:close')
            }
        }
    },
    methods: {
        ...mapActions(['saveEnv', 'saveUplaod']),
        addNewItem(prop) {
            this.$emit('add:item', prop);
        },

        deleteItem(row, prop) {
            this.$emit('delete:item', row, prop);
        },

        handelUploadType(type) {
            this.$emit('update:uploadType', type);
        },

        closeEnvDialog() {
            this.$emit('update:close')
            this.$refs['envForm'].resetFields();
        },

        saveEnvConfig() {
            this.$refs['envForm'].validate(valid => {
                if (valid) {
                    const {
                        instanceNumber,
                        memorySize,
                        envVariables,
                        ipAlias,
                        projectId,
                        auditor,
                        desc,
                        uploadType
                    } = this.envConfigForm;
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
                        };
                        this.saveUplaod(params).then(() => {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.closeEnvDialog();
                        });
                    } else {
                        const params = {
                            isAdmin: this.isAdmin,
                            projectId,
                            instance: instanceNumber,
                            memory: memorySize,
                            env: JSON.stringify(envVariables),
                            ipAlias: JSON.stringify(ipAlias),
                            searchParams: this.searchCriteria
                        };
                        this.saveEnv(params).then(() => {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.closeEnvDialog();
                        });
                    }
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    @import '~@/styles/common.scss';

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
