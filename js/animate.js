
// 左右走
function animate(obj, target) {
    //清除目标对象上的所有定时器
    clearInterval(obj.timer);
    //获取移动的距离
    //表示是后退行动
    //设置定时器
    obj.timer = setInterval(function () {
        var distanceTarget = target - obj.offsetLeft; //
        //如果为负数
        if (distanceTarget === 0) clearInterval(obj.timer);
        //获取移动距离(缓动动画的算法:目标值 - 当前对象的距离 / 10 就是移动的步长)
        //如果为负数,将left的值减一定的值
        if (distanceTarget < 0) {
            var distance = Math.ceil((obj.offsetLeft - target) / 10);
            //往后走
            obj.style.left = obj.offsetLeft - distance + 'px';
        }
        //如果为整数,将left的值减去一定的值
        else {
            var distance = Math.ceil((target - obj.offsetLeft) / 10);
            //往后走
            obj.style.left = obj.offsetLeft + distance + 'px';
        }

    }, 10);

}
// 上下走
function animate1(obj, target) {
    //清除目标对象上的所有定时器
    clearInterval(obj.timer);
    //获取移动的距离
    //表示是后退行动
    //设置定时器
    obj.timer = setInterval(function () {
        var distanceTarget = target - obj.offsetTop; //
        //如果为负数
        if (distanceTarget === 0) clearInterval(obj.timer);
        //获取移动距离(缓动动画的算法:目标值 - 当前对象的距离 / 10 就是移动的步长)
        //如果为负数,将left的值减一定的值
        if (distanceTarget < 0) {
            var distance = Math.ceil((obj.offsetTop - target) / 10);
            //往后走
            obj.style.top = obj.offsetTop - distance + 'px';
        }
        //如果为整数,将left的值减去一定的值
        else {
            var distance = Math.ceil((target - obj.offsetTop) / 10);
            //往后走
            obj.style.top = obj.offsetTop + distance + 'px';
        }

    }, 10);

}