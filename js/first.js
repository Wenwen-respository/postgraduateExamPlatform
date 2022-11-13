// 点击侧边导航栏，点哪亮哪
let nav_item = document.querySelectorAll('.sidebar-nav .nav-item');
for (let i = 0; i < nav_item.length; i++) {
    nav_item[i].addEventListener('click', function () {
        //排他思想
        for (let i = 0; i < nav_item.length; i++) {
            nav_item[i].classList.remove('active');
        }
        this.classList.add('active');
    })
}

// 右边点击切换模块
let panel = document.querySelectorAll('.panel');

for (let i = 0; i < nav_item.length - 1; i++) {
    nav_item[i].addEventListener('click', function () {
        window.scrollTo({
            top: panel[i].offsetTop,
            behavior: "smooth"
        })
        console.log(window.pageYOffset);

    })

}
// 最后一个回到顶部按钮单独
nav_item[nav_item.length - 1].addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
//滚动事件
// let img_box = document.querySelector('.project-introduction .img-box');
document.addEventListener('scroll', function () {
    // console.log(window.pageYOffset);
    if (window.pageYOffset > panel[0].offsetTop && window.pageYOffset < panel[1].offsetTop) {
        //排他思想
        for (let i = 0; i < nav_item.length; i++) {
            nav_item[i].classList.remove('active');
        }
        nav_item[0].classList.add('active');
    }
    else if (window.pageYOffset > panel[1].offsetTop && window.pageYOffset < panel[2].offsetTop) {
        for (let i = 0; i < nav_item.length; i++) {
            nav_item[i].classList.remove('active');
        }
        nav_item[1].classList.add('active');
    }
    else if (window.pageYOffset > panel[2].offsetTop && window.pageYOffset < panel[3].offsetTop) {
        for (let i = 0; i < nav_item.length; i++) {
            nav_item[i].classList.remove('active');
        }
        nav_item[2].classList.add('active');
    }
    else if (window.pageYOffset > panel[3].offsetTop && window.pageYOffset < panel[4].offsetTop) {
        for (let i = 0; i < nav_item.length; i++) {
            nav_item[i].classList.remove('active');
        }
        nav_item[3].classList.add('active');
    }
    else if (window.pageYOffset > panel[4].offsetTop) {
        for (let i = 0; i < nav_item.length; i++) {
            nav_item[i].classList.remove('active');
        }
        nav_item[4].classList.add('active');
    }
})


// var num = 0;
// var flag = true;
// window.addEventListener('mousewheel', function (e) {
//     console.log(e.wheelDelta); // 上滚150，下滚-150
//     if (flag == true) {
//         flag = false;
//         if (e.wheelDelta < 0) {
//             if (num < 4) {
//                 num++;
//                 display(num, function () {
//                     flag = true;
//                 });
//             } else {
//                 num = 4;
//             }
//         }
//         if (e.wheelDelta > 0) {
//             if (num > 0) {
//                 num--;
//                 display(num, function () {
//                     flag = true;
//                 });
//             } else {
//                 num = 0;
//             }
//         }
//         console.log(num);
//     }

// })

// 封装函数，哪个模块显示在视窗
// function display(num, callback) {
//     window.scrollTo({
//         top: panel[num].offsetTop,
//         behavior: "smooth"
//     })
//     callback();
//     console.log(window.pageYOffset);
// }













// home-page模块的focus-box的轮播效果
let ul = document.querySelector('.home-page .focus-box ul');
let lis = document.querySelectorAll('.home-page .focus-box ul li');

// 克隆ul中的第一个li，放在最后面
let first = ul.children[0].cloneNode(true);//完全克隆
ul.append(first);
console.log(ul);
// 左右按钮
let left_btn = document.querySelector('.home-page .focus-box-wraper .left-btn');
let right_btn = document.querySelector('.home-page .focus-box-wraper .right-btn');
let focus_box = document.querySelector('.home-page .focus-box');
let focusWidth = focus_box.offsetWidth;

var num = 0;
// 右按钮
// flag 节流阀
var flag = true;
right_btn.addEventListener('click', function () {
    if (flag) {
        flag = false;// 关闭节流阀
        if (num == ul.children.length - 1) {
            ul.style.left = "0";
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, function () {
            flag = true;// 打开节流阀
        });
        //无缝滚动原理:克隆ul中的第一个li，放在最后面,当滚到这最后一张时，将ul的left改为0
    }
})
// 左按钮
// flag 节流阀
left_btn.addEventListener('click', function () {
    if (flag) {
        flag = false;
        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * focusWidth + "px";
        }
        num--;
        animate(ul, -num * focusWidth, function () {
            flag = true;
        });
    }
})

// 自动播放轮播图
var timer = setInterval(function () {
    right_btn.click();//手动调用点击事件
}, 5000);
// 实现鼠标进入轮播图, 关闭定时器
focus_box.addEventListener('mouseenter', function () {
    clearInterval(timer);
    timer = null;//清除定时器变量
})
focus_box.addEventListener('mouseleave', function () {
    timer = setInterval(function () {
        right_btn.click();//手动调用点击事件
    }, 5000);
})




// discuss-room模块的focus-box的轮播效果
let ul2 = document.querySelector('.discuss-room .focus-box ul');
let lis2 = document.querySelectorAll('.discuss-room .focus-box ul li');

// 克隆ul中的第一个li，放在最后面
let first2 = ul2.children[0].cloneNode(true);//完全克隆
ul2.append(first2);
// 左右按钮
let left_btn2 = document.querySelector('.discuss-room .focus-box-wraper .left-btn');
let right_btn2 = document.querySelector('.discuss-room .focus-box-wraper .right-btn');
let focus_box2 = document.querySelector('.discuss-room .focus-box');
let focusWidth2 = focus_box2.offsetWidth;

var num2 = 0;
// 右按钮
// flag 节流阀
var flag = true;
right_btn2.addEventListener('click', function () {
    if (flag) {
        flag = false;// 关闭节流阀
        if (num2 == ul2.children.length - 1) {
            ul2.style.left = "0";
            num2 = 0;
        }
        num2++;
        animate(ul2, -num2 * focusWidth2, function () {
            flag = true;// 打开节流阀
        });
        //无缝滚动原理:克隆ul中的第一个li，放在最后面,当滚到这最后一张时，将ul的left改为0
    }
})
// 左按钮
// flag 节流阀
left_btn2.addEventListener('click', function () {
    if (flag) {
        flag = false;
        if (num2 == 0) {
            num2 = ul2.children.length - 1
            ul2.style.left = -num2 * focusWidth2 + "px";
        }
        num2--;
        animate(ul2, -num2 * focusWidth2, function () {
            flag = true;
        });
    }
})

// 自动播放轮播图
var timer2 = setInterval(function () {
    right_btn2.click();//手动调用点击事件
}, 5000);
// 实现鼠标进入轮播图, 关闭定时器
focus_box2.addEventListener('mouseenter', function () {
    clearInterval(timer2);
    timer2 = null;//清除定时器变量
})
focus_box2.addEventListener('mouseleave', function () {
    timer2 = setInterval(function () {
        right_btn2.click();//手动调用点击事件
    }, 5000);
})




// small-room模块的focus-box的轮播效果
let ul3 = document.querySelector('.small-room .focus-box ul');
let lis3 = document.querySelectorAll('.small-room .focus-box ul li');

// 克隆ul中的第一个li，放在最后面
let first3 = ul3.children[0].cloneNode(true);//完全克隆
ul3.append(first3);
// 左右按钮
let left_btn3 = document.querySelector('.small-room .focus-box-wraper .left-btn');
let right_btn3 = document.querySelector('.small-room .focus-box-wraper .right-btn');
let focus_box3 = document.querySelector('.small-room .focus-box');
let focusWidth3 = focus_box3.offsetWidth;

var num3 = 0;
// 右按钮
// flag 节流阀
var flag = true;
right_btn3.addEventListener('click', function () {
    if (flag) {
        flag = false;// 关闭节流阀
        if (num3 == ul3.children.length - 1) {
            ul3.style.left = "0";
            num3 = 0;
        }
        num3++;
        animate(ul3, -num3 * focusWidth3, function () {
            flag = true;// 打开节流阀
        });
        //无缝滚动原理:克隆ul中的第一个li，放在最后面,当滚到这最后一张时，将ul的left改为0
    }
})
// 左按钮
// flag 节流阀
left_btn3.addEventListener('click', function () {
    if (flag) {
        flag = false;
        if (num3 == 0) {
            num3 = ul3.children.length - 1
            ul3.style.left = -num3 * focusWidth3 + "px";
        }
        num3--;
        animate(ul3, -num3 * focusWidth3, function () {
            flag = true;
        });
    }
})

// 自动播放轮播图
var timer3 = setInterval(function () {
    right_btn3.click();//手动调用点击事件
}, 5000);
// 实现鼠标进入轮播图, 关闭定时器
focus_box3.addEventListener('mouseenter', function () {
    clearInterval(timer3);
    timer3 = null;//清除定时器变量
})
focus_box3.addEventListener('mouseleave', function () {
    timer3 = setInterval(function () {
        right_btn3.click();//手动调用点击事件
    }, 5000);
})




// question-room模块的focus-box的轮播效果
let ul4 = document.querySelector('.question-room .focus-box ul');
let lis4 = document.querySelectorAll('.question-room .focus-box ul li');

// 克隆ul中的第一个li，放在最后面
let first4 = ul4.children[0].cloneNode(true);//完全克隆
ul4.append(first4);
// 左右按钮
let left_btn4 = document.querySelector('.question-room .focus-box-wraper .left-btn');
let right_btn4 = document.querySelector('.question-room .focus-box-wraper .right-btn');
let focus_box4 = document.querySelector('.question-room .focus-box');
let focusWidth4 = focus_box4.offsetWidth;

var num4 = 0;
// 右按钮
// flag 节流阀
var flag = true;
right_btn4.addEventListener('click', function () {
    if (flag) {
        flag = false;// 关闭节流阀
        if (num4 == ul4.children.length - 1) {
            ul4.style.left = "0";
            num4 = 0;
        }
        num4++;
        animate(ul4, -num4 * focusWidth4, function () {
            flag = true;// 打开节流阀
        });
        //无缝滚动原理:克隆ul中的第一个li，放在最后面,当滚到这最后一张时，将ul的left改为0
    }
})
// 左按钮
// flag 节流阀
left_btn4.addEventListener('click', function () {
    if (flag) {
        flag = false;
        if (num4 == 0) {
            num4 = ul4.children.length - 1
            ul4.style.left = -num4 * focusWidth4 + "px";
        }
        num4--;
        animate(ul4, -num4 * focusWidth4, function () {
            flag = true;
        });
    }
})

// 自动播放轮播图
// var timer4 = setInterval(function () {
//     right_btn4.click();//手动调用点击事件
// }, 5000);
// // 实现鼠标进入轮播图, 关闭定时器
// focus_box4.addEventListener('mouseenter', function () {
//     clearInterval(timer4);
//     timer4 = null;//清除定时器变量
// })
// focus_box4.addEventListener('mouseleave', function () {
//     timer4 = setInterval(function () {
//         right_btn4.click();//手动调用点击事件
//     }, 5000);
// })















// animate函数
function animate(obj, target, callback) {
    // console.log(callback);  callback = function() {}  调用的时候 callback()

    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // if (callback) {
            //     // 调用函数
            //     callback();
            // }
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);
}