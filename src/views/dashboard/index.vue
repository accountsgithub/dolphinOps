<template>
    <div class="main_content">
        <!-- 标题 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="" id=""></div>
                </div>
            </el-col>
        </el-row>
        <!-- 第一屏 第一行 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <div class="chats" id="cpuChart"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="mainData chats">
                        <el-row :gutter="20">
                            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        </el-row>
                    </div>
                    <div class="maimImg"></div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <div class="chats" id="PanChart"></div>
                </div>
            </el-col>
        </el-row>
        <!-- 第一屏 第二行 -->
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <div class="chats" id="memoryChart"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="chats" id="netWorkChart"></div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <div class="chats" id="IOChart"></div>
                </div>
            </el-col>
        </el-row>
        <!-- 第二屏 -->
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="chats" id="CpuInAscChart"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="chats" id="CpuInDescChart"></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="chats" id="memoryInAscChart"></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="chats" id="memoryInDescChart"></div>
                </div>
            </el-col>
        </el-row>
        <!-- 第三屏 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="chats" id="aveTimeChart"></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="chats" id="warnChart"></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import echarts from 'echarts'
// import { updateChart } from '@/utils/initCharts.js'
export default {
    data() {
        return {
            screenWidth: null,
            cpuChart: null,
            memoryChart: null,
            aveTimeChart: null,
            warnChart: null,
            echartsDom: [
                'cpuChart',
                'memoryChart',
                'PanChart',
                'IOChart',
                'netWorkChart',
                'aveTimeChart',
                'warnChart',
                'CpuInAscChart',
                'CpuInDescChart',
                'memoryInAscChart',
                'memoryInDescChart'
            ],
            echartsObj: [
                this.cpuChart,
                this.memoryChart,
                this.PanChart,
                this.netWorkChart,
                this.IOChart,
                this.aveTimeChart,
                this.warnChart,
                this.CpuInAscChart,
                this.CpuInDescChart,
                this.memoryInAscChart,
                this.memoryInDescChart
            ],
            optionCpu: null,
            optionMemory: null,
            optionPan: null,
            optionNetWork: null,
            optionIO: null,
            optionTime: null,
            optionWarn: null,
            optionCpuInAsc: null,
            optionCpuInDesc: null,
            echartsData: [
                {
                    title: {
                        text: 'cpu使用情况',
                        top: '10%',
                        left: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#fff',
                            width: '100%'
                        }
                    },

                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [{
                        type: 'gauge',
                        center: ['50%', '50%'], // 默认全局居中
                        radius: '60%',
                        axisLine: {
                            show: false,
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.8, '#2a8eff'],
                                    [1, 'rgba(1, 147, 207, 0.3)']
                                ],
                                width: 24
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false,
                            length: '0',
                            width: '0'
                        },
                        detail: {
                            formatter: '{value}%',
                            offsetCenter: [0, '5%']
                        },
                        data: [{
                            name: 'CPU已使用',
                            value: 80,
                            label: {
                                textStyle: {
                                    fontSize: 12
                                }
                            }
                        }]
                    }]
                },
                {
                    title: {
                        text: '80%',
                        subtext: '内存使用情况',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#fff',
                            fontSize: '20',
                            top: '10%'
                        }
                    },
                    color: ['rgba(176, 212, 251, 1)'],
                    legend: {
                        show: true,
                        itemGap: 12,
                        data: ['已用', '剩余'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },

                    series: [{
                        name: '内存使用情况',
                        type: 'pie',
                        clockWise: true,
                        radius: ['50%', '66%'],
                        color: ['#2a8eff', '#ffe858'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        hoverAnimation: false,
                        data: [{
                            value: 80,
                            name: '已用',
                        }, {
                            name: '剩余',
                            value: 20,
                            color: '#ffe858',
                        }]
                    }]
                },
                {
                    title: {
                        text: '80%',
                        subtext: '磁盘使用情况',
                        x: 'center',
                        y: 'center',
                        color: '#fff',
                        textStyle: {
                            fontWeight: 'normal',
                            // color: '#fff',
                            fontSize: '20'
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            color: '#fff',
                            // fontSize: '20'
                        }
                    },
                    color: ['rgba(176, 212, 251, 1)'],
                    legend: {
                        show: true,
                        itemGap: 12,
                        data: ['已用', '剩余'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },

                    series: [{
                        name: '内存使用情况',
                        type: 'pie',
                        clockWise: true,
                        radius: ['50%', '66%'],
                        color: ['#86d258', '#ffc768'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        hoverAnimation: false,
                        data: [{
                            value: 65,
                            name: '已用',
                        }, {
                            name: '剩余',
                            value: 35,
                            color: '#ffe858',
                        }]
                    }]
                },
                {
                    title: {
                        text: '网络流量情况',
                        top: '3%',
                        left: '5%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                        }
                    },
                    // tooltip: {
                    //     trigger: 'axis'
                    // },
                    color: ['#C0A54D', '#6553D2'],
                    legend: {
                        data: ['流出', '流入'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: {

                    },
                    series: [
                        {
                            name: '流出',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                opacity: '0.1'
                            },
                            data: [4.6, 3.7, 2.4, 4.4, 1.2, 3.2, 6, 3.2, 3.6, 2.4, 0.3, 2.1]

                        },
                        {
                            name: '流入',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                opacity: '0.1'
                            },
                            data: [6, 20, 8, 4, 9.5, 26, 10.3, 9.6, 5.8, 6.2, 16.6, 16]

                        }
                    ]
                },
                {
                    title: {
                        text: '云存储实时IO流量情况',
                        left: 'center',
                        top: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['已用', '剩余'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#2a8eff', '#86d258'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '已用',
                            type: 'bar',
                            barWidth: '20%',
                            data: [320, 332, 301, 334, 390, 330, 320],
                            // itemStyle: {
                            //     normal: {color: '#2a8eff'},
                            // },
                        },
                        {
                            name: '剩余',
                            type: 'bar',
                            stack: '广告',
                            barGap: '10%',
                            barWidth: '20%',
                            data: [120, 132, 101, 134, 90, 230, 210],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                },
                {
                    title: {
                        text: '平均响应时间',
                        // left: 'center',
                        subtext: '(单位：ms;当前时间段所有响应时间/总次数)',
                        top: '3%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        },
                        subtextStyle: {
                            color: '#4E9ED8'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['平均响应时间'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#09b7c6'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '平均响应时间',
                            type: 'bar',
                            // stack: '广告',
                            barGap: '2%',
                            barWidth: '20%',
                            data: [500, 486, 472, 451, 420, 401, 356, 310, 230, 210, 180, 168, 156, 144],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                },
                {
                    title: {
                        text: '项目异常情况',
                        subtext: '(单位：次)',
                        // left: 'center',
                        top: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        },
                        subtextStyle: {
                            color: '#4E9ED8'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['4xx', '5xx'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#DFBF4A', '#FF906C'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '4xx',
                            type: 'bar',
                            barWidth: '20%',
                            data: [500, 486, 472, 451, 420, 401, 356, 310, 230, 210, 180, 168, 156, 144],
                            // itemStyle: {
                            //     normal: {color: '#2a8eff'},
                            // },
                        },
                        {
                            name: '5xx',
                            type: 'bar',
                            // stack: '广告',
                            barGap: '-100%',
                            barWidth: '20%',
                            data: [480, 466, 452, 430, 400, 381, 336, 290, 210, 190, 160, 148, 136, 124],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                },
                {
                    title: {
                        text: 'CPU使用情况',
                        // left: 'center',
                        subtext: '(单位：ms;当前时间段所有响应时间/总次数)',
                        top: '3%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        },
                        subtextStyle: {
                            color: '#4E9ED8'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['CPU使用情况'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#1EA0F2'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '平均响应时间',
                            type: 'bar',
                            // stack: '广告',
                            // barGap: '2%',
                            barWidth: '40%',
                            data: [500, 486, 472, 451, 420, 401, 356, 310, 230, 210, 180, 168, 156, 144],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                },
                {
                    title: {
                        text: 'CPU使用情况',
                        // left: 'center',
                        subtext: '(单位：ms;当前时间段所有响应时间/总次数)',
                        top: '3%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        },
                        subtextStyle: {
                            color: '#4E9ED8'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['CPU使用情况'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#B67EDF'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '平均响应时间',
                            type: 'bar',
                            // stack: '广告',
                            barGap: '2%',
                            barWidth: '40%',
                            data: [144, 156, 168, 180, 210, 230, 310, 356, 401, 420, 451, 472, 486, 500],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                },
                {
                    title: {
                        text: 'CPU使用情况',
                        // left: 'center',
                        subtext: '(单位：ms;当前时间段所有响应时间/总次数)',
                        top: '3%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        },
                        subtextStyle: {
                            color: '#4E9ED8'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['CPU使用情况'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#1EA0F2'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '平均响应时间',
                            type: 'bar',
                            // stack: '广告',
                            // barGap: '2%',
                            barWidth: '40%',
                            data: [500, 486, 472, 451, 420, 401, 356, 310, 230, 210, 180, 168, 156, 144],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                },
                {
                    title: {
                        text: 'CPU使用情况',
                        // left: 'center',
                        subtext: '(单位：ms;当前时间段所有响应时间/总次数)',
                        top: '3%',
                        left: '3%',
                        textStyle: {
                            color: '#fff',
                            fontWeight: 'normal',
                            fontSize: '18'
                        },
                        subtextStyle: {
                            color: '#4E9ED8'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['CPU使用情况'],
                        top: '10%',
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '20%',
                        containLabel: true
                    },
                    color: ['#B67EDF'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '平均响应时间',
                            type: 'bar',
                            // stack: '广告',
                            barGap: '2%',
                            barWidth: '40%',
                            data: [144, 156, 168, 180, 210, 230, 310, 356, 401, 420, 451, 472, 486, 500],
                            // itemStyle: {
                            //     normal: {color: '#86d258'},
                            // },
                        },

                    ]
                }
            ],
        }
    },
    created() {
        // console.log('created 111', document.getElementById('cpuChart'))
    },
    before() {
        // console.log('before 111', document.getElementById('cpuChart'))
    },
    beforeMount() {
        // console.log('beforeMount 111', document.getElementById('cpuChart'))
    },
    mounted() {
        let that = this
        that.initEcharts()
        // 适配屏幕
        window.addEventListener('resize', () => {
            that.resizeCharts()
        })
    },
    beforeUpdate() {
    },
    updated() {
    },
    computed: {},
    methods: {
        // 初始化表,渲染数据
        initEcharts() {
            // let that = this
            this.echartsDom.forEach((item, index) => {
                // console.log(item)
                // 初始化表
                this.echartsObj[index] = echarts.init(document.getElementById(item))
                // console.log(that.echartsObj)
                // console.log(this.echartsData[index])
                // 渲染数据
                this.echartsObj[index].setOption(this.echartsData[index], true)
            })
        },
        // 图表重新渲染
        resizeCharts() {
            this.echartsObj.forEach(item => {
                item.resize()
            })
        }
    }
}
</script>
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: none;
  background: #d3dce6;
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
.app-main {
  /* background: #091649; */
}
.main_content {
  padding: 20px;
}
.chats {
  width: 100%;
  height: 350px;
}
.netWorkChart {
}
</style>