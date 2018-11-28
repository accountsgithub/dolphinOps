
<template>
    <div class="monitor_content">
        <div class="tomcat">
            <div class="chart" id="line1"></div>
            <div class="chart" id="line2"></div>
            <div class="chart" id="line3"></div>
            <div class="chart" id="line4"></div>
        </div>
    </div>
</template>

<script>
import {initLineChart} from '@/utils/initCharts.js'
export default {
    data() {
        return {
            chat1: null,
            chat2: null,
            chat3: null,
            chat4: null,
            // json数据模拟
            optionCpu: {
                title: '在Vue中使用setOptionCpu',
                legend: ['cup使用率'],
                xAxis: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子'],
                yAxis: [
                    {
                        name: 'cup使用率',
                        formatter: '{value}'
                    }],
                series: [{
                    title: 'cup使用率',
                    color: '#00BFFF',
                    data: [5, 20, 36, 10, 10, 20],
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
    mounted() {
        console.log((document.body.clientWidth - 200) / 2)
        this.chat1 = document.getElementById('line1')
        this.chat2 = document.getElementById('line2')
        this.chat3 = document.getElementById('line3')
        this.chat4 = document.getElementById('line4')
        //初始化图表
        initLineChart(this.chat2, this.optionIO)
        initLineChart(this.chat1, this.optionCpu)
        initLineChart(this.chat3, this.optionPan)
        initLineChart(this.chat4, this.optionJVM)
    },
    methods: {
        initLineChart
    }
}
</script>
<style lang="scss" scoped>
    .chart{
        width: 550px;
        height: 550px;
    }
    .monitor_content {
        width: 100% ;
        position: absolute;
        padding:20px;
        display: flex;
        .tomcat{
            div{
                float: left;
            }
        }
    }
</style>
