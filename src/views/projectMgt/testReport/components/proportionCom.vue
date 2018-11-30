<template>
    <div style="display: flex;">
        <div>
            <div>
                <span></span>
                <span>{{$t('testPage.summarySuccess_label')}}</span>
            </div>
            <div>
                <span></span>
                <span>{{$t('testPage.summaryFail_label')}}</span>
            </div>
        </div>
        <div>
            <div class="success-tag-style"></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'proportionCom',
    props: {
        data: {
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
            this.dataValue = this.data
        }
    }
}
</script>

<style lang="scss" scoped>
    /*成功tag样式*/
    .success-tag-style {

    }
    /*失败tag样式*/
    .fail-tag-style {

    }
    /*成功line样式*/
    .fail-line-style {

    }
    /*失败line样式*/
    .fail-line-style {

    }
</style>
