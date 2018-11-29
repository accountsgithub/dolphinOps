<template>
    <el-row>
        <div v-loading="isLoading">
            <div>

            </div>
            <div>

            </div>
            <div>
                <el-table :data="testReportList">
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
                    <el-table-column></el-table-column>
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
        getTestReportListMethod() {
            this.isLoading = true
            let params = Object.assign({f_eq_mark: this.$route.params.mark})
            this.getTestReportListApi(params).then(res => {
                this.isLoading = false
                this.testReportList = res.data.result.data
            })
        }
    }
}
</script>

<style scoped>

</style>
