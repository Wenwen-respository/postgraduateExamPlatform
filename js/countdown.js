window.addEventListener('load', function () {
    function countTime() {
        //获取当前时间  
        var date = new Date();
        var now = date.getTime();
        //设置截止时间  
        var str = "2022/12/24 08:30:00";
        var endDate = new Date(str);
        var end = endDate.getTime();

        //时间差  
        var leftTime = end - now;
        //定义变量 d,h,m,s保存倒计时的时间  
        var d, h, m, s;
        if (leftTime >= 0) {
            d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
            h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
            m = Math.floor(leftTime / 1000 / 60 % 60);
            s = Math.floor(leftTime / 1000 % 60);
        }
        //将倒计时赋值到div中  
        document.querySelector('.d').innerHTML = d;
        document.querySelector('.h').innerHTML = h;
        document.querySelector('.m').innerHTML = m;
        document.querySelector('.s').innerHTML = s;
        //递归每秒调用countTime方法，显示动态时间效果  
        setTimeout(countTime, 1000);
    }
    countTime();
})