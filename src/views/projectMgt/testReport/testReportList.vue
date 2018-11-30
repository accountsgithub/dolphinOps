<template>
    <el-row>
        <div v-loading="isLoading" style="background-color: #ffffff">
            <div class="page-title-style">
                <span>Requests Summary</span>
                <div>
                    <el-button type="primary" class="tableLastButtonStyleW">{{$t('testPage.showHistoryRecord_button')}}</el-button>
                    <el-button type="primary" class="tableLastButtonStyleW icon iconfont icon-ic-loaddown"></el-button>
                    <el-button type="primary" class="tableLastButtonStyleW icon iconfont icon-ic-refresh"></el-button>
                </div>
            </div>
            <div class="status-div-style">
                <spam>123</spam>
            </div>
            <div>
                <el-table :data="testReportList">
                    <el-table-column prop="name" :label="$t('testPage.apiName_label')"></el-table-column>
                    <el-table-column prop="responseCode" :label="$t('testPage.testResult_label')">
                        <template class="test-fail-style" slot-scope="scope">
                            {{testResultMethod(scope.row)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="url" :label="$t('testPage.requestPath_label')"></el-table-column>
                    <el-table-column prop="httpMethod" :label="$t('testPage.requestType_label')"></el-table-column>
                    <el-table-column prop="requestBody" :label="$t('testPage.requestValue_label')"></el-table-column>
                    <el-table-column prop="responseStatus" :label="$t('testPage.responseStatus_label')"></el-table-column>
                    <el-table-column prop="responseBody" :label="$t('testPage.responseValue_label')"></el-table-column>
                    <el-table-column prop="message" :label="$t('testPage.exceptionInfo_label')"></el-table-column>
                    <el-table-column :label="$t('testPage.operation')">
                        <template solt-scope="scope">
                            <a class="tableActionStyle" @click="downloadApiDetailMethod(scope.row)">{{$t('test.downloadApiDetail_button')}}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </el-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'testReportList',
    data() {
        return {
            isLoading: false,
            testReportList: []
        }
    },
    mounted() {
        this.getTestReportListMethod()
    },
    methods: {
        ...mapActions([
            'getTestReportListApi'
        ]),
        // 转换测试结果
        testResultMethod(row) {
            if (row.responseCode == '0') {
                return this.$t('testPage.success_message')
            } else {
                return this.$t('testPage.fail_message')
            }
        },
        // 查询测试报告数据列表
        getTestReportListMethod() {
            this.isLoading = true
            let params = Object.assign({f_eq_mark: this.$route.params.mark})
            this.getTestReportListApi(params).then(res => {
                this.isLoading = false
                if (res && res.result) {
                    this.testReportList = res.result.data
                } else {
                    this.testReportList = []
                }
            })
        },
        // 下载接口明细
        downloadApiDetailMethod(row) {
            console.log(row)
        }
    }
}
</script>

<style type="less" scoped>
    /*页面介绍及基本按键div样式*/
    .page-title-style{
        height: 60px;
        background-color: #ffffff;
        border-bottom: 1px solid #EDEFF4;
        display: flex;
        line-height: 60px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .page-title-style span{
        margin-left: 22px;
        ont-family: PingFangSC-Medium;
        font-size: 14px;
        color: #686F79;
        letter-spacing: 0;
    }.page-title-style div{
         margin-right: 22px;
     }
    /*状态条div样式*/
    .status-div-style {
        height: 257px;
        width: auto;
        background-color: #F9FBFD;;
        margin: 35px 22px;
    }
    /*测试结果字体颜色样式*/
    .test-fail-style {
        color: #FC5555;
    }
</style>
