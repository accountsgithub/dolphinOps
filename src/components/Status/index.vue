<template>
    <div>
        <span v-if="statusType == '已停止'" class="el_state_dot">{{statusType}}</span>
        <span v-if="statusType == '运行中'" class="el_state_dot status-agree">{{statusType}}</span>
        <span v-if="statusType == '故障'" class="el_state_dot status-back">{{statusType}}</span>
        <span v-if="statusType == '初始'" class="el_state_dot status-default">{{statusType}}</span>
        <span v-if="statusType == '启动中'" class="el_state_dot status-runing">{{statusType}}</span>
        <span v-if="statusType == '系统崩溃'" class="el_state_dot status-error">{{statusType}}</span>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: ['statusType']
}
</script>
