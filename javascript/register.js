window.addEventListener('load', function () {
    // 获取元素

    // 登录按钮
    let sign_in_btn = this.document.getElementsByClassName('btn sign-in-btn'),
        // 注册按钮
        sign_up_btn = this.document.getElementsByClassName('btn sign-up-btn'),
        // 登录用户名
        user_login_in = this.document.querySelector('.user-login-in'),
        // 登录密码
        password_login_in = this.document.querySelector('.password-login-in'),
        // 注册用户名
        user_login_up = this.document.querySelector('.user-login-up'),
        // 注册密码
        password_login_up = this.document.querySelector('.password-login-up'),
        // 登录注册表单
        form = this.document.querySelectorAll('.form'),
        // 点击切换注册或注册按钮按钮
        now = this.document.querySelectorAll('.now');
    // // 提示框 
    // let prompt_box = this.document.querySelector('.prompt-box');

    // 船
    let boat = this.document.querySelectorAll('.boat');
    let flag = this.document.querySelectorAll('.flag');
    boatMove(0);
    boatMove(1);
    function boatMove(index) {
        boat[index].addEventListener('click', function () {
            flag[index].classList.add('active');
            form[index].classList.add('active');
        });
    }

    now[0].addEventListener('click', function () {
        setTimeout(function () {
            boat[0].classList.add('leave');
            form[0].classList.remove('active');
            boat[1].classList.remove('leave');
            boat[1].classList.add('come');
        }, 500);
    })
    now[1].addEventListener('click', function () {
        setTimeout(function () {
            boat[1].classList.add('leave');
            form[1].classList.remove('active');
            boat[0].classList.remove('leave');
            boat[0].classList.add('come');
        }, 500);
    })


    // 正则表达式匹配
    const customizePattern = /^[a-zA-Z0-9_-]{4,16}$/; // 用户名4到16位 支持字母,数字,下划线,美元符号
    const passwordPattern = /^[a-zA-Z0-9_-]{4,12}$/; // 密码4到12位 支持字母 数字 下划线 美元符号

    // 用户注册行为
    sign_up_btn[0].addEventListener('click', function () {
        axios({
            url: 'http://localhost:8080/etsif/user/register.do',
            method: 'post',
            data: {
                username: user_login_up.value,
                password: password_login_up.value
            }
        }).then(response => {
            if (response.flag) {
                $(this).message(response.message, 'success');
            }
            else {
                $(this).message(response.message, 'error');
            }
        })
    })
    // 用户登录行为
    sign_in_btn[0].addEventListener('click', function () {
        axios({
            url: 'http://localhost:8080/etsif/user/login.do',
            method: 'post',
            data: {
                username: user_login_in.value,
                password: password_login_in.value
            }
        }).then(response => {
            if (response.flag) {
                $(this).message(response.message, 'success');
            }
            else {
                $(this).message(response.message, 'error');
            }
        })
    })

})