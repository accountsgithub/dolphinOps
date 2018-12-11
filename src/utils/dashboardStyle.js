
export function setTitleNum(num) {
    if (num != '0' && num != null) {
        let numArr = num.toString().split('')
        let addNum = 5 - numArr.length
        if (addNum > 0) { // numArr长度小于5，补齐0
            for (let i = 0; i < addNum; i++) {
                numArr.splice(0, 0, '0')
            }
        } else {
            // console.log(addNum, '长度长于5，可能需要特殊处理')
        }
        return numArr
    } else {
        return ['0', '0', '0', '0', '0']
    }
}