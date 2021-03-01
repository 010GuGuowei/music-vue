// 添加class名
export function addClass(el,className) {
    el.classList.add(className)
}

// 检查class名是否存在
export function hasClass(el ,className) {
    // 如果存在返回true 不存在返回false
    return el.classList.contains(className)
}


// 获取和设置属性名称
export function getData(el ,name , val) {
    let prefix = 'data-' + name
    // 如果 val 存在,就是设置
    if(val){
        return el.setAttribute(prefix)
    }else {     // 不存在则是获取
        return el.getAttribute(prefix)
    }
}