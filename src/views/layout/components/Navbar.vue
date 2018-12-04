<template>
    <div class="navbar"
         mode="horizontal">
        <div class="breadcrumb">
            <hamburger :toggle-click="toggleSideBar"
                       :is-active="sidebar.opened"
                       class="hamburger-container" />
            <breadcrumb />
        </div>
        <div style="display: flex;">
            <div class="langSelectStyle">
                <lang-select :lang="lang"
                             class="international right-menu-item"></lang-select>
            </div>
            <el-dropdown @command="handleCommand"
                         class="avatar-container"
                         trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar"
                         class="avatar" />
                    <div class="userName"><span>{{userName}}</span></div>
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown"
                                  class="user-dropdown">
                    <el-dropdown-item command="logout">
                        <span>{{$t('common.logout')}}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="modifyPassword">
                        <span>{{$t('common.modifyPassword')}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog class="dialogStyle"
                   :title="$t('common.modifyPassword')"
                   @close="closeDialog"
                   :visible.sync="dialogVisible"
                   width="40%">
            <el-form :model="pwEditForm"
                     :rules="PWEditFormRules"
                     ref="pwEditForm"
                     label-width="100px"
                     class="demo-ruleForm">
                <el-form-item :label="$t('modifyPW.modifyPW_oldPassword')"
                              prop="oldPassword">
                    <el-input type="password"
                              v-model="pwEditForm.oldPassword"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('modifyPW.modifyPW_password')"
                              prop="password">
                    <el-input type="password"
                              v-model="pwEditForm.password"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('modifyPW.modifyPW_newPassword')"
                              prop="newPassword">
                    <el-input type="password"
                              v-model="pwEditForm.newPassword"
                              autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary"
                           @click="submitForm('pwEditForm')"
                           class="dialogButtonB">{{$t('common.sure_button')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LangSelect from '@/components/langSelect'
import local from '@/lang'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import avatar from '@/assets/images/pic-head.png'
const viewName = 'i18nView'

export default {
    components: {
        LangSelect,
        Breadcrumb,
        Hamburger
    },
    created() {
        if (!this.$i18n.getLocaleMessage('en')[viewName]) {
            this.$i18n.mergeLocaleMessage('zh', local.zh)
            this.$i18n.mergeLocaleMessage('en', local.en)
        }
    },
    computed: {
        ...mapGetters(['sidebar']),

        userName: function() {
            return ''
        },
        lang: {
            get() {
                return this.$store.state.app.language
            },
            set(lang) {
                this.$i18n.locale = lang
                this.$store.dispatch('setLanguage', lang)
            }
        }
    },

    data() {
        const validatepw = (rule, value, callback) => {
            if (value != this.pwEditForm.password && value != '') {
                callback(new Error(this.$t('modifyPW.vilidata_differPW')))
            } else if (value === '') {
                callback(new Error(this.$t('modifyPW.vilidata_newPassword')))
            } else {
                callback()
            }
        }
        return {
            avatar,
            dialogVisible: false,
            pwEditForm: {
                newPassword: '',
                oldPassword: '',
                password: ''
            },
            PWEditFormRules: {
                password: [
                    { required: true, message: this.$t('modifyPW.modifyPW_password'), trigger: 'blur' }
                ],
                oldPassword: [
                    { required: true, message: this.$t('modifyPW.vilidata_oldPassword'), trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, validator: validatepw, trigger: 'blur' }
                ]
            },
        }
    },

    methods: {
        ...mapActions([
            'ToggleSideBar', 'logout', 'modifyPW'
        ]),
        toggleSideBar() {
            this.ToggleSideBar()
        },
        handleCommand(command) {
            if (command === 'logout') {
                this.logout().then(() => {
                    this.$router.push('/login')
                })
            } else if (command === 'modifyPassword') {
                this.dialogVisible = true
            }
            // this.LogOut().then(() => {
            //   location.reload() // 为了重新实例化vue-router对象
            // })
        },
        closeDialog() {
            this.$refs['pwEditForm'].resetFields()
            this.dialogVisible = false
        },
        submitForm(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = Object.assign(this.pwEditForm)
                    this.modifyPW(params).then(res => {
                        if (res.data.code == '0') {
                            this.$message({
                                type: 'success',
                                message: this.$t('modifyPW.modifySuccessMes')
                            })
                            this.dialogVisible = false
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.message || 'Error!'
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.langSelectStyle {
  top: 8px;
  position: relative;
  display: inline-table;
  width: 83px;
  /*right: 35px;*/
  /deep/.el-input {
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 30px !important;
    width: 83px;
    font-size: 12px;
  }
  /deep/.el-input__inner {
    background: #ffffff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 30px !important;
    width: 83px;
    font-size: 12px;
  }
  /deep/.el-input--suffix .el-input__inner {
    height: 30px !important;
  }
}

.international {
  vertical-align: top;
}
.right-menu-item {
  display: inline-block;
  margin: 0;
}

.navbar {
  position: absolute;
  top: 0;
  width: calc(100% + 10px);
  left: -10px;
  padding: 5px 30px 5px 0px;
  border-radius: 0 !important;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  .avatar-container {
    .avatar-wrapper {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      height: 32px;
      width: 32px;
    }
    .userName {
      margin: 0 10px;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
}
</style>

