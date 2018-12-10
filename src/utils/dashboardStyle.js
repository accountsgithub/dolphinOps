export function setBorder(targit) {
    console.log(targit)
    let html = `<div class="angle angleA"></div>
                <div class="angle angleB"></div>
                <div class="angle angleC"></div>
                <div class="angle angleD"></div>`
    targit.insertBefore(html)
}
export function setTitleNum(num) {
    // return num.toString().split('')
    console.log(typeof(num))
    console.log(num)
    if (num != '0' && num != null) {
        return num.toString().split('')
    } else {
        return ['0']
    }
}