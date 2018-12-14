// import echarts from 'echarts'
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
                    formatter: item.formatter,
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
    // console.log('yAxis', yAxis)

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
    // console.log('setOption', setOption)
    // setOption(myChartLine, setOption)
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
            formatter: item.formatter
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
            y: 'center',
            textStyle: {
                // fontWeight: 'normal',
                color: '#fff',
                fontSize: '20',
                top: '13%'
            },
            subtextStyle: {
                fontWeight: 'normal',
                color: '#fff',
                top: '-5%'
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
            startAngle: -135,
            radius: ['35%', '50%'],
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
                    barWidth: '40%',
                    barGap: index > 1 ? '-100%' : '2%',
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
                    barWidth: '40%',
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
export function setLineData(targit, res, type) {
    // console.log('series res', res)
    let series = setOptionData(res, type)
    // console.log('series', series)
    let lineData = {
        title: {
            text: res.title,
            top: '5%',
            left: '5%',
            textStyle: {
                color: '#fff',
                fontWeight: 'normal',
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
            bottom: '2%',
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
            top: '22%',
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
        yAxis: {
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
            axisTick: {
                show: false
            },
        },
        series: series
    }
    setOption(targit, lineData)
}
// dashboard中的y轴处理
export function setyAxis(data) {
    // console.log('11111', data)
    let yAxis = []
    data.map(item => {
        let newItem = {
            'type': 'value',
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
    return yAxis
}
export function setBarData(targit, res, type) {
    let series = setOptionData(res, type)
    // console.log('33333333333', setyAxis(res.yAxis))
    let yAxis = setyAxis(res.yAxis)
    let showlegend = targit._dom.id // 项目异常情况legend参数
    // console.log('targit', targit._dom.id)
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
            x: '85%', // 'center' | 'left' | {number},
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
            bottom: '5%',
            top: '20%',
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
