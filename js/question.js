window.addEventListener('load', function () {
    // 贝壳问题相关元素
    let beikes = this.document.querySelectorAll('.beike'),
        beike_hiddenBox = this.document.querySelectorAll('.beike-hiddenBox .question'),
        closes = this.document.querySelectorAll('.close-beike');
    console.log(closes);
    beikes.forEach(beike => {
        beike.addEventListener('click', (e) => {
            [].filter.call(beike.parentElement.children, e => e !== beike).forEach(el => el.classList.remove('active'));
            beike.classList.add('active');
            e.stopPropagation();
        });
    });
    for (let i = 0; i < beikes.length; i++) {
        closes[i].addEventListener('click', function (e) {
            e.stopPropagation();
            beikes[i].classList.remove('active');
            // console.log('close被点击');
        })
    }
    // 点击页面其他地方，贝壳问题框消失
    document.body.onclick = function () {
        for (let i = 0; i < beikes.length; i++) {
            beikes[i].classList.remove('active');
        }
    }

    // 点击贝壳的隐藏框，跳转到回答详情页
    for (let i = 0; i < beike_hiddenBox.length; i++) {
        beike_hiddenBox[i].addEventListener('click', function () {
            window.open('../answer.html');
        })
    }





    // 我的问题模块
    let navs = this.document.querySelector('.my-question-box').querySelectorAll('.nav'),
        // content_now = this.document.querySelector('.now-content'),
        // content_history = this.document.querySelector('.history-content'),
        contents = this.document.querySelector('.my-question-box').querySelectorAll('.content'),
        close_question = this.document.querySelector('.close-question'),
        my_question_backdrop = this.document.querySelector('.my-question-backdrop'),
        my_question_box = this.document.querySelector('.my-question-box'),
        my_question = this.document.querySelector('.my-question');
    // navs.forEach(nav => {
    //     nav.addEventListener('click', () => {
    //         [].filter.call(nav.parentElement.children, e => e !== nav).forEach(el => el.classList.remove('active'));
    //         nav.classList.add('active');
    //     });
    // })
    for (let i = 0; i < navs.length; i++) {
        navs[i].addEventListener('click', function () {
            for (let i = 0; i < navs.length; i++) {
                navs[i].classList.remove('active');
                contents[i].classList.remove('active');
            }
            navs[i].classList.add('active');
            contents[i].classList.add('active');
        })
    }

    close_question.addEventListener('click', function () {
        my_question_backdrop.style.display = 'none';
        my_question_box.style.display = 'none';
    })
    my_question.addEventListener('click', function () {
        my_question_backdrop.style.display = 'block';
        my_question_box.style.display = 'block';
    })
    // 海浪刷新
    let langhuas = this.document.querySelectorAll('.langhua');
    langhuas[0].addEventListener('click', function () {
        for (let i = 0; i < langhuas.length; i++) {
            langhuas[i].classList.add('active');
        }
        setTimeout(function () {
            for (let i = 0; i < langhuas.length; i++) {
                langhuas[i].classList.remove('active');
            }
        }, 4000);
    })

    // 点赞按钮
    let like_btn = this.document.querySelectorAll('.like');
    for (let i = 0; i < like_btn.length; i++) {
        like_btn[i].onclick = function (e) {
            e.stopPropagation();
            if (like_btn[i].classList.contains('active')) {
                like_btn[i].classList.remove('active');
            } else {
                like_btn[i].classList.add('active');
            }

        }
    }
    console.log(like_btn);

    // 点击螃蟹，回到首页
    let back_index = this.document.querySelector('.back-index');
    back_index.addEventListener('click', function () {
        setTimeout(function () {
            window.open('../index.html');
        }, 500);
        console.log(back_index);
    })
})