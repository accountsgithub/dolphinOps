import echarts from 'echarts'
// 处理option中的数据
export function initLineChart(chartId, option) {
    // cpuChart初始化数据
    console.log('option', option)
    
    // 处理Y轴
    let yAxis = new Array
    if (option.yAxis && option.yAxis.length) {
        for (let i = 0; i < option.yAxis.length; i++) {
            const item = option.yAxis[i];
            let yAxisItem = new Object
            yAxisItem = {
                name: item.name,
                splitLine: {    // 网格线 y轴对应的是否显示
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
    console.log('yAxis', yAxis)

    // 处理series
    let series = new Array
    if (option.series && option.series.length) {
        for (let i = 0; i < option.series.length; i++) {
            const item =  option.series[i]
            let seriesItem = new Object
            seriesItem = {
                name: item.title,
                type: 'line',
                yAxisIndex: item.yAxisIndex,
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

    console.log('options series', series)
    let setOptionCpu = {
        title: { 
            text: option.title,
            textStyle: {
                fontSize: 14
            }},
        tooltip: {
            // trigger: 'axis',
            // axisPointer: { // 坐标轴指示器，坐标轴触发有效
            //     type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            // }
        },
        legend: {
            data: option.legend
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,          // 坐标轴两边留白
            splitLine: {                // 网格线 x轴对应的是否显示
                show: false
            },
            data: option.xAxis
        },
        yAxis: yAxis,
        series: series
    }
    
    initchart(chartId, setOptionCpu)
}
// 初始化echart
export function initchart(chartId, setOption) {
    let myChartLine1 = echarts.init(chartId)
    myChartLine1.setOption(setOption)
}