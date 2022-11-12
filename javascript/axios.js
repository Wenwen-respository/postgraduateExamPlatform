// 原生js封装的ajax函数
// 自己用原生JS封装ajax请求函数
// axios中的参数会传入一个对象
// 对象里有url、method、params、data，可以通过解构赋值的方式直接写到参数内
// 且给method赋上默认值为get，这样即便不写method:'get'也是可以的
function axios({ url, method = 'get', params, data,isApplicationJson = false}) {
    // 返回Promise对象
    return new Promise(function (resolve, reject) {
        try {
            let xhr = new XMLHttpRequest()
            // 判断是否有params对象，且params对象中是否有参数，如果有参数需要拼接字符串，没有则不拼接
            // Object.keys().length可以判断对象中是否有数据，length为0则表示没有数据，而0转成布尔值是false
            if (params && Object.keys(params).length) {
                // 处理params拼接
                let query = []
                for (let key in params) {
                    query.push(`${key}=${params[key]}`)
                }
                xhr.open(method, url + '?' + query.join('&'))
            } else {
                xhr.open(method, url)
            }
            // 监听ajax返回的数据结构
            xhr.addEventListener('load', function () {
                // 当数据有响应时，会得到返回的数据
                // xhr.response得到的是json字符串
                resolve(JSON.parse(xhr.response))
            })
            // 处理请求体参数
            // 如果请求类型不是get且data对象中有数据
            if (method.toLowerCase() !== 'get' && data) {
                // 1.判断data是不是FormData类型  用instanceof
                if (data instanceof FormData) {
                    xhr.send(data)
                    return;
                }
                if (isApplicationJson) {
                    xhr.setRequestHeader('Content-Type', 'application/json')
                    xhr.send(JSON.stringify(data))
                    return;
                }
                // 2.判断data是不是x/www- 字符串类型
                if (typeof data === 'string') {
                    // 设置请求头类型为application/x-www-form-urlencoded类型
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xhr.send(data)
                    return
                }

                // 3.判断data是不是json格式
                if (data instanceof Object) {
                    // 设置请求头类型为application/json类型
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xhr.send(JSON.stringify(data))
                    return
                }

            }
            // 发送ajax请求
            xhr.send()
        } catch (err) {
            reject(err)
        }
    })
}
