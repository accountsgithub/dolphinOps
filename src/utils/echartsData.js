// import echarts from 'echarts'
import date from '@/utils/date.js'
// 基础监控--line处理option中的数据
export function updateChart(myChartLine, option) {
    // cpuChart初始化数据
    // console.log('option', option)
    // 处理Y轴
    let yAxis = new Array
    if (option.yAxis && option.yAxis.length) {
        for (let i = 0; i < option.yAxis.length; i++) {
            const item = option.yAxis[i];
            let yAxisItem = new Object
            yAxisItem = {
                name: item.name,
                splitLine: { // 网格线 y轴对应的是否显示
                    show: true,
                    lineStyle: {
                        color: ['#F3F5FA']  
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    // formatter: item.formatter,
                    color: '#7B7F86'
                },
                axisLine: {
                    lineStyle: {
                        color: '#DCDFE6'
                    }
                },
                nameTextStyle: {
                    color: '#A3A8AF'
                }
            }
            yAxis.push(yAxisItem)
        }
    } else {
        yAxis = []
    }

    // 处理series
    let series = new Array
    if (option.series && option.series.length) {
        for (let i = 0; i < option.series.length; i++) {
            const item = option.series[i]
            // console.log('item', item)
            let seriesItem = new Object
            seriesItem = {
                name: item.name,
                type: 'line',
                yAxisIndex: item.yAxisIndex == 'left' ? 0 : 1,
                itemStyle: {
                    color: item.color
                },
                lineStyle: {
                    color: item.color
                },
                areaStyle: {
                    color: item.color,
                    opacity: '0.1'
                },
                symbolSize: 1,
                formatter: item.formatter,
                smooth: true,
                data: item.data
            }
            series.push(seriesItem)
        }
    } else {
        series = []
    }
    // 拼装option
    let setOption = {
        title: {
            text: option.title,
            top: '2%',
            left: '3%',
            textStyle: {
                fontSize: 14,
                color: '#49505C'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%',
            top: '22%',
            containLabel: true
        },
        legend: {
            show: true,
            bottom: '3%',
            icon: 'circle',
            itemGap: 40,
            itemWidth: 8,
            itemHeight: 8,
            data: option.legend
        },
        xAxis: {
            type: 'category',
            // type: 'time',
            boundaryGap: false, // 坐标轴两边不留白
            // splitLine: { // 网格线 x轴对应的是否显示
            //     show: true,
            //     lineStyle: {
            //         color: ['#F3F5FA']  
            //     }
            // },
            axisLine: {
                lineStyle: {
                    color: '#DCDFE6'
                }
            },
            axisLabel: {
                color: '#7B7F86',
                formatter: (datas) => {
                    let date = datas.split(' ')
                    // console.log('date', date)
                    return `${date[0]}\n${date[1]}`
                },
            },
            data: option.xAxis
        },
        yAxis: yAxis,
        series: series
    }
    myChartLine.setOption(setOption, true)
}
// 基础监控--处理series
export function setChartData(seriesData) {
    // console.log('seriesData', seriesData)
    let series = []
    if (!seriesData.length) {
        return series
    }
    let colors = ['#EDB10C', '#F56E6A ', '#4EA9F9', '#818BF7', '#6EC71E']
    seriesData.map((item, index) => {
        let seriesItem = new Object
        seriesItem.color = colors[index]
        seriesItem.name = item.name
        seriesItem.yAxisIndex = item.position
        seriesItem.data = item.data
        // console.log('item.color', index, colors[index], seriesItem)
        series.push(seriesItem)
    })
    // console.log('series series', series.length)
    return series
}
// 基础监控处理Y轴
export function setYData(seriesData) {
    // console.log(seriesData)
    let yAxis = []
    seriesData.map(item => {
        let yAxisItem = {
            name: item.name,
            // formatter: item.formatter
        }
        yAxis.push(yAxisItem)
    })
    // console.log(yAxis)
    return yAxis
}
// dashboard页面仪表盘处理option中数据
export function setgaugeData(targit, res) {
    let optionData = {
        title: {
            text: res.title,
            top: '7%',
            left: 'center',
            color: '#fff',
            textStyle: {
                // fontWeight: 'normal',
                color: '#fff',
                width: '100%',
                // fontSize: 28,
            },
            // subtext: 'CPU已使用'
        },
        tooltip: {
            formatter: '{a}%'
        },
        series: [{
            type: 'gauge',
            center: ['50%', '50%'], // 默认全局居中
            radius: '50%',
            axisLine: {
                show: false,
                lineStyle: { // 属性lineStyle控制线条样式
                    color: res.color,
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
                fontWeight: 'bold',
                formatter: [
                    '{value}%',
                    '{b|CPU已使用}'
                ].join('\n'),
                rich: {
                    a: {
                        color: '#fff',
                        fontSize: '20',
                        
                    },
                    b: {
                        color: '#fff',
                        fontSize: '12',
                        height: 26,
                    }
                },
                offsetCenter: [0, '5%'],
                color: '#fff',
                fontSize: '20'
            },
            data: [{
                // name: 'CPU已使用',
                value: res.value,
                x: 'center',
                y: 'center',
                itemStyle: {
                    color: '#FFF',
                    fontSize: '15'
                }
            }]
        }]
    }
    setOption(targit, optionData)
}
// dashboard页面饼图处理option中数据
export function setPieData(targit, res) {
    let pieData = {
        title: {
            text: `${res.value}%`,
            subtext: `${res.name}已使用`,
            x: 'center',
            y: '43%',
            textStyle: {
                // fontWeight: 'normal',
                color: '#fff',
                fontSize: '20',
            },
            subtextStyle: {
                fontWeight: 'normal',
                color: '#fff',
            }
        },
        color: ['rgba(176, 212, 251, 1)'],
        legend: {
            show: true,
            itemGap: 12,
            data: ['已用', '剩余'],
            top: '15%',
            textStyle: {
                color: '#C1E5FF',
                
            },
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
        },

        series: [{
            // name: '内存使用情况',
            type: 'pie',
            clockWise: true,
            startAngle: -90,
            radius: ['36%', '50%'],
            color: res.color,
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
                value: res.value,
                name: '已用',
            }, {
                name: '剩余',
                value: 100 - res.value,
                // color: '#ffe858',
            }]
        }]
    }
    // console.log(targit, pieData)
    setOption(targit, pieData)
}

// 网络流量
export function setLineData(targit, res, type) {
    // console.log('series res', res)
    let series = setOptionData(res, type)
    let yAxis = setyAxis(res.yAxis)
    let subtext
    if (yAxis.length === 1) { // 单位的判断
        subtext = yAxis[0].formatter.split('{value}')[1]
        // console.log('subtext', subtext)
    }
    let lineData = {
        title: {
            text: res.title,
            subtext: `单位: ${subtext}`,
            top: '5%',
            left: '5%',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
            },
            subtextStyle: {
                color: '#4E9ED8'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            // formatter: (data) => {
            //     // for (var i = 0, length = data.length; i < length; i++) {
            //     //     res = data[i].name 
            //     // }
            //     // return res
            // }
        },
        color: ['#C0A54D', '#6553D2', '#2a8eff', '#86d258'],
        legend: {
            data: res.legend,
            bottom: '1%',
            textStyle: {
                color: '#C1E5FF',
            },
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '30%',
            containLabel: true
        },
        xAxis: {
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
            data: res.xAxis
        },
        yAxis: yAxis,
        series: series
    }
    // console.log('lineData', lineData)
    setOption(targit, lineData)
}
// dashboard中bar的y轴处理
export function setyAxis(data) {
    let yAxis = []
    data.map(item => {
        let newItem = {
            // 'type': 'value',
            'splitLine': {
                lineStyle: {
                    color: '#5170DA',
                    opacity: 0.1
                }
            },
            'axisTick': {
                'show': false
            },
            'axisLine': {
                'show': false,
                'lineStyle': {
                    'color': '#5170DA',
                    'opacity': 0.1
                }            
            },
            'formatter': item.formatter,
            // 'name': item.name
        }
        yAxis.push(newItem)
    })
    // console.log('11111', yAxis)
    return yAxis
}

export function setOptionData(option, type) {
    let series = new Array
    if (type == 'line') {
        if (option.series && option.series.length) {
            for (let i = 0; i < option.series.length; i++) {
                const item = option.series[i]
                let seriesItem = new Object
                seriesItem = {
                    name: option.legend[i],
                    type: type,
                    yAxisIndex: item.position == 'left' ? 0 : 1,
                    areaStyle: {
                        opacity: '0.1'
                    },
                    formatter: item.formatter,
                    smooth: true,
                    data: item.data
                }
                series.push(seriesItem)
            }
        } else {
            series = []
        }
    } else if (type == 'bar') {
        if (option.series && option.series.length == 1) {
            // console.log(option.series)
            option.series.map((item, index) => {
                let seriesItem = new Object
                seriesItem = {
                    name: option.legend[index],
                    type: type,
                    barWidth: option.series[0].data.length < 8 ? '10%' : '20px', // 获取到的数据不足请求的数据
                    // barWidth: '20px',
                    barCategoryGap: '42px',
                    // barGap: index > 1 ? '-100%' : '2%',
                    barGap: '42px',
                    formatter: item.formatter,
                    data: item.data
                }
                series.push(seriesItem)
            })
        } else if (option.series && option.series.length > 1) { // 多数据柱状图数据处理
            // console.log('option.legend', option.legend, option.series)
            option.series.map((item, index) => {
                let seriesItem = new Object
                seriesItem = {
                    name: option.legend[index],
                    type: type,
                    barWidth: '20px',
                    barCategoryGap: '42px',
                    barGap: '-100%',
                    formatter: item.formatter,
                    data: item.data
                }
                series.push(seriesItem)
            })
        } else {
            series = []
        }
    }
    return series
}
export function setBarData(targit, res, type) {
    let series = setOptionData(res, type)
    let yAxis = setyAxis(res.yAxis)
    let showlegend = targit._dom.id // 项目异常情况legend参数
    let barData = {
        title: {
            text: res.title,
            subtext: res.subtext,
            link: '#/projectMgt/exceptionPage',
            target: 'self',
            top: '3%',
            left: '3%',
            textStyle: {
                color: '#fff',
                // fontWeight: 'normal',
                fontSize: '18'
            },
            subtextStyle: {
                color: '#4E9ED8'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            // formatter: (data) => {
            //     console.log(data)
            // }
        },
        legend: {
            show: showlegend == 'warnChart' ? true : false,
            data: res.legend,
            top: '10%',
            orient: 'horizontal', // 'vertical'
            x: '91%', // 'center' | 'left' | {number},
            y: 'top', // 'center' | 'bottom' | {number}
            textStyle: {
                color: '#C1E5FF',
            },
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            top: '22%',
            containLabel: true
        },
        color: res.color,
        xAxis: [{
            type: 'category',
            data: res.xAxis,
            splitLine: {
                lineStyle: {
                    color: '#5170DA',
                    opacity: 0.1
                }
            },
            axisLabel: {  // X轴倾斜显示
                interval: 0,  
                rotate: 20 
            },
            axisLine: {
                lineStyle: {
                    color: '#5170DA',
                    opacity: 0.1
                }
            },
        }],
        
        yAxis: yAxis,
        series: series
    }
    // console.log(barData)
    setOption(targit, barData)
}
export function setOption(targit, optionData) {
    targit.setOption(optionData, true)
}
export function setXData(xAxisData, format) {
    let xAxis = []
    xAxisData.map(item => {
        xAxis.push(date.date(item).format(format))
    })
    return xAxis
}
