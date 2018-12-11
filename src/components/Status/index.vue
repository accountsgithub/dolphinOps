<template>
    <div>
        <span v-if="statusType == '已停止' || statusType == 'stop'" class="el_state_dot">{{statusType}}</span>
        <span v-else-if="statusType == '运行中' || statusType == 'running'" class="el_state_dot status-agree">{{statusType}}</span>
        <span v-else-if="statusType == '故障' || statusType == 'fault'" class="el_state_dot status-back">{{statusType}}</span>
        <span v-else-if="statusType == '初始' || statusType == 'init'" class="el_state_dot status-default">{{statusType}}</span>
        <span v-else-if="statusType == '待部署' || statusType == 'pending'" class="el_state_dot status-default">{{statusType}}</span>
        <span v-else-if="statusType == '启动中' || statusType == 'starting'" class="el_state_dot status-begin">{{statusType}}</span>
        <span v-else-if="statusType == '系统崩溃' || statusType == 'crash'" class="el_state_dot status-back">{{statusType}}</span>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: ['statusType']
}
</script>
