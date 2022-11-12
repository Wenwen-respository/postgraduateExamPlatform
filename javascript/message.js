// 关于内容管理页面的详细资料操作
// 发送消息的组件
var body = $(' body'); // 主体结构
var hiddenSignal;
var standard = 70; // 标准单位
// 设置弹框的定时器
function setTimer(obj, target, className) {
    var i = 0;
    var timer = setInterval(function () {
        if (i === 0) {
            animate1(obj, 0); // 返回
            $(obj).css('opacity', '0'); // 返回的距离
            if ($(className).length === 1) {
                setTimeout(function () {
                    $(obj).removeClass(className);
                }, 50);
            }
            else {
                hiddenSignal = $(className); // 拿取数据
                setTimeout(function () {
                    $(obj).removeClass(className);
                    // 都需要对之前的操作一次才可以
                    for (var j = 0; j < hiddenSignal.length - 1; j++) {
                        animate1(hiddenSignal[j + 1], 30 + j * standard);
                    }
                }, 50);
            }
        }
        if (i === 1) {
            $(obj).remove(); // 移除元素
            clearInterval(timer); // 清除定时器
        }
        i += 1;
    }, 1000);
    return timer;
}
// 发送消息函数
$.fn.message = function (message, type) {
    var html1;
    var correct = '' +
        ' <div class="hidden">\n' +
        '            <i class="iconfont icon-chenggong"></i>\n' +
        '            <input type="text" value="' + message + '" readonly>\n' +
        '        </div>\n';
    var error = '' +
        ' <div class="hidden1">\n' +
        '            <i class="iconfont icon-cuowu"></i>\n' +
        '            <input type="text" value="' + message + '" readonly>\n' +
        '        </div>\n';
    html1 = type === 'success' ? correct : error;
    var className = type === 'success' ? '.hidden' : '.hidden1'; // 选择类名
    if ($(className).length === 0) {
        // 如果为零的话,那么就是第一个添加的,就只是需要将其添加到第一行就可以了
        body.append(html1); // 添加元素
        hiddenSignal = $(className); // 更新数据
        hiddenSignal.css('opacity', '0.6');
        animate1(hiddenSignal[0], 50); // 移动的距离
        setTimer(hiddenSignal[0], 0, className); // 设置定时器
    }
    else {
        // 如果不为零的话,那么就先前已经有了几个了,所以就需要重新计算
        var count = $(className).length; // 获取长度
        // 之前有了一个的话,那么就需要在前一个再次以为
        var html2 = '' +
            ' <div class="' + (type === 'success' ? 'hidden' : 'hidden1') + '" style="top: ' + (30 + (count - 1) * standard) + '">\n' +
            '            <i class="iconfont ' + (type === 'success' ? 'icon-chenggong' : 'icon-cuowu') + '"></i>\n' +
            '            <input type="text" value="' + message + '" readonly>\n' +
            '        </div>\n';
        body.append(html2); // 添加元素
        hiddenSignal = $(className);

        count = hiddenSignal.length; // 更新数据
        $(hiddenSignal[count - 1]).css('opacity', '0.6'); // 显示可见
        animate1(hiddenSignal[count - 1], (30 + (count - 1) * standard)); // 使用操作
        setTimer(hiddenSignal[count - 1], count - 1, className); // 设置定时器
    }
}