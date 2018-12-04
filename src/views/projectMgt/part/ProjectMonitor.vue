
<template>
    <el-dialog :title="$t('projectMgt.monitorcharts')" width="85%" :visible.sync="dialogVisible" >
        <!-- 删选条件 -->
        <div style="display:flex;">
            <div style="flex = 1;padding: 0 20px 20px 0;">
                <span>刷新时间</span>
                <el-select v-model="refrash" placeholder="请选择">
                    <el-option
                        v-for="item in refrashOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @change="changeFreash"></el-option>
                </el-select>
            </div>
            <div style="flex = 1;">
                <span class="demonstration">日期选择</span>
                <el-date-picker
                    v-model="selectTime"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    @change="getTime"
                    @blur="getTime">
                </el-date-picker>
            </div>
        </div>
        <div class="tomcat" v-show="layerType === 'tomcat'">
            <div class="chart" id="line1"></div>
            <div class="chart" id="line2"></div>
            <div class="chart" id="line3"></div>
            <div class="chart" id="line4"></div>
        </div>
        <div class="tomcat" v-show="layerType === 'others'">
            <div class="chart" id="line5"></div>
            <div class="chart" id="line6"></div>
            <div class="chart" id="line7"></div>
            <div class="chart" id="line8"></div>
        </div>
    </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
import {updateChart, setChartData} from '@/utils/initCharts.js'
import echarts from 'echarts'
export default {
    data() {
        return {
            refrashOptions: [{
                value: '0',
                label: 'off',
            },{
                value: '1',
                label: '5s',
            },{
                value: '2',
                label: '10s',
            }],
            pickerOptions2: {
                shortcuts: [{
                    text: '最近15分钟',
                    onClick(picker) {
                        console.log(picker)
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 900 * 1000);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近30分钟',
                    onClick(picker) {
                        console.log(picker)
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 1800 * 1000);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近1小时',
                    onClick(picker) {
                        console.log(picker)
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '今日',
                    onClick(picker) {
                        console.log(picker)
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24);
                        // picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        console.log(picker)
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        // picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        console.log(picker)
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            refrash: '0', // 刷新频率选择
            selectTime: [],
            chat1: null,
            chat2: null,
            chat3: null,
            chat4: null,
            // json数据模拟tomcat
            optionCpu: {
                title: 'CPU使用率',
                legend: ['cup使用率'],
                // xAxis: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子'],
                xAxis: [],
                yAxis: [
                    {
                        name: 'cup使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: 'cup使用率',
                    color: '#00BFFF',
                    // data: [5, 20, 36, 10, 10, 20],
                    data: [],
                    yAxisIndex: 0
                }]
            },
            optionIO: {
                title: '容器流入流量每秒访问次数',
                legend: ['容器流入流量', '容器流出流量', '每秒访问次数'],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                yAxis: [
                    {
                        name: '容器进出流量 B/s',
                        formatter: '{value}'
                    },
                    {
                        name: '每秒访问次数 /次',
                        formatter: '{value}'
                    }
                ],
                series: [{
                    title: '容器流入流量',
                    color: '#00BFFF',
                    yAxisIndex: 0,
                    data: [1741.9, 977, 1742.2, 1431.1, 1636.2, 1447, 1711.7, 1921.2, 2609.6, 3332.6, 3647.3, 2498.1]
                },{
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                },{
                    title: '每秒访问次数',
                    color: '#FFD700',
                    yAxisIndex: 1,
                    data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                }]
            },
            optionPan: {
                title: '容器磁盘I/O及磁盘使用率',
                legend: ['容器流入流量', '容器流出流量', '每秒访问次数'],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                yAxis: [
                    {
                        name: '容器进出流量 B/s',
                        formatter: '{value}'
                    },
                    {
                        name: '每秒访问次数 /次',
                        formatter: '{value}'
                    }
                ],
                series: [{
                    title: '容器流入流量',
                    color: '#00BFFF',
                    yAxisIndex: 0,
                    data: [1741.9, 977, 1742.2, 1431.1, 1636.2, 1447, 1711.7, 1921.2, 2609.6, 3332.6, 3647.3, 2498.1]
                },{
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                },{
                    title: '每秒访问次数',
                    color: '#FFD700',
                    yAxisIndex: 1,
                    data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                }]
            },
            optionJVM: {
                title: 'JVM内存使用率',
                legend: ['JVM使用率'],
                xAxis: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子'],
                yAxis: [
                    {
                        name: 'JVM使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: 'JVM使用率',
                    color: '#00BFFF',
                    data: [5, 20, 36, 10, 10, 20],
                    yAxisIndex: 0
                }]
            },
            // 非tomcat
            noTomcatCpu: {
                title: 'CPU使用率',
                legend: ['cup使用率'],
                // xAxis: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子'],
                xAxis: [],
                yAxis: [
                    {
                        name: 'cup使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: 'cup使用率',
                    color: '#00BFFF',
                    // data: [5, 20, 36, 10, 10, 20],
                    data: [],
                    yAxisIndex: 0
                }]
            },
            noTomcatTrans: {
                title: '容器流入流量每秒访问次数',
                legend: ['容器流入流量', '容器流出流量', '每秒访问次数'],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                yAxis: [
                    {
                        name: '容器进出流量 B/s',
                        formatter: '{value}'
                    },
                    {
                        name: '每秒访问次数 /次',
                        formatter: '{value}'
                    }
                ],
                series: [{
                    title: '容器流入流量',
                    color: '#00BFFF',
                    yAxisIndex: 0,
                    data: [1741.9, 977, 1742.2, 1431.1, 1636.2, 1447, 1711.7, 1921.2, 2609.6, 3332.6, 3647.3, 2498.1]
                },{
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                },{
                    title: '每秒访问次数',
                    color: '#FFD700',
                    yAxisIndex: 1,
                    data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                }]
            },
            nofs_status: {
                title: '容器磁盘I/O及磁盘使用率',
                legend: ['容器流入流量', '容器流出流量', '每秒访问次数'],
                xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                yAxis: [
                    {
                        name: '容器进出流量 B/s',
                        formatter: '{value}'
                    },
                    {
                        name: '每秒访问次数 /次',
                        formatter: '{value}'
                    }
                ],
                series: [{
                    title: '容器流入流量',
                    color: '#00BFFF',
                    yAxisIndex: 0,
                    data: [1741.9, 977, 1742.2, 1431.1, 1636.2, 1447, 1711.7, 1921.2, 2609.6, 3332.6, 3647.3, 2498.1]
                },{
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                },{
                    title: '每秒访问次数',
                    color: '#FFD700',
                    yAxisIndex: 1,
                    data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                }]
            },
            noTomcatJvm: {
                title: '内存使用率',
                legend: ['内存使用率'],
                xAxis: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子'],
                yAxis: [
                    {
                        name: '内存使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: '内存使用率',
                    color: '#00BFFF',
                    data: [5, 20, 36, 10, 10, 20],
                    yAxisIndex: 0
                }]
            },
            // 是否开启刷新flag
            setFlag: true
        }
    },
    props: ['chartsDialog', 'project', 'layerType'],
    computed: {
        dialogVisible: {
            get() {
                return this.chartsDialog
            },
            set() {
                this.$emit('update:close')
            }
        },
        projectdetail: {
            get() {
                return this.project
            },
            set() {
            }
        }
    },
    watch: {
        'selectTime': function() {
            this.getTime()
        },
        'chartsDialog': function() {
            if (this.chartsDialog == true) {
                this.selectTime = [new Date()- 60 * 15 * 1000, new Date()]
            }
        },
        'layerType': function() {
            console.log('layerType', this.layerType)
        }
    },
    created() {
        // console.log('created 111', document.getElementById('line1'))
    },
    before() {
        // console.log('before 111', document.getElementById('line1'))
    },
    beforeMount() {
        // console.log('beforeMount 111', document.getElementById('line1'))
    },
    mounted() {
        // console.log('mounted 111', document.getElementById('line1'))
    },
    beforeUpdate() {
        // console.log('beforeUpdate 111', document.getElementById('line1'))
    },
    updated() {
        console.log('updated 111', document.getElementById('line1'))
        console.log('updated width', (document.body.clientWidth - 200) / 2)
        this.width = `${(document.body.clientWidth - 300) / 2}px`
        // 根据屏幕初始化容器大小
        document.getElementById('line1').style.width = this.width
        document.getElementById('line2').style.width = this.width
        document.getElementById('line3').style.width = this.width
        document.getElementById('line4').style.width = this.width
        document.getElementById('line5').style.width = this.width
        document.getElementById('line6').style.width = this.width
        document.getElementById('line7').style.width = this.width
        document.getElementById('line8').style.width = this.width
        if (this.layerType === 'tomcat') {
            console.log('layerType', this.layerType)
            // 初始化表1
            this.line1 = echarts.init(document.getElementById('line1'))
            // 初始化表2
            this.line2 = echarts.init(document.getElementById('line2'))
            // 初始化表3
            this.line3 = echarts.init(document.getElementById('line3'))
            // 初始化表4
            this.line4 = echarts.init(document.getElementById('line4'))
        } else if (this.layerType === 'others') {
            console.log('layerType', document.getElementById('line5'))
            // 初始化表5
            this.line5 = echarts.init(document.getElementById('line5'))
            // 初始化表6
            this.line6 = echarts.init(document.getElementById('line6'))
            // 初始化表7
            this.line7 = echarts.init(document.getElementById('line7'))
            // 初始化表8
            this.line8 = echarts.init(document.getElementById('line8'))
        }
    },
    methods: {
        ...mapActions([
            'monitorApi'
        ]),
        updateChart,
        setChartData,
        // tomcat项目
        getChartData(params, env, project) {
            let url1 = `/tomcat/${env}/${project}/cpu_usage`
            let url2 = `/tomcat/${env}/${project}/transmission`
            let url3 = `/common/${env}/${project}/fs_status`
            let url4 = `/tomcat/${env}/${project}/jvm_memory`
            console.log(url1,url2,url3,url4)
            let setParams = {
                url: url1,
                params: params
            }
            // tomcat项目--CPU使用率
            this.monitorApi(setParams).then(cpuChartData => {
                this.optionCpu.xAxis = cpuChartData.xAxis
                this.optionCpu.legend = cpuChartData.legend
                this.optionCpu.series = setChartData(cpuChartData.series)
                updateChart(this.line1, this.optionCpu)
            })
            //tomcat项目--进出流量
            setParams.url = url2
            this.monitorApi(setParams).then(transmission => {
                this.optionIO.xAxis = transmission.xAxis
                this.optionIO.legend = transmission.legend
                this.optionIO.series = setChartData(transmission.series)
                updateChart(this.line2, this.optionIO)
            })
            // // 磁盘IO(读写)/使用率
            setParams.url = url3
            this.monitorApi(setParams).then(fs_status => {
                this.optionPan.xAxis = fs_status.xAxis
                this.optionPan.legend = fs_status.legend
                this.optionPan.series = setChartData(fs_status.series)
                updateChart(this.line3, this.optionPan)
            })
            // // tomcat项目--JVM堆内存
            setParams.url = url4
            this.monitorApi(setParams).then(jvm_memory => {
                this.optionJVM.xAxis = jvm_memory.xAxis
                this.optionJVM.legend = jvm_memory.legend
                this.optionJVM.series = setChartData(jvm_memory.series)
                updateChart(this.line4, this.optionJVM)
            })
        },
        // 非tomcat项目
        getNoTomcatData(params, env, project) {
            let url5 = `/nonTomcat/${env}/${project}/cpu_usage`
            let url6 = `/nonTomcat/${env}/${project}/transmission`
            let url7 = `/common/${env}/${project}/fs_status`
            let url8 = `/nonTomcat/${env}/${project}/memory`
            // console.log(url5, url6, url7, url8)
            let setParams = {
                url: url5,
                params: params
            }
            // 非tomcat项目--CPU使用率
            this.monitorApi(setParams).then(noTomcatCpu => {
                console.log(noTomcatCpu)
                this.noTomcatCpu.xAxis = noTomcatCpu.xAxis
                this.noTomcatCpu.legend = noTomcatCpu.legend
                this.noTomcatCpu.series = setChartData(noTomcatCpu.series)
                updateChart(this.line5, this.noTomcatCpu)
            })
            setParams.url = url6
            // 非tomcat项目--进出流量
            this.monitorApi(setParams).then(noTomcatTrans => {
                console.log(noTomcatTrans)
                this.noTomcatTrans.xAxis = noTomcatTrans.xAxis
                this.noTomcatTrans.legend = noTomcatTrans.legend
                this.noTomcatTrans.series = setChartData(noTomcatTrans.series)
                updateChart(this.line6, this.noTomcatTrans)
            })
            setParams.url = url7
            //  磁盘IO(读写)/使用率
            this.monitorApi(setParams).then(nofs_status => {
                console.log(nofs_status)
                this.nofs_status.xAxis = nofs_status.xAxis
                this.nofs_status.legend = nofs_status.legend
                this.nofs_status.series = setChartData(nofs_status.series)
                updateChart(this.line7, this.nofs_status)
            })
            setParams.url = url8
            // 非 tomcat项目--JVM堆内存
            this.monitorApi(setParams).then(noTomcatJvm => {
                console.log(noTomcatJvm)
                this.noTomcatJvm.xAxis = noTomcatJvm.xAxis
                this.noTomcatJvm.legend = noTomcatJvm.legend
                this.noTomcatJvm.series = setChartData(noTomcatJvm.series)
                updateChart(this.line8, this.noTomcatJvm)
            })
        },
        getTime() {
            if (!this.selectTime.length) {
                return
            }
            var start = new Date(this.selectTime[0]);
            var end = new Date(this.selectTime[1]);
            this.startTime = Math.ceil(start.getTime()/1000)
            this.endTime = Math.ceil(end.getTime()/1000)
            let params = {
                start: this.startTime,
                end: this.endTime,
            }
            let env = this.projectdetail.deployEnv
            let project = this.projectdetail.mark
            if (this.layerType === 'tomcat') {
                this.getChartData(params, env, project)
            } else if (this.layerType === 'others') {
                this.getNoTomcatData(params, env, project)
            } else {
                console.log('no')
            }
        },
        changeFreash(val) {
            console.log('timer', val)
            this.setInter(val, this.getTime())
        },
        // 刷新机制
        setInter(time, fun) {
            fun
            if (!this.setFlag) {
                return
            }
            setInterval({
                fun
            }, time)
        }
    }
}
</script>
<style lang="scss" scoped>
    .chart{
        width: 450px;
        height: 250px;
        float: left;
    }

    .tomcat{
        clear: both;
        overflow: hidden;
    }
</style>
