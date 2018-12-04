// 处理option中的数据
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

    let setOption = {
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
    
    myChartLine.setOption(setOption, true)
}
// 处理series
export function setChartData(seriesData) {
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