<template>
    <el-dialog title="添加邮箱" :visible.sync="dialogVisible" width="600px">
        <el-form :model="whiteIpFrom" label-width="100px">
            <el-form-item label="邮箱地址:">
                <el-input v-model="whiteIpFrom.whiteList" auto-complete="off" placeholder="请添加告警邮箱,多个地址请用逗号 (',') 分隔"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelWhiteIp">取 消</el-button>
            <el-button type="primary" @click="saveWhiteIp">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'EmailList',
    props: {
        EmailDialog: {
            type: Boolean
        },
        EmailForm: {
            type: Object
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.EmailDialog
            },
            set() {
                this.$emit('update:close')
            }
        }
    },
    methods: {
        ...mapActions(['setEamil']),
        cancelWhiteIp() {
            this.$emit('update:close')
        },
        saveWhiteIp() {
            const params = {
                projectId: this.EmailForm.projectId,
                whiteList: this.EmailForm.emails
            }
            this.setWhiteIp(params)
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    })
                    this.$emit('update:close')
                    location.reload()
                    // location.href = location.href
                })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
