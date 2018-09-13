<template>
    <el-dialog title="导入部署包"
               :visible.sync="dialogVisible"
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
            <div class="el-upload__tip" slot="tip">只能上传rar/zip文件，且不超过200M</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click="beforeClose" class="dialogButtonW">取消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'ImportPackage',
    props: {
        dialogExpoVisible: {
            type: Boolean
        }
    },
    data() {
        return {
            url: `${this.g_Config.BASE_URL}/project/import.do`,
            fileList: []
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.dialogExpoVisible
            },
            set() {
                this.$emit('update:close')
            }
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            let isZip = file.type.indexOf('zip') !== -1 || file.type.indexOf('rar') !== -1
            const isLtM = file.size / 1024 / 1024 < 200
            if (file.type == '' && file.name) {
                let arrayTemp = file.name.split('.')
                let fileType = arrayTemp[1]
                isZip = fileType === 'rar'
            }
            if (!isZip) {
                this.$message.error('上传文件类型只能是 rar/zip 格式!')
            }
            if (!isLtM) {
                this.$message.error('上传文件大小不能超过 200MB!')
            }
            return isZip && isLtM;
        },
        beforeClose(done) {
            this.$emit('update:close')
            this.fileList = []
            done()
        },
        clearItem() {
            this.fileList = []
        },
        handleSuccess(file) {
            if (file.status == '200') {
                this.$message({
                    message: '导入成功！',
                    type: 'success'
                })
                this.fileList = []
                this.$emit('update:close')
                this.$emit('env:dialog:open', file)
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
    }
    
}
</script>
<style lang="scss" scoped>
    @import '~@/styles/common.scss';
    /deep/ .el-upload-dragger{
        width: 560px;
    }
</style>

