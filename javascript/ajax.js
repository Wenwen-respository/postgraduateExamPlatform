// 封装ajax函数
function ajax(options) {
    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    // 配置ajax对象
    xhr.open(options.type, options.url);
    // 发送请求
    xhr.send();
    // 当xhr对象接收完响应数据后触发
    xhr.onload = function () {
        options.success(xhr.responseText);
    }
}
ajax({
    // 请求方式
    type: 'get',
    // 请求地址
    url: 'http://localhost:30000/first',
    // 客户端要向服务端传递的数据
    data: {
        name: 'zhangsan',
        age: 20
    },
    // 请求成功时调用
    success: function (data) {
        console.log(data);
    }
})

/*

*/