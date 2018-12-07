// 基础监控--处理option中的数据
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
                    show: false
                },
                axisLabel: {
                    formatter: item.formatter
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
            // console.log('item.color', item.color)
            let seriesItem = new Object
            seriesItem = {
                name: option.legend[i],
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
            textStyle: {
                fontSize: 14
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
            bottom: '5%',
            top: '30%',
            containLabel: true
        },
        legend: {
            show: true,
            top: '10%',
            data: option.legend
        },
        xAxis: {
            type: 'category',
            boundaryGap: true, // 坐标轴两边留白
            splitLine: { // 网格线 x轴对应的是否显示
                show: false
            },
            axisLabel: {
                // formatter: (value, index) => {
                //     console.log(value, index)
                //     // var date = new Date(value);
                //     // var texts = [date.getHours(), date.getMinutes(), date.getSeconds()];
                //     // return texts.join(':');
                // }  
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
        seriesItem.yAxisIndex = item.position
        seriesItem.data = item.data
        // console.log('item.color', index, colors[index], seriesItem)
        series.push(seriesItem)
    })
    // console.log('series series', series.length)
    return series
}
// dashboard页面仪表盘处理option中数据
export function setgaugeData(targit, res) {
    let optionData = {
        title: {
            text: '内存使用情况',
            top: '7%',
            left: 'center',
            color: '#fff',
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
                        [res / 100, '#2a8eff'],
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
                offsetCenter: [0, '5%'],
                color: '#fff',
            },
            data: [{
                name: 'CPU已使用',
                value: res
            }]
        }]
    }
    setOption(targit, optionData)
}
// dashboard页面仪表盘处理option中数据
export function setPieData(targit, res) {
    let pieData = {
        title: {
            text: `${res.value}%`,
            subtext: `${res.name}使用情况`,
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#fff',
                fontSize: '20',
                top: '10%'
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
            top: '5%',
            textStyle: {
                color: '#C1E5FF',
                
            },
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
        },

        series: [{
            name: '内存使用情况',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
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
                color: '#ffe858',
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
                    // formatter: item.formatter,
                    data: item.data
                }
                series.push(seriesItem)
            })
        } else if (option.series && option.series.length > 1) {
            // console.log('option.legend', option.legend, option.series)
            option.series.map((item, index) => {
                let seriesItem = new Object
                seriesItem = {
                    name: option.legend[index],
                    type: type,
                    barWidth: '20%',
                    barGap: '-100%',
                    // formatter: item.formatter,
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
    console.log('series res', res)
    let series = setOptionData(res, type)
    console.log('series', series)
    let lineData = {
        title: {
            text: res.title,
            top: '3%',
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
            }
        },
        color: ['#C0A54D', '#6553D2', '#2a8eff', '#86d258'],
        legend: {
            data: res.legend,
            top: '10%',
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
            bottom: '5%',
            top: '20%',
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
                lineStyle: {
                    color: '#5170DA',
                    opacity: 0.1
                }
            },
        },
        series: series
    }
    setOption(targit, lineData)
}
export function setBarData(targit, res, type) {
    let series = setOptionData(res, type)
    let showlegend = targit._dom.id // 项目异常情况legend参数
    // console.log('targit', targit._dom.id)
    let barData = {
        title: {
            text: res.title,
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
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
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
        yAxis: [{
            type: 'value',
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
        series: series
    }
    console.log(barData)
    setOption(targit, barData)
}
export function setOption(targit, optionData) {
    targit.setOption(optionData, true)
}
