// 简单接口封装函数
function ajax(type, url) {
    return new Promise((resolve, reject) => {
        // 1.创建对象
        let xhr = new XMLHttpRequest();
        // 2.初始化
        xhr.open(type, url);
        // 3.发送
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response));
                }
                else {
                    reject(xhr.response);
                }
            }
        }
    })
}
