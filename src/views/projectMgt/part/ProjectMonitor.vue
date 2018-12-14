
<template>
    <el-dialog :title="this.layerType === 'others' ? '其他' : this.layerType " width="70%" :visible.sync="dialogVisible" id="layer">
        <!-- 刷新条件 -->
        <div class="title">
            <div>
                <a :href="projectdetail.monitorUrl">查看更多图表</a>
            </div>
            <div>
                <span>日期选择：</span>
                <span style="margin：0">{{showPickerText}}</span>
                <!-- <span style="margin：0">{{showPicker}}</span> -->
                <el-date-picker
                    v-model="selectTime"
                    v-show="showPicker"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="--"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    @blur="getTime">
                </el-date-picker>
            </div>
            <div>
                <span>刷新时间</span>
                <el-select v-model="refrash" placeholder="请选择" style="height: 32px;line-height: 32px;">
                    <el-option
                        v-for="item in refrashOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
            </div>
        </div>
        <div class="echarts_content">
            <!-- tomcat -->
            <div class="tomcat" v-show="layerType === 'Tomcat'">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line1"></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line2"></div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line3"></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line4"></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- 非tomcat -->
            <div class="tomcat" v-show="layerType === 'others'">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line5"></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line6"></div>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line7"></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="chart" id="line8"></div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { updateChart, setChartData, setYData } from '@/utils/echartsData.js'
import echarts from 'echarts'
export default {
    data() {
        let that = this
        return {
            refrashOptions: [{
                value: '0',
                label: 'off',
            }, {
                value: '5',
                label: '5s',
            }, {
                value: '10',
                label: '10s',
            }, {
                value: '30',
                label: '30s',
            }, {
                value: '60',
                label: '60s',
            }],
            refrash: '5',
            refrashflag: true,
            showPicker: true,
            showPickerText: '最近15分钟',
            pickerOptions: {
                disabledDate(time) {
                    let curDate = (new Date()).getTime();
                    let three = 365 * 24 * 3600 * 1000;
                    let threeMonths = curDate - three;
                    return time.getTime() > Date.now() || time.getTime() < threeMonths;
                },
                shortcuts: [{
                    text: '最近15分钟',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 900 * 1000)
                        picker.$emit('pick', [start, end]);
                        that.showPickerText = '最近15分钟'
                        that.showPicker = 'false'
                    }
                }, {
                    text: '最近30分钟',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 1800 * 1000)
                        picker.$emit('pick', [start, end]);
                        that.showPickerText = '最近30分钟'
                        that.showPicker = 'false'
                    }
                }, {
                    text: '最近1小时',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000)
                        picker.$emit('pick', [start, end]);
                        that.showPickerText = '最近1小时'
                        that.showPicker = 'false'
                    }
                }, {
                    text: '今日',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setDate(start.getDate())
                        start.setHours(0)
                        start.setMinutes(0)
                        start.setSeconds(0)
                        start.setTime(start)
                        picker.$emit('pick', [start, end])
                        that.showPickerText = '今日'
                        that.showPicker = 'false'
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setDate(start.getDate() - 1)
                        start.setHours(0)
                        start.setMinutes(0)
                        start.setSeconds(0)
                        start.setTime(start)
                        end.setDate(end.getDate() - 1)
                        end.setHours(23)
                        end.setMinutes(59)
                        end.setSeconds(59)
                        end.setTime(end)
                        that.showPickerText = '昨日'
                        that.showPicker = 'false'
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        that.showPickerText = '最近一周'
                        that.showPicker = 'false'
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
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
                    // data: [5, 15, 36, 10, 10, 15],
                    data: [],
                    yAxisIndex: 0
                }]
            },
            optionIO: {
                title: '容器进出流量/每秒访问次数',
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
                }, {
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                }, {
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
                }, {
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                }, {
                    title: '每秒访问次数',
                    color: '#FFD700',
                    yAxisIndex: 1,
                    data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                }]
            },
            optionJVM: {
                title: 'JVM内存使用率',
                legend: ['JVM使用率'],
                xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                yAxis: [
                    {
                        name: 'JVM使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: 'JVM使用率',
                    color: '#00BFFF',
                    data: [5, 15, 36, 10, 10, 15],
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
                    // data: [5, 15, 36, 10, 10, 15],
                    data: [],
                    yAxisIndex: 0
                }]
            },
            noTomcatTrans: {
                title: '容器进出流量/每秒访问次数',
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
                }, {
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                }, {
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
                }, {
                    title: '容器流出流量',
                    color: '#DC143C',
                    yAxisIndex: 0,
                    data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                }, {
                    title: '每秒访问次数',
                    color: '#FFD700',
                    yAxisIndex: 1,
                    data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                }]
            },
            noTomcatJvm: {
                title: '内存使用率',
                legend: ['内存使用率'],
                xAxis: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                yAxis: [
                    {
                        name: '内存使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: '内存使用率',
                    color: '#00BFFF',
                    data: [5, 15, 36, 10, 10, 15],
                    yAxisIndex: 0
                }]
            },
            setTimeout: null
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
            // clearInterval(this.setTimeout)
            if (this.selectTime[1] < new Date() - 5000) {
                this.refrash = '0' // 不刷新
                this.refrashflag = false
            } else {
                // this.refrash = '0'
            }

        },
        'chartsDialog': function() {
            if (this.chartsDialog == true) {
                this.refrash = '5'
                this.selectTime = [new Date() - 60 * 15 * 1000, new Date()]
                this.getTime()
            } else {
                clearInterval(this.setTimeout)
            }
        },
        'layerType': function() {
            // console.log('layerType', this.layerType)
        },
        'refrash': function() {
            // 改变轮询策略
            let that = this
            // 清楚前一个轮询
            clearInterval(that.setTimeout)
            // that.refrashflag = false
            if (that.refrash != '0') {
                that.refrashflag = true
                that.getTime()
            } else {
                that.refrashflag = false
            }
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
        // console.log('updated 111', document.getElementById('line1'))
        // 适配屏幕
        window.addEventListener('resize', () => {
        })
        this.initCharts()
    },
    destroyed() {
        this.refrash = '0'
        this.refrashflag = false
        clearInterval(this.setTimeout)
    },
    methods: {
        ...mapActions([
            'monitorApi'
        ]),
        updateChart,
        setChartData,
        // 初始化图例
        initCharts() {
            if (this.layerType === 'Tomcat') {
                // console.log('layerType', this.layerType)
                // 初始化表1
                // document.getElementById('line1').style.height = height / 2
                this.line1 = echarts.init(document.getElementById('line1'))
                // 初始化表2
                this.line2 = echarts.init(document.getElementById('line2'))
                // 初始化表3
                this.line3 = echarts.init(document.getElementById('line3'))
                // 初始化表4
                this.line4 = echarts.init(document.getElementById('line4'))
            } else if (this.layerType === 'others') {
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
        setpicker() {
            console.log('hello')
        },
        // tomcat项目
        getChartData(params, env, project) {
            let url1 = `/tomcat/${env}/${project}/cpu_usage`
            let url2 = `/tomcat/${env}/${project}/transmission`
            let url3 = `/common/${env}/${project}/fs_status`
            let url4 = `/tomcat/${env}/${project}/jvm_memory`
            // console.log(url1, url2, url3, url4)
            let setParams = {
                url: url1,
                params: params
            }
            // tomcat项目--CPU使用率
            this.monitorApi(setParams).then(cpuChartData => {
                this.optionCpu.xAxis = cpuChartData.xAxis
                this.optionCpu.legend = setYData(cpuChartData.series).map(item => item.name)
                this.optionCpu.series = setChartData(cpuChartData.series)
                // this.optionCpu.yAxis = setYData(cpuChartData.series)
                this.optionCpu.yAxis = cpuChartData.yAxis
                updateChart(this.line1, this.optionCpu)
            })
            //tomcat项目--进出流量
            setParams.url = url2
            this.monitorApi(setParams).then(transmission => {
                this.optionIO.xAxis = transmission.xAxis
                this.optionIO.legend = setYData(transmission.series).map(item => item.name)
                // this.optionIO.yAxis = setYData(transmission.series)
                this.optionIO.yAxis = transmission.yAxis
                this.optionIO.series = setChartData(transmission.series)
                updateChart(this.line2, this.optionIO)
            })
            // // 磁盘IO(读写)/使用率
            setParams.url = url3
            this.monitorApi(setParams).then(fs_status => {
                this.optionPan.xAxis = fs_status.xAxis
                this.optionPan.legend = setYData(fs_status.series).map(item => item.name)
                // this.optionPan.yAxis = setYData(fs_status.series)
                this.optionPan.yAxis = fs_status.yAxis
                this.optionPan.series = setChartData(fs_status.series)
                updateChart(this.line3, this.optionPan)
            })
            // // tomcat项目--JVM堆内存
            setParams.url = url4
            this.monitorApi(setParams).then(jvm_memory => {
                this.optionJVM.xAxis = jvm_memory.xAxis
                this.optionJVM.legend = setYData(jvm_memory.series).map(item => item.name)
                // this.optionJVM.yAxis = setYData(jvm_memory.series)
                this.optionJVM.yAxis = jvm_memory.yAxis
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
                // console.log(noTomcatCpu)
                this.noTomcatCpu.xAxis = noTomcatCpu.xAxis
                this.noTomcatCpu.yAxis = noTomcatCpu.yAxis
                this.noTomcatCpu.legend = setYData(noTomcatCpu.series).map(item => item.name)
                this.noTomcatCpu.series = setChartData(noTomcatCpu.series)
                updateChart(this.line5, this.noTomcatCpu)
            })
            setParams.url = url6
            // 非tomcat项目--进出流量
            this.monitorApi(setParams).then(noTomcatTrans => {
                // console.log(noTomcatTrans)
                this.noTomcatTrans.xAxis = noTomcatTrans.xAxis
                this.noTomcatTrans.yAxis = noTomcatTrans.yAxis
                this.noTomcatTrans.legend = setYData(noTomcatTrans.series).map(item => item.name)
                this.noTomcatTrans.series = setChartData(noTomcatTrans.series)
                updateChart(this.line6, this.noTomcatTrans)
            })
            setParams.url = url7
            //  磁盘IO(读写)/使用率
            this.monitorApi(setParams).then(nofs_status => {
                // console.log(nofs_status)
                this.nofs_status.xAxis = nofs_status.xAxis
                this.nofs_status.yAxis = nofs_status.yAxis
                this.nofs_status.legend = setYData(nofs_status.series).map(item => item.name)
                this.nofs_status.series = setChartData(nofs_status.series)
                updateChart(this.line7, this.nofs_status)
            })
            setParams.url = url8
            // 非 tomcat项目--JVM堆内存
            this.monitorApi(setParams).then(noTomcatJvm => {
                // console.log(noTomcatJvm)
                this.noTomcatJvm.xAxis = noTomcatJvm.xAxis
                this.noTomcatJvm.yAxis = noTomcatJvm.yAxis
                this.noTomcatJvm.legend = setYData(noTomcatJvm.series).map(item => item.name)
                this.noTomcatJvm.series = setChartData(noTomcatJvm.series)
                updateChart(this.line8, this.noTomcatJvm)
            })
        },
        getTime() {
            let that = this
            if (!this.selectTime.length) {
                return
            }
            var start = new Date(that.selectTime[0]);
            var end = new Date(that.selectTime[1]);
            that.startTime = Math.ceil(start.getTime() / 1000)
            that.endTime = Math.ceil(end.getTime() / 1000)
            let params = {
                start: that.startTime,
                end: that.endTime,
                step: 60
            }
            // if (that.endTime == new Date()) {
            //     this.showPicker = false
            //     console.log('hello')
            // }
            let days = (that.endTime - that.startTime) / ( 60 * 60 * 24)
            // if (that.endTime - that.startTime) {
            //     that.refrash = 0
            //     return
            // }
            params.step = this.getStep(days)
            let env = that.projectdetail.deployEnv
            let project = that.projectdetail.mark
            if (that.layerType === 'Tomcat') {
                that.getChartData(params, env, project)
            } else if (that.layerType === 'others') {
                that.getNoTomcatData(params, env, project)
            } else {
                // console.log('no')
            }
            if (that.setTimeout != null) {
                clearInterval(that.setTimeout)
            }
            that.setTimeout = setInterval(function() {
                if (!that.refrashflag) {
                    return
                }
                let space = (that.selectTime[1] - that.selectTime[0]) / 1000
                let selectTime = [new Date() - space * 1000, new Date()]
                var start = new Date(selectTime[0]);
                var end = new Date(selectTime[1]);
                let startTime = Math.ceil(start.getTime() / 1000)
                let endTime = Math.ceil(end.getTime() / 1000)
                let params = {
                    start: startTime,
                    end: endTime,
                    step: 60
                }
                let days = (endTime - startTime) / ( 60 * 60 * 24)
                params.step = that.getStep(days)
                let env = that.projectdetail.deployEnv
                let project = that.projectdetail.mark
                if (that.layerType === 'Tomcat') {
                    that.getChartData(params, env, project)
                } else if (that.layerType === 'others') {
                    that.getNoTomcatData(params, env, project)
                } else {
                    // console.log('no')
                }
            }, that.refrash == 0 ? '5000' : that.refrash * 1000)

        },
        // 根据时间间隔，判断step长度,days最长为365
        getStep(days) {
            if (days <= 0.5) {
                return 30
            } else if (days > 0.5 && days <= 1) {
                return 60
            } else if (days > 1 && days <= 3) {
                return 1200
            } else if (days > 3 && days <= 7) {
                return 1800
            }  else if (days > 7 && days <= 30) {
                return 3600
            }  else if (days > 30 && days <= 60) {
                return 7200
            }  else if (days >60 && days <= 120) {
                return 14400
            } else {
                return 21600
            }
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
// 弹窗样式重写
    #layer  /deep/{
        .el-dialog__header{
            padding: 10px !important;
        }
        .el-dialog__body {
            padding: 0px !important;
        }
       .el-input--suffix .el-input__inner{
            height: 28px;
            line-height: 28px;
            width: 70px;
        }
        .el-input__icon{
            line-height: 30px;
            height: 30px;
        }
        .el-range-editor.el-input__inner{
            height: 30px;
            width: 325px;
        }
        .el-date-editor .el-range-separator{
            line-height: 30px;
            height: 30px;
        }
        .el-dialog__headerbtn{
            top:15px;
        }
        .el-dialog__title{
            font-weight: bold;
        }
    }
.el-row {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  margin-top: 0px;
}
.el-col {
  border-radius: 4px;
  padding: 0 5px !important;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: none;
  //   background: #d3dce6;
  /* border: 1px rgba(255,255,255,.05) solid; */
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-select.el-input--suffix{
    height: 32px;
    line-height: 32px;
}
.el-select.el-input__inner {
    height: 32px;
    line-height: 32px;
}
.echarts_content {
  background: #f0f4f8;
  padding:10px;
//   height: 70vh;
}

.title{
    overflow: hidden;
    position: absolute;
    top:8px;
    right: 50px;
    font-size: 12px;

    >div{
        float: right;
        margin-right:10px;
        span{
            margin:0 10px 0 10px;
        }
        a{
            display: block;
            color: #666666;
            padding: 0px 15px;
            background: #F9FBFD;
            border: 1px solid #E7E9F0;
            border-radius: 4px;
            height:30px;
            line-height: 30px;
        }
    }
}
.chart {
  width: 100%;
  height: 33vh;
  background: #fff;
}

.tomcat {
  clear: both;
  overflow: hidden;
}
</style>
