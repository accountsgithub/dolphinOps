<template>
    <div class="status-com-style">
        <div class="status-info-div-style">
            <div>
                <span>60%</span><br/>
                <span>{{$t('testPage.probabilitySuccess_label')}}</span>
            </div>
            <div>
                <span>40%</span><br/>
                <span style="float: right">{{$t('testPage.probabilityFail_label')}}</span>
            </div>
        </div>
        <div class="status-line-div-style">
            <div class="success-tag-style-white">
                <div class="success-tag-style">
                    <i class="icon iconfont icon-ic-project"></i>
                </div>
            </div>
            <div class="line-div-style">
                <div class="success-line-style">
                    <div></div>
                </div>
                <div class="fail-line-style">
                    <div></div>
                </div>
            </div>
            <div class="fail-tag-style-white">
                <div class="fail-tag-style">
                    <i class="icon iconfont icon-ic-project"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'proportionCom',
    props: {
        statusData: {
            value: [],
            type: Array
        }
    },
    data() {
        return {
            dataValue: []
        }
    },
    mounted() {
        this.handleDataMethod()
    },
    methods: {
        handleDataMethod() {
            this.dataValue = this.statusData
        }
    }
}
</script>

<style lang="scss" scoped>
    /*最为层div样式*/
    .status-com-style {
        display: flex;
        flex-direction: column;
    }
    /*状态说明div样式*/
    .status-info-div-style {
        display: flex;
        margin-top: 60px;
        margin-left: 13.9%;
        flex-wrap: nowrap;
        justify-content: space-between;
        font-weight: 500;
    }
    .status-info-div-style div:nth-child(1) span:nth-child(1){
        font-family: PingFangSC-Semibold;
        font-size: 42px;
        color: #4594E4;
    }
    .status-info-div-style div span{
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #7B7F86;
    }
    .status-info-div-style div:nth-child(2) span:nth-child(1){
        font-family: PingFangSC-Semibold;
        font-size: 42px;
        color: #E87575;
    }
    .status-info-div-style div:nth-child(2) {
        margin-right: 15.9%;
    }
    /*状态条外层div样式*/
    .status-line-div-style {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    /*成功率外层tag样式*/
    .success-tag-style-white {
        background-color: #F9FBFD;
        border-radius: 100%;
        height: 86px;
        width: 86px;
        padding: 5px;
        margin-left: 7.9%;
        margin-right: -5px;
        line-height: 80px;
        z-index: 9;
    }
    /*成功率tag样式*/
    .success-tag-style {
        background-color: #4594E4;
        border-radius: 100%;
        height: 76px;
        width: 76px;
        /*margin-left: 7.9%;*/
        line-height: 76px;
    }
    /*成功率icon样式*/
    .success-tag-style i{
        margin-left: 14px;
        color: #ffffff;
        font-size: 40px;
    }

    /*失败率外层tag样式*/
    .fail-tag-style-white {
        background-color: #F9FBFD;
        border-radius: 100%;
        height: 86px;
        width: 86px;
        padding: 5px;
        margin-right: 7.9%;
        margin-left: -5px;
        line-height: 80px;
        z-index: 9;
    }
    /*失败率tag样式*/
    .fail-tag-style {
        background-color: #E87575;
        border-radius: 100%;
        height: 76px;
        width: 76px;
        line-height: 76px;
        margin-right: 7.9%;
    }
    .fail-tag-style i{
        margin-left: 14px;
        color: #ffffff;
        font-size: 40px;
    }
    /*状态条外层div样式*/
    .line-div-style {
        width: 75%;
        display: flex;
        height: 86px;
        line-height: 76px;
        padding-top: 27px;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    /*成功line样式*/
    .success-line-style {
        background-color: #4594E4;
        height: 32px;
        width: 90%;
    }
    .success-line-style div {
        width: 0;
        height: 0;
        border-bottom: 32px solid #ffffff;
        border-left: 15px solid transparent;
        float: right;
    }
    /*失败line样式*/
    .fail-line-style {
        background-color: #E87575;
        height: 32px;
        width: 10%;
    }
    .fail-line-style div {
        width: 0;
        height: 0;
        border-top: 32px solid #ffffff;
        border-right: 15px solid transparent;
        float: left;
    }
</style>
