
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
                        :value="item.value"></el-option>
                </el-select>
            </div>
            <div style="flex = 1;">
                <span class="demonstration">日期选择</span>
                <el-date-picker
                    v-model="timer"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    @blur="getTime">
                </el-date-picker>
            </div>
        </div>
        <div class="tomcat">
            <div class="chart" id="line1"></div>
            <div class="chart" id="line2"></div>
            <div class="chart" id="line3"></div>
            <div class="chart" id="line4"></div>
        </div>
    </el-dialog>
</template>

<script>
import {initLineChart} from '@/utils/initCharts.js'
import axios from 'axios'
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
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        // picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近30分钟',
                    onClick(picker) {
                        console.log(picker)
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        // picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近1小时',
                    onClick(picker) {
                        console.log(picker)
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        // picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '今日',
                    onClick(picker) {
                        console.log(picker)
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
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
                        // const end = new Date();
                        // const start = new Date();
                        // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        // picker.$emit('pick', [start, end]);
                    }
                }]
            },
            timer: '', // 时间选择
            refrash: '0', // 刷新频率选择
            chat1: null,
            chat2: null,
            chat3: null,
            chat4: null,
            // json数据模拟
            optionCpu: {
                title: '在Vue中使用setOptionCpu',
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
                title: '流量访问次数',
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
                title: '在Vue中使用setOptionJVM',
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
            }
        }
    },
    props: ['chartsDialog', 'project'],
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
        },
        type: {
            get() {
                return this.layerType
            },
            set() {
            }
        },
    },
    updated() {
        // 初始化表1
        this.line1 = echarts.init(document.getElementById('line1'))
        // 初始化表2
        this.line2 = echarts.init(document.getElementById('line2'))
        // 初始化表3
        this.line3 = echarts.init(document.getElementById('line3'))
        // 初始化表4
        this.line4 = echarts.init(document.getElementById('line4'))
    },
    before() {
        // console.log('before 111', document.getElementById('line1'))
    },
    beforeMount() {
        // console.log('beforeMount 111', document.getElementById('line1'))
    },
    mounted() {
        // console.log('mounted 111', document.getElementById('line1'))
        console.log((document.body.clientWidth - 200) / 2)
    },
    methods: {
        initLineChart,
        getChartData(params, env, project) {
            let url1 = `/tomcat/${env}/${project}/cpu_usage`
            let url2 = `/tomcat/${env}/${project}/transmission`
            let url3 = `/common/${env}/${project}/fs_status`
            let url4 = `/tomcat/${env}/${project}/jvm_memory`
            console.log(url1,url2,url3,url4)
            // tomcat项目--CPU使用率
            this.api(url1, params).then(cpuChartData => {
                // this.setChartData(cpuChartData)
                this.optionCpu.xAxis = cpuChartData.xAxis
                this.optionCpu.legend = cpuChartData.legend
                this.optionCpu.series = this.setChartData(cpuChartData.series)
                initLineChart(this.line1, this.optionCpu)
            })
            //tomcat项目--进出流量
            this.api(url2, params).then(transmission => {
                // console.log('chart', transmission)
                this.optionIO.xAxis = transmission.xAxis
                this.optionIO.legend = transmission.legend
                this.optionIO.series = this.setChartData(transmission.series)
                initLineChart(this.line2, this.optionIO)
            })
            // // 磁盘IO(读写)/使用率
            this.api(url3, params).then(fs_status => {
                // console.log('chart', fs_status)
                this.optionPan.xAxis = fs_status.xAxis
                this.optionPan.legend = fs_status.legend
                this.optionPan.series = this.setChartData(fs_status.series)
                initLineChart(this.line3, this.optionPan)
            })
            // // tomcat项目--JVM堆内存
            this.api(url4, params).then(jvm_memory => {
                // console.log('chart', jvm_memory)
                this.optionJVM.xAxis = jvm_memory.xAxis
                this.optionJVM.legend = jvm_memory.legend
                this.optionJVM.series = this.setChartData(jvm_memory.series)
                initLineChart(this.line4, this.optionJVM)
            })
        },
        getTime() {
            var start = new Date(this.timer[0]);
            var end = new Date(this.timer[1]);
            console.log(start.getTime(), end.getTime())
            this.startTime = start.getTime()/1000
            this.endTime = end.getTime()/1000
            let params = {
                start: this.startTime,
                end: this.endTime,
            }
            let env = this.projectdetail.deployEnv
            let project = this.projectdetail.mark
            this.getChartData(params, env, project)
        },
        api(url1, params) {
            return  axios.get(url1, {params})
                .then(response => {
                    console.log('response', response)
                    if (response.data.code == 0) {
                        return response.data.result
                    }
                })
                // .then(({result}) => {commit(TYPES.GET_EAMIL_SETTING,result)})
                .catch(error => Promise.reject(error))
        },
        setChartData(seriesData) {
            let series = new Array
            if (!seriesData.length) {
                return seriesData
            }
            let colors = ['#EDB10C', '#F56E6A ', '#4EA9F9']
            seriesData.map((item, index) => {
                let seriesItem = new Object
                // seriesItem.title = item.name
                // console.log('item.color', index)
                seriesItem.color = colors[index]
                seriesItem.yAxisIndex = item.position
                seriesItem.data = item.data
                console.log('item.color', index, colors[index], seriesItem)
                series.push(seriesItem)
            })
            // console.log('item.color', series)
            return series
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
