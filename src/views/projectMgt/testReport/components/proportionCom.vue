<template>
    <div class="status-com-style">
        <div class="status-info-div-style">
            <div>
                <span>{{this.successValue.value}}%</span><br/>
                <span>{{this.successValue.name}}</span>
            </div>
            <div>
                <span>{{this.failValue.value}}%</span><br/>
                <span style="float: right">{{this.failValue.name}}</span>
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
            type: Array
        }
    },
    data() {
        return {
            successValue: {
                name: this.$t('testPage.probabilitySuccess_label'),
                value: 0
            },
            failValue: {
                name: this.$t('testPage.probabilityFail_label'),
                value: 0
            }
        }
    },
    watch: {
        statusData() {
            let sValueTemp = (this.statusData[0].value/(this.statusData[0].value + this.statusData[1].value)*100).toFixed(1)
            let fValueTemp = (this.statusData[1].value/(this.statusData[0].value + this.statusData[1].value)*100).toFixed(1)
            this.successValue.value = sValueTemp
            this.failValue.value = fValueTemp
            this.drawStatusLineMethod()
        }
    },
    methods: {
        drawStatusLineMethod() {
            let divWidth = document.getElementsByClassName('line-div-style')[0].clientWidth
            document.getElementsByClassName('success-line-style')[0].style.width = `${divWidth*this.successValue.value/100}px`
            document.getElementsByClassName('fail-line-style')[0].style.width = `${divWidth*this.failValue.value/100}px`
        }
    }
}
</script>

<style lang="scss" scoped>
/*最为层div样式*/
.status-com-style {
    display: flex;
    flex-direction: column;
    width: 1180px;
}
/*状态说明div样式*/
.status-info-div-style {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 60px 240px 0 240px;
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
/*状态条外层div样式*/
.status-line-div-style {
    margin: 0 150px;
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
}
.fail-tag-style i{
    margin-left: 14px;
    color: #ffffff;
    font-size: 40px;
}
/*状态条外层div样式*/
.line-div-style {
    flex: 1;
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
