// 数组扁平化
export function traverse(arr) {
    let creatArr = [];
    Array.isArray(arr) && arr.forEach(item => {
        Array.isArray(item) ? traverse(item).forEach(v => {
                creatArr.push(v)
            }) :
            creatArr.push(item)
    })
    return creatArr
}