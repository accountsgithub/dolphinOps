<template>
    <div class="searchPanel">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'SearchPanel',
}
</script>

<style scoped lang="scss">
    @import '~@/styles/common';
    .searchPanel {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: $white-bg;
        font-size: $search-font-size;
        margin-bottom: 15px;
        padding: 20px;
        .formPanel {
            width: 100% !important;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            /deep/ .el-form-item {
                margin-bottom: 0 !important;
            }
        }
    }
</style>
