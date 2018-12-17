<template>
    <div class="main_content" id="dashboard">
        <!-- 标题 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple bg-dashboard topTitle" style="border:none">
                    <el-col :span="4" style="padding-right: 0">
                        <div class="grid-content bg-purple bg-dashboard " style="border:none"> </div>
                        <div class="timer">{{time}}</div>
                    </el-col>
                    <el-col :span="16" style="padding: 0">
                        <div class="grid-content bg-purple bg-dashboard" style="border:none">
                            <img :src="dashboardTitle" class="titleImg" alt="dashboardTitle">
                        </div>
                    </el-col>
                    <el-col :span="4" style="padding-left: 0">
                        <div class="grid-content bg-purple bg-dashboard" style="border:none;text-align: right;">
                            <el-button v-if="!fullScreen" class="dashaboardBtn icon iconfont icon-ic-home" @click="linktoHome"></el-button>
                            <el-button v-if="!fullScreen" class="dashaboardBtn icon iconfont icon-quanping" @click="sizeScreen"></el-button>
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <!-- 第一屏 第一行 -->
        <el-row :gutter="20" class="first">
            <el-col :span="5" >
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box">
                        <div class="chats" id="cpuChart"></div>
                    </div>
                    <div class="bottomText">
                        <span><span>高频占用：<span style="color: #fb65ff;font-size:16px;font-weight:bold">{{highCpuProject}}<span style="font-size:12px;font-weight:normal">个</span></span></span></span>
                    </div>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple bg-dashboard" style="border:none">
                    <div class="dashboardTitle">
                        <div>
                            <p><span>容器数</span><span :class=" container?'':'addcolor'"><i :class="['title_icon', 'icon', 'iconfont', container?'icon-shangsheng': 'icon-xiajiang']"></i>{{containerPercent}}</span></p>
                            <p class="numBox">
                                <span v-for="(item, index) in containerCount" v-bind:key="index" class="num">
                                    {{item}}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p><span>发布次数</span><span :class="release?'':'addcolor'"><i :class="['title_icon', 'icon', 'iconfont', release?'icon-shangsheng': 'icon-xiajiang']"></i>{{releasePercent}}</span></p>
                            <!-- <p>{{releaseCount}}次</p> -->
                            <p class="numBox">
                                <span v-for="(item, index) in releaseCount" v-bind:key="index" class="num">
                                    {{item}}
                                </span>
                            </p>
                        </div><div>
                            <p><span>总访问数</span><span :class="access?'':'addcolor'"><i :class="['title_icon', 'icon', 'iconfont', access?'icon-shangsheng': 'icon-xiajiang']"></i>{{accessPercent}}</span></p>
                            <!-- <p>{{accessCount}}</p> -->
                            <p class="numBox">
                                <span v-for="(item, index) in accessCount" v-bind:key="index" class="num">
                                    {{item}}
                                </span>
                            </p>
                        </div><div>
                            <p><span>节点数量</span><span :class="node?'':'addcolor'"><i :class="['title_icon', 'icon', 'iconfont', node?'icon-shangsheng': 'icon-xiajiang']"></i>{{nodePercent}}</span></p>
                            <!-- <p>{{nodeCount}}个</p> -->
                            <p class="numBox">
                                <span v-for="(item, index) in nodeCount" v-bind:key="index" class="num">
                                    {{item}}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="maimImg">
                        <img :src="center" class="" alt="center">
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="PanChart"></div></div>
                    <p>磁盘使用情况</p>
                    <div class="bottomText">
                        <span><span>磁盘已用：<span style="color: #735feb;font-size:16px;font-weight:bold">{{uselDisk}}<span style="font-size:12px;font-weight:normal">G</span></span></span></span>
                        <span><span>磁盘总量：<span style="color: #247adf;font-size:16px;font-weight:bold">{{totalDisk}}<span style="font-size:12px;font-weight:normal">G</span></span></span></span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 第一屏 第二行 -->
        <el-row :gutter="20" style="position:relative;">
            <el-col :span="spanNumother">
                <div class="grid-content bg-purple bg-dashboard _box" >
                    <div class="chart_box"><div class="chats" id="memoryChart"></div></div>
                    <p>内存使用情况</p>
                    <div class="bottomText">
                        <span><span>内存已用：<span style="color: #86d258;font-size:16px;font-weight:bold">{{useMemory}}<span style="font-size:12px;font-weight:normal">G</span></span></span></span>
                        <span><span>内存总量：<span style="color: #e6b564;font-size:16px;font-weight:bold">{{totalMemory}}<span style="font-size:12px;font-weight:normal">G</span></span></span></span>
                    </div>
                </div>
            </el-col>
            <el-col :span="spanNumCenter">
                <div style="height:60px;    position: relative;z-index:33"></div>
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box" style="height:80%"><div class="chats" id="netWorkChart"></div></div>
                </div>
            </el-col>
            <el-col :span="spanNumother">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="IOChart"></div></div>
                </div>
            </el-col>

        </el-row>
        <!-- 第二屏 -->
        <el-row :gutter="20" style="margin-top:60px;">
            <el-col :span="12">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="CpuInAscChart"></div></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="memoryInDescChart"></div></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="CpuInDescChart"></div></div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="memoryInAscChart"></div></div>
                </div>
            </el-col>

        </el-row>
        <!-- 第三屏 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="aveTimeChart"></div></div>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple bg-dashboard _box">
                    <div class="chart_box"><div class="chats" id="warnChart"></div></div>
                </div>
            </el-col>
        </el-row>
        <div class="dots">
            <span :class="currentPage == 0 ? 'active' : ''"></span>
            <span :class="currentPage == 1 ? 'active' : ''"></span>
            <span :class="currentPage == 2 ? 'active' : ''"></span>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import { setgaugeData, setPieData, setLineData, setBarData, setOption } from '@/utils/echartsData.js'
import { setTitleNum } from '@/utils/dashboardStyle.js'
// import { setBorder} from '@/utils/dashboardStyle.js'
import { mapActions } from 'vuex'
import center from '@/assets/dashboard/center.png'
import dashboardTitle from '@/assets/dashboard/dashboardTitle.png'
export default {
    data() {
        return {
            env: null, // 环境变量
            time: null,
            windowHeight: null,
            center,
            dashboardTitle,
            screenWidth: null,
            cpuChart: null,
            memoryChart: null,
            aveTimeChart: null,
            warnChart: null,
            spanNumCenter: 14, 
            spanNumother: 5, 
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
                        text: '云存储实时IO流量情况',
                        left: 'center',
                        top: '5%',
                        textStyle: {
                            color: '#fff',
                            // fontWeight: 'normal',
                            fontSize: '18'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['昨天', '今天'],
                        top: '13%',
                        textStyle: {
                            color: '#C1E5FF',
                        },
                        icon: 'circle',
                        itemWidth: 10,
                        itemHeight: 10,
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '5%',
                        top: '30%',
                        containLabel: true
                    },
                    color: ['#2a8eff', '#86d258'],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            splitLine: {
                                lineStyle: {
                                    color: '#5170DA',
                                    opacity: 0.1
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#5170DA',
                                    opacity: 0.1
                                }
                            },
                            data: ['7:11', '8:11', '9:11', '10:11', '11:11', '12:11', '13:11']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#5170DA',
                                    opacity: 0.1
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#5170DA',
                                    opacity: 0.1
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            name: '昨天',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                opacity: '0.1'
                            },
                            data: [320, 332, 301, 334, 390, 330, 320],
                        },
                        {
                            name: '今天',
                            type: 'line',
                            smooth: true,
                            areaStyle: {
                                opacity: '0.1'
                            },
                            data: [120, 132, 101, 134, 90, 230, 210],
                        },

                    ]
                }
            ],
            reg: /%$/gi,
            //仪表盘、饼图接口展示参数
            highCpuProject: null,
            totalMemory: null,
            totalDisk: null,
            uselDisk: null,
            useMemory: null,
            //总览接口展示参数
            accessCount: null,
            releasePercent: null,
            release: null,
            releaseCount: null,
            accessPercent: null,
            access: null,
            nodeCount: null,
            containerCount: null,
            nodePercent: null,
            node: null,
            containerPercent: null,
            container: null,
            currentPage: 0,
            fullScreen: false, // 是否全屏
            startTime: 0,
            endTime: 0,
            width: '',
            interval: null // 循环刷新参数
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
        that.windowHeight = window.innerHeight
        that.width = window.innerWidth
        that.env = JSON.parse(sessionStorage.getItem('env'))
        // =========初始化========
        that.setSize()
        that.settimer()
        //  =========适配屏幕==========
        window.addEventListener('resize', this.resizeWindow, false)

        // =======鼠标滚动时间监听==========
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', that.scrollFun, false);
        }
        window.onmousewheel = document.onmousewheel = that.scrollFun
        // ==========刷新轮询，5S一次=========
        this.interval = setInterval(() => {
            that.updateIndexData(this.env)
        }, 5000);
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
        this.currentPage = 0
        window.removeEventListener('resize', this.resizeWindow, false);
        window.removeEventListener('DOMMouseScroll', this.scrollFun, false);
        clearInterval(this.interval)
        // this.scrollTo(0)
    },
    computed: {},
    methods: {
        ...mapActions([
            'monitorApi'
        ]),
        resizeWindow() {
            this.windowHeight = window.innerHeight
            this.width = window.innerWidth
            this.setSize()
            this.resizeCharts()
            this.fullScreen = document.webkitIsFullScreen
        },
        // 初始化表,渲染数据
        initEcharts() {
            this.echartsDom.forEach((item, index) => {
                this.echartsObj[index] = echarts.init(document.getElementById(item))
            })
        },
        // 图表重新渲染
        resizeCharts() {
            this.echartsObj.forEach(item => {
                item.resize()
            })
        },
        // 初始化、更新表格数据
        updateIndexData(env) {
            this.initEcharts()
            if (env == null) {
                return
            }
            // 判断数据数组长度,根据分辨率判断bar显示的num
            let numHelf
            let num
            // console.log('this.width', this.width)
            if (this.width < 1440) {
                num = 14
                numHelf = 8
            } else if (this.width > 1440 && this.width < 1920) {
                num = 16
                numHelf = 10
            } else {
                num = 20
                numHelf = 12
            }
            this.getchartData(env)
            this.getOverview(env)
            this.getTransMission(env)
            this.getCpuInDESC(env, numHelf)
            this.getCpuInAsc(env, numHelf)
            this.getMemoryInDESC(env, numHelf)
            this.getMemoryInASC(env, numHelf)
            this.getAvgInASC(env, num)
            this.getErrInASC(env, num)
            this.getIOData()
        },
        // 设置容器高度与margin
        setSize() {
            let height = (window.innerHeight - 160) / 2
            this.width = window.innerWidth
            // console.log('width', width)
            // if (width > 1440) {
            //     this.spanNumCenter =  16 
            //     this.spanNumother = 4
            // } else {
            //     this.spanNumCenter =  12 
            //     this.spanNumother = 6
            // }
            // console.log('height', screen.availHeight, screen.height, window.innerHeight, height)
            this.echartsDom.forEach((item) => {
                if (item === 'netWorkChart') {
                    // console.log('item', item)
                    let newheight = height - 60
                    document.getElementById(item).style.height = `${newheight}px`
                } else {
                    document.getElementById(item).style.height = `${height}px`
                }
            })
            // 设置容器边框
            // setBorder(document.getElementById('cpuChart'))
            this.updateIndexData(this.env)
        },
        //center中心数据
        getOverview(env) {
            let setParams = {
                url: `/dashboard/overview/${env}`,
                params: ''
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                // 数字数组化处理
                this.containerCount = setTitleNum(result.containerCount)
                this.accessCount = setTitleNum(result.accessCount)
                this.releaseCount = setTitleNum(result.releaseCount)
                this.nodeCount = setTitleNum(result.nodeCount)
                this.nodePercent = result.nodePercent
                this.accessPercent = result.accessPercent
                this.releasePercent = result.releasePercent
                this.containerPercent = result.containerPercent
                
                // 百分比文字样式
                this.release = result.releasePercent.replace(this.reg, '') >= 0
                this.container = result.containerPercent.replace(this.reg, '') >= 0
                this.node = result.nodePercent.replace(this.reg, '') >= 0
                this.access = result.accessPercent.replace(this.reg, '') >= 0
                let that = this
                that.nodePercent = that.node ? result.nodePercent : that.nodePercent.substr(1)
                that.accessPercent = that.access ? result.accessPercent : that.accessPercent.substr(1)
                that.releasePercent = that.release ? result.releasePercent : that.releasePercent.substr(1)
                that.containerPercent = that.container ? result.containerPercent : that.containerPercent.substr(1)
            })
        },
        // 获取仪表盘、饼图数据
        getchartData(env) {
            let setParams = {
                url: `/dashboard/panel/${env}`,
                params: ''
            }
            let that = this
            that.monitorApi(setParams).then(res => {
                this.highCpuProject = res.topCpuProjectCnt
                this.totalDisk = res.totalDisk
                this.totalMemory = res.totalMemory
                this.uselDisk = (this.totalDisk * (res.diskUsedPercent / 100)).toFixed(2)
                this.useMemory = (this.totalMemory * (res.memoryUsedPercent / 100)).toFixed(2)
                //cpu使用情况
                let cpuUsedPercent = {
                    title: 'CPU使用情况',
                    value: res.cpuUsedPercent,
                    color: [
                        [res.cpuUsedPercent / 100, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#2a8eff'},{offset: 1, color: '#fb65ff'}])],
                        [1, '#093b72']
                    ]
                }
                setgaugeData(that.echartsObj[0], cpuUsedPercent)
                //磁盘使用情况
                let diskUsedPercent = {
                    value: res.diskUsedPercent, // data
                    color: ['#735FEB', '#0d2259'],
                    name: '磁盘' // subtext
                }
                setPieData(that.echartsObj[2], diskUsedPercent)
                //内存使用情况
                let memoryUsedPercent = {
                    value: res.memoryUsedPercent,
                    color: ['#86D258', '#0d2259'], // dataColor
                    name: '内存'
                }
                setPieData(that.echartsObj[1], memoryUsedPercent)
            })
        },
        //网络流量数据
        getTransMission(env) {
            let setParams = {
                url: `/dashboard/${env}/transmission`,
                params: ''
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                let legend = result.series.map(item => item.name)
                let optionTtansMission = {
                    title: '网络流量情况',
                    color: ['#C0A54D', '#6553D2'],
                    legend: legend,
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                setLineData(that.echartsObj[4], optionTtansMission, 'line')
            })
        },
        // 云IO
        getIOData() {
            // 暂无接口
            setOption(this.echartsObj[3], this.echartsData[0])
        },
        //CPU使用升序
        getCpuInAsc(env, numHelf) {
            let setParams = {
                url: `/comparison/${env}/cpu/top`,
                params: {
                    num: numHelf
                }
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                let optionTtansMission = {
                    title: 'CPU使用情况',
                    subtext: '(单位：%)',
                    color: ['#1ea0f2'],
                    legend: ['CPU使用情况'],
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                setBarData(this.echartsObj[7], optionTtansMission, 'bar')
            })
        },
        //CPU使用降序
        getCpuInDESC(env, numHelf) {
            let setParams = {
                url: `/comparison/${env}/cpu/bottom`,
                params: {
                    num: numHelf
                }
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                let optionTtansMission = {
                    title: 'CPU使用情况',
                    subtext: '(单位：%)',
                    color: ['#1ea0f2'],
                    legend: ['CPU使用情况'],
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                // console.log('that.echartsObj[6]', that.echartsObj)
                setBarData(that.echartsObj[8], optionTtansMission, 'bar')
            })
        },
        //Memory使用降序
        getMemoryInDESC(env, numHelf) {
            let setParams = {
                url: `/comparison/${env}/memory/bottom`,
                params: {
                    num: numHelf
                }
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                let optionTtansMission = {
                    title: '内存使用情况',
                    subtext: '(单位：%)',
                    color: ['#b57edf'],
                    legend: ['内存使用情况'],
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                setBarData(that.echartsObj[9], optionTtansMission, 'bar')
            })
        },
        //Memory使用升序
        getMemoryInASC(env, numHelf) {
            let setParams = {
                url: `/comparison/${env}/memory/top`,
                params: {
                    num: numHelf
                }
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                let optionTtansMission = {
                    title: '内存使用情况',
                    subtext: '(单位：%)',
                    color: ['#b57edf'],
                    legend: ['内存使用情况'],
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                // console.log('optionTtansMission', optionTtansMission)
                // console.log('that.echartsObj[6]', that.echartsObj)
                setBarData(that.echartsObj[10], optionTtansMission, 'bar')
            })
        },
        //平均响应时间--升序
        getAvgInASC(env, num) {
            let setParams = {
                url: `/comparison/${env}/responseAvg/top`,
                params: {
                    num: num
                }
            }
            let that = this
            that.monitorApi(setParams).then(result => {
                let optionTtansMission = {
                    title: '平均响应时间',
                    subtext: '(单位：ms;当前时间段所有响应时间/总次数)',
                    color: ['#09b7c6'],
                    legend: ['平均响应时间'],
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                setBarData(that.echartsObj[5], optionTtansMission, 'bar')
            })
        },
        //项目异常情况
        getErrInASC(env, num) {
            let setParamsTop = {
                url: `/comparison/${env}/errors/top`,
                params: {
                    num: num
                }
            }
            let that = this
            that.monitorApi(setParamsTop).then(result => {
                // console.log(result)
                let optionTtansMission = {
                    title: '项目异常情况',
                    subtext: '(单位：次)',
                    color: ['#FFDD65', '#FF906C'],
                    legend: ['4xx', '5xx'],
                    series: result.series,
                    xAxis: result.xAxis,
                    yAxis: result.yAxis
                }
                setBarData(that.echartsObj[6], optionTtansMission, 'bar')
                // that.echartsObj[6].on('click', function() {
                //     that.$router.push('/projectMgt/exceptionPage')
                // })
            })

        },
        // 循环更新时间
        settimer() {
            setInterval(this.timer, 1000)
        },
        // 时间显示
        timer() {
            let time = new Date();//获取系统当前时间
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let date = time.getDate();//系统时间月份中的日
            let day = time.getDay();//系统时间中的星期值
            let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            let week = weeks[day];//显示为星期几
            let hour = time.getHours();
            let minutes = time.getMinutes();
            let seconds = time.getSeconds();
            // debugger
            if (month < 10) {
                month = `0${month}`
            }
            if (date < 10) {
                date = `0${date}`
            }
            if (hour < 10) {
                hour = `0${hour}`
            }
            if (minutes < 10) {
                minutes = `0${minutes}`
            }
            if (seconds < 10) {
                seconds = `0${seconds}`
            }
            this.time = `${year}年${month}月${date}日 ${hour}:${minutes}:${seconds}  ${week}`
        },
        //滚动检测,跳转到对应高度
        scrollFun(e) {
            this.startTime = new Date().getTime();
            let event = e || window.event;
            let dir = event.detail || -event.wheelDelta;
            if (this.startTime - this.endTime > 600) { // 解决多次触发scroll
                if (dir > 0 && this.currentPage < 2) {
                    this.endTime = new Date().getTime();
                    this.currentPage = this.currentPage + 1
                    this.scrollTo(this.currentPage * this.windowHeight)
                } else if (dir < 0 && this.currentPage > 0) {
                    this.currentPage = this.currentPage - 1
                    this.scrollTo(this.currentPage * this.windowHeight)
                    this.endTime = new Date().getTime();
                }
            } else {
                event.preventDefault();
            }
        },
        // 平滑跳转到top高度
        scrollTo(val) {
            window.scrollTo({'top': val, 'behavior': 'smooth'})
        },
        // 全屏/退出全屏
        sizeScreen() {
            // console.log(document.webkitIsFullScreen)
            if (!this.fullScreen) {
                document.documentElement.webkitRequestFullscreen() // 针对谷歌游览器
            } else {
                document.webkitExitFullscreen()
            }
        },
        // 会到项目列表页面
        linktoHome() {
            this.$router.push('/projectMgt/index')
        }
    }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1440px) {
    #dashboard /deep/{
        .el-col-5{
            width: 23%;
        }
        .el-col-14{
            width: 54%;
        }
    }
}
.topTitle {
  border: none;
  position: fixed;
  z-index: 33;
  background: #091549;
  top: 0;
  width: 100%;
  left: 0;
  padding: 0 20px;
}
.numBox {
    display: flex;
    justify-content: space-between;
  .num {
    padding: 3px 4px;
    flex: 1;
    text-align: center;
    max-width: 22px;
    background: #0d6ed3;
    color: #fff !important;
    font-size: 18px !important;
    float: left !important;
    margin-right: 3px;
    border-radius: 2px;
  }
}
.bottomText {
  display: flex;
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: 10%;
  z-index: 3;
}
.bottomText > span {
  width: 45%;
//   height: 28px;
  line-height: 28px;
  margin: 0 auto;
  border: 1px #15356f solid;
  position: relative;
  &::before {
    display: block;
    width: 10px;
    height: 10px;
    line-height: 10px;
    position: absolute;
    top: -5px;
    left: -5px;
    content: "+";
    color: #3a75dd;
  }
  &::after {
    display: block;
    width: 10px;
    height: 10px;
    line-height: 10px;
    position: absolute;
    right: -5px;
    bottom: -5px;
    content: "+";
    color: #3a75dd;
  }
  & > span {
    &::before {
      display: block;
      width: 10px;
      height: 10px;
      line-height: 10px;
      position: absolute;
      top: -5px;
      right: -5px;
      content: "+";
      color: #3a75dd;
    }
    &::after {
      display: block;
      width: 10px;
      height: 10px;
      line-height: 10px;
      position: absolute;
      left: -5px;
      bottom: -5px;
      content: "+";
      color: #3a75dd;
    }
  }
}
.timer {
  font-size: 15px;
  color: #fff;
  top: 25px;
  left: 40px;
  position: absolute;
}
.titleImg {
  width: 100%;
}
.dashboardTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
  & > div {
    flex: 1;
    padding: 0 15px;
    max-width: 188px;
    color: #d5f0ff;
    & > p {
      padding: 0;
      margin: 0;
      overflow: hidden;
      font-size: 14px;
      & > span {
        float: left;
        &:last-child {
          float: right;
          color: #ff5656;
          font-size: 12px;
        //   transform: scale(0.85)
        }
      }
      &:last-child {
        font-size: 20px;
        padding: 5px 0;
      }
    }
  }
}
.first {
    position: relative;
    z-index:22
}
.maimImg {
  & > img {
    width: 100%;
    position: absolute;
  }
  width: 100%;
  position: relative;
}
.addcolor {
  color: #85e86a !important;
}
.title_icon {
  width: 18px;
  height: 20px;
  font-size: 10px;
}
._box {
  .chats {
    width: 100%;
    // height: 40%;
    position: relative;
    z-index: 2;
    background: #091549;
    box-shadow: rgba(27,216,247,0.08) 0px 0px 36px -3px inset;
  }
  p{
    width: 100%;
    position: absolute;
    top: 2%;
    z-index: 2;
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
  }
  .chart_box {
    background: #091549;
    &::before {
      display: block;
      width: 10px;
      height: 10px;
      background: #17b8bb;
      position: absolute;
      border-radius: 3px;
      z-index: 1;
      bottom: -2px;
      left: -2px;
      content: " ";
    }
    &::after {
      display: block;
      width: 10px;
      height: 10px;
      background: #17b8bb;
      position: absolute;
      border-radius: 3px;
      z-index: 1;
      bottom: -2px;
      right: -2px;
      content: " ";
    }
  }
  &::before {
    display: block;
    width: 10px;
    height: 10px;
    background: #17b8bb;
    position: absolute;
    border-radius: 3px;
    z-index: 1;
    top: -2px;
    left: -2px;
    content: " ";
  }
  &::after {
    display: block;
    width: 10px;
    height: 10px;
    background: #17b8bb;
    position: absolute;
    border-radius: 3px;
    z-index: 1;
    top: -2px;
    right: -2px;
    content: " ";
  }
}
.dots{
    width: 10px;
    height: 50px;
    position: fixed;
    top:52%;
    right: 16px;
    z-index: 22;
    span{
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background: #133166;
        margin-bottom:8px;
    }
    .active{
        background: #BBD3FF;
    }
}
</style>
<style>

body::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
}

.el-row {
  /* margin-bottom: 30px; */
  margin-top: 30px;
}
.main_content .el-row:nth-child(2n){
    margin-top: 40px;
}
.main_content .el-row:nth-child(2n+1){
    margin-bottom: 40px;
}
.main_content .el-row:nth-child(3){
    margin-bottom: 120px;
}
.main_content .el-row:nth-child(5){
    margin-bottom: 120px;
}
.main_content:last-child {
    margin-bottom: 0px;
  }
.el-col {
  border-radius: 4px;
  padding: 0;
}
.bg-purple bg-dashboard-dark {
  background: #99a9bf;
}
.bg-dashboard {
  background: none;
  /* background: #d3dce6; */
  position: relative;
  z-index: 2;
  border: 2px #0d2259 solid;
  color: #d8d8d8;
  font-weight: normal;
}
.bg-purple bg-dashboard-light {
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
}
.main_content {
  padding: 30px 40px;
  background: #091649;
}
@media screen and (max-width: 1920px) {
    .maimImg{
        position: absolute !important;
    }
    .maimImg>img{
        max-width: 750px !important;
        display: block;
        margin: 0 auto;
        position: static !important;
    }
}
@media screen and (max-width: 1440px) {
    .numBox {
    }
    .numBox .num{
        margin-right:0px !important;
        transform: scale(0.9);
    }
    .maimImg{
        position: absolute !important;
    }
    .maimImg>img{
        max-width: 630px !important;
        display: block;
        margin: 0 auto;
        position: static !important;
    }
    .bottomText{
           bottom: 5% !important; 
    }
    .bottomText > span{
        width: 34% !important;
    }
}
@media screen and (max-width: 1366px) {
    .maimImg{
        position: absolute !important;
    }
    .bottomText{
           bottom: 2% !important; 
    }
    .maimImg>img{
        max-width: 570px !important;
        display: block;
        margin: 0 auto;
        position: static !important;
    }
}
</style>
