<template>
    <el-dialog title="导入部署包"
               :visible.sync="dialogVisible"
               :before-close="beforeClose"
               @close="clearItem"
               width="600px">
        <el-upload
            class="upload-demo"
            drag
            :show-file-list="true"
            :before-upload="beforeAvatarUpload"
            :on-success="handleSuccess"
            :on-exceed="onexceed"
            :on-progress="onprogress"
            :before-remove="onremove"
            :limit="1"
            with-credentials
            :file-list="fileList"
            name="pack"
            :action="url">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" v-if="upLoadStatus === '0'">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__text" v-else-if="upLoadStatus === '1'">文件上传中，请勿重复上传</div>
            <div class="el-upload__text" v-else-if="upLoadStatus === '2'"> <span style="color:red;">文件上传失败，请删除后重新上传</span></div>
            <div class="el-upload__tip" slot="tip">只能上传rar/zip文件，且不超过200M</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleOk" v-if="fileList.length > 0" class="dialogButtonW">确认</el-button>
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
            fileList: [],
            upLoadStatus: '0'
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
            if (!isZip || !isLtM) {
                this.upLoadStatus = '0'
            }
            return isZip && isLtM && this.upLoadStatus !== '1';
        },
        beforeClose(done) {
            this.upLoadStatus = '0';
            this.$emit('update:close');
            this.fileList = [];
            done();
        },
        handleOk() {
            if (this.fileList.length === 0) {
                this.$message.error('请上传文件!');
                return;
            }
            this.$emit('update:close');
            this.$emit('env:dialog:open', this.fileList[0]);
            this.fileList = []
        },
        clearItem() {
            this.fileList = [];
            this.upLoadStatus = '0';
        },
        handleSuccess(file) {
            if (file.status == '200') {
                this.$message({
                    message: '导入成功！',
                    type: 'success'
                })
                this.upLoadStatus = '0'
                this.fileList.push(file)
            } else {
                this.upLoadStatus = '2'
                this.$nextTick(() => {
                    document.getElementsByClassName('el-icon-upload-success')[0].className=''
                })
            }
        },
        onexceed() {
            this.$message({
                message: '只允许上传一个文件！',
                type: 'warning'
            })
            this.upLoadStatus = '0'
        },
        onprogress() {
            this.upLoadStatus = '1'
        },
        onremove() {
            this.fileList = []
        }
    }
    
}
</script>
<style lang="scss" scoped>
    @import '~@/styles/common.scss';
    /deep/ .el-upload-dragger{
        width: 560px;
    }
</style>

