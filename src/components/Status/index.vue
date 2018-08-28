<template>
    <div>
        <span v-if="statusType == '待审批'" class="el_state_dot">{{statusType}}</span>
        <span v-if="statusType == '已审批'||statusType == '同意'" class="el_state_dot status-agree">{{statusType}}</span>
        <span v-if="statusType == '驳回'" class="el_state_dot status-back">{{statusType}}</span>
        <span v-if="statusType == '取消'" class="el_state_dot status-cancel">{{statusType}}</span>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: ['statusType']
}
</script>
