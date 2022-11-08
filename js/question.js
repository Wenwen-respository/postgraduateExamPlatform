window.addEventListener('load', function () {

    // 如果是用户id的话
    // const userId = getUrlParam('pid');
    // const customizeUl = document.querySelector('.customize>ul');
    // let html = ' <li class="addCustomize">\n' +
    //     '                                    <input type="file" name="filename" multiple="multiple" />\n' +
    //     '                                    <span>+</span>\n' +
    //     '                                </li>';
    // if (userId != null) {
    //     // 说明可以发送请求获取表情包进行操作
    //     axios({
    //         url: 'http://localhost:8080/etsif/customize/queryCustomizesByPid.do',
    //         method: 'get',
    //         params: {
    //             pId: userId
    //         }
    //     }).then(res => {
    //         if (res.flag) {
    //             customizeUl.innerHTML = '';
    //             if (res.data == null || res.data.length === 0) { }
    //             else {
    //                 for (let i = 0; i < res.data.length; i++) {
    //                     let temp = ' <li><img src="' + res.data[i].url + '" alt="not"></li>';
    //                     customizeUl.innerHTML += temp;
    //                     customizeUl.querySelector("li:last-child").addEventListener('click', function () {
    //                         // 当点击的时候执行操作
    //                         let src = this.querySelector('img').src;
    //                         addCustomizeInPassage(src);
    //                     })
    //                 }
    //             }
    //             customizeUl.innerHTML += html;

    //             document.querySelector('.addCustomize span').addEventListener('click', function () {
    //                 let fInput = document.querySelector('.addCustomize input[type="file"]');
    //                 fInput.click();
    //             })
    //         }
    //         else {
    //             if ("用户已经下线" === res.message) window.location.href = 'register.html';
    //             console.log(res.message);
    //         }
    //     })
    // }

    // 海浪刷新
    let langhuas = this.document.querySelectorAll('.langhua');
    // 点击海浪，先弹出提示框
    let langhua_warning = this.document.querySelector('.langhua-warning');
    let yes = this.document.querySelector('.langhua-warning .yes');
    let no = this.document.querySelector('.langhua-warning .no');
    langhuas[0].addEventListener('click', function (e) {
        e.stopPropagation();
        langhua_warning.style.display = 'block';
    })
    // 点击“是”，海浪冲刷
    yes.addEventListener('click', function (e) {
        e.stopPropagation();
        langhua_warning.style.display = 'none';
        for (let i = 0; i < langhuas.length; i++) {
            langhuas[i].classList.add('active');
        }
        setTimeout(function () {
            for (let i = 0; i < langhuas.length; i++) {
                langhuas[i].classList.remove('active');
            }
        }, 4000);
    })
    // 点击“否”，海浪不冲刷
    no.addEventListener('click', function (e) {
        e.stopPropagation();
        langhua_warning.style.display = 'none';
    })

    // 点击其他地方，提示框也会消失
    document.body.onclick = function () {
        langhua_warning.style.display = 'none';
    }
    // 贝壳问题相关元素
    let beikes = this.document.querySelectorAll('.beike'),
        beike_hiddenBox = this.document.querySelector('.beike-hiddenBox'),
        beike_hiddenBox_question = this.document.querySelector('.beike-hiddenBox .question'),
        close_beike = this.document.querySelector('.close-beike');
    // beikes.forEach(beike => {
    //     beike.addEventListener('click', (e) => {
    //         [].filter.call(beike.parentElement.children, e => e !== beike).forEach(el => el.classList.remove('active'));
    //         beike.classList.add('active');
    //         e.stopPropagation();
    //     });
    // });
    // 点击贝壳，贝壳问题框出现
    for (let i = 0; i < beikes.length; i++) {
        beikes[i].addEventListener('click', function (e) {
            e.stopPropagation();
            beike_hiddenBox.className = 'beike-hiddenBox active';
        })
    }
    // 点击关闭按钮，贝壳问题框关闭
    close_beike.addEventListener('click', function (e) {
        e.stopPropagation();
        // 淡出的方式:先添加一个透明度1到0的动画,再消失
        if (beike_hiddenBox.className == 'beike-hiddenBox active') {
            beike_hiddenBox.className = 'beike-hiddenBox active passive';
            setTimeout(function () {
                beike_hiddenBox.className = 'beike-hiddenBox';
            }, 500);
        }
    })
    // 点击页面其他地方，贝壳问题框消失
    console.log(beike_hiddenBox);
    this.document.body.addEventListener('click', function () {
        if (beike_hiddenBox.className == 'beike-hiddenBox active') {
            beike_hiddenBox.className = 'beike-hiddenBox active passive';
            setTimeout(function () {
                beike_hiddenBox.className = 'beike-hiddenBox';
            }, 500);
        }
    })
    beike_hiddenBox.addEventListener('click', function (e) {
        e.stopPropagation();
    })

    // 点击标题，跳转到问题详情页 
    beike_hiddenBox_question.addEventListener('click', function () {
        window.open("answer.html?qId=" + this.getAttribute("qid"));
    })
    // 点击评论，也是跳转到问题详情页
    let comment_btn = this.document.querySelectorAll('.comment');
    for (let i = 0; i < comment_btn.length; i++) {
        comment_btn[i].onclick = function (e) {
            e.stopPropagation();
            window.open("answer.html?qId=" + this.getAttribute("qid"));
        }
    }
    // 点击贝壳的隐藏框，跳转到回答详情页
    // for (let i = 0; i < beike_hiddenBox.length; i++) {
    //     beike_hiddenBox[i].addEventListener('click', function () {
    //         window.open("answer.html?qId=" + this.getAttribute("qid"));
    //     })
    // }

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
    // console.log(like_btn);
    // 我的问题模块(石头)
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
        my_question_backdrop.className = 'my-question-backdrop active passive';
        my_question_box.className = 'my-question-box active passive';
        setTimeout(function () {
            my_question_backdrop.className = 'my-question-backdrop';
            my_question_box.className = 'my-question-box';
        }, 500);
    })
    my_question.addEventListener('click', function () {
        my_question_backdrop.className = 'my-question-backdrop active';
        my_question_box.className = 'my-question-box active';
    })


    // 点击螃蟹，回到首页
    let back_index = this.document.querySelector('.back-index');
    back_index.addEventListener('click', function () {
        setTimeout(function () {
            window.open('./index.html');
        }, 500);
        console.log(back_index);
    })

    // 搜索提问，点击表单，弹出关键词相关问题
    let search_box = this.document.querySelector('.search-box');
    let search_input = document.querySelector('.search-box .search-input');
    let search_btn = document.querySelector('.search-btn');
    let search_link = document.querySelector('.search-link');
    let search_find = this.document.querySelector('.search-find');
    let search_question = this.document.querySelector('.search-question');
    search_input.addEventListener('focus', function () {
        if (search_input.value != null)
            search_link.style.display = 'block';
    })
    search_input.addEventListener('blur', function () {
        search_link.style.display = 'none';
    })
    // 搜索提问，输入关键词，点击搜索后会在下面弹出题目中带有改关键词的简略问题
    search_btn.addEventListener('click', function () {
        search_box.style.paddingTop = '30px';
        search_find.style.display = 'none';
        search_question.style.display = 'block';
        search_link.style.top = '90px';
    })
    // 点击搜索出来的问题的标题，可跳转到问题详情页
    let question_item = this.document.querySelectorAll('.question-item .question');
    for (let i = 0; i < question_item.length; i++) {
        question_item[i].addEventListener('click', function () {
            window.open('./answer.html');
        })
    }
})
// 绑定一个函数进行操作 进行表情包的添加操作
function addCustomizeInPassage(url) {
    let rBody = document.querySelector('.questionBody');
    let html = '<img class="qCustomize" src="' + url + '" alt="not">';
    let lDiv = rBody.querySelector("div:last-child");
    if (lDiv == null) return;
    lDiv.innerHTML += html;
}