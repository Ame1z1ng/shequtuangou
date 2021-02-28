// 设置cookie函数 第一个值为属性，第二个为属性值，第三个是过期时间，（当前时间多少秒后）第三个可以不写
function setCookie(key, value, expires) {
    // 判断是否有过期时间，也就是有没有expires这个值
    if (expires) {
        let date = new Date();
        let d = date.getTime() - 8 * 60 * 60 * 1000;
        d = d + expires * 1000;

        date.setTime(d);
        document.cookie = `${key}=${value};path=/;expires=${date};`;
        console.log(1);
        return
    }
    document.cookie = `${key}=${value};`
}

function getCookie(key) {
    // 获取cookie
    let cookie = document.cookie;
    // 将cookie从分号加空格'; '分割，因为cookie之间是用分号加空格分隔开的
    let str = cookie.split('; ');
    let obj = {};
    // 将每个cookie从等号分隔开
    str.forEach((item) => {
        obj[item.split('=')[0]] = item.split('=')[1];
    })
    // 如果存在key值，就返回key和它的属性值，否则就返回所有cookie


    if (key) {
        for (let i in obj) {
            if (i == key) {
                return obj[i]
            }

        }
        return false
    }
    return str
}