// 处理option中的数据
export function initLineChart(myChartLine1, option) {
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
    // console.log('yAxis', yAxis)

    // 处理series
    let series = new Array
    if (option.series && option.series.length) {
        for (let i = 0; i < option.series.length; i++) {
            const item =  option.series[i]
            // console.log('item.color', item.color)
            let seriesItem = new Object
            seriesItem = {
                name: item.title,
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

    // console.log('options series', option.title, option.legend, option.xAxis, yAxis, series)
    // console.log('options series x', option.xAxis)

    let setOptionCpu = {
        title: { 
            text: option.title,
            textStyle: {
                fontSize: 14
            }},
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
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
    
    myChartLine1.setOption(setOptionCpu)
}
// 初始化echart
export function initchart(myChartLine1, setOption) {
    myChartLine1.setOption(setOption)
}