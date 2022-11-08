window.addEventListener('load', function () {
    // 添加去除active类
    function addActiveClass(object) {
        object.classList.add('active');
    }
    function removeActiveClass(object) {
        object.classList.remove('active');
    }
    // 取消双击选中
    this.window.addEventListener('dblclick', function () {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    })
    // 点击logo回到首页
    let logo = this.document.querySelector('.logo');
    logo.addEventListener('click', function () {
        window.open('./index.html', '_self');
    })
    // 点赞按钮
    let like_btn = this.document.querySelectorAll('.like');
    for (let i = 0; i < like_btn.length; i++) {
        like_btn[i].onclick = function () {
            if (like_btn[i].classList.contains('active')) {
                removeActiveClass(like_btn[i]);
            } else {
                addActiveClass(like_btn[i]);
            }
        }
    }
    console.log(like_btn);

    // 头部导航的搜索框
    let search_input = this.document.querySelector('.header-inner .search-input');
    let search_button = this.document.querySelector('.header-inner .search-button');
    search_input.addEventListener('focus', function () {
        addActiveClass(search_button);
    })
    search_input.addEventListener('blur', function () {
        removeActiveClass(search_button);
    })
    // 搜索相关
    let search_link = document.querySelector('.search-link');
    search_input.addEventListener('focus', function () {
        if (search_input.value != null)
            search_link.style.display = 'block';
    })
    search_input.addEventListener('blur', function () {
        search_link.style.display = 'none';
    })
    // search_button.addEventListener('click', function (e) {
    //     e.stopPropagation();
    // })
    // console.log(search_button);
    // 问题展示部分
    // 提问者的信息
    // 关注按钮
    let attention_user = this.document.querySelector('.attention-user');
    attention_user.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            removeActiveClass(this);
            this.innerHTML = '+ 关注';
        } else {
            addActiveClass(this);
            this.innerHTML = '已关注';
        }
    })



    // 问题点赞按钮
    let question_like = this.document.querySelector('.question-title .like');
    console.log(question_like);
    question_like.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            addActiveClass(this);

        } else {
            removeActiveClass(this);
        }
    })

    // 点击评论，展开评论
    let comment_btn = this.document.querySelectorAll('.comment-btn');
    let answer_display_li = this.document.querySelectorAll('.answer-display ul li');
    for (let i = 0; i < comment_btn.length; i++) {

        comment_btn[i].addEventListener('click', function () {
            if (answer_display_li[i].style.height == 'auto') {
                answer_display_li[i].style.height = '189px';
            }
            else {
                answer_display_li[i].style.height = 'auto';
            }
        })
    }
    //我的评论，评论框点击伸长
    let my_comment = this.document.querySelectorAll('.my-comment');
    let my_comment_div = this.document.querySelectorAll('.my-comment-div');
    console.log(my_comment_div);
    for (let i = 0; i < my_comment_div.length; i++) {
        my_comment[i].addEventListener('click', function (e) {
            e.stopPropagation();
            my_comment[i].style.height = '100px';
        })
        // my_comment_input[i].addEventListener('blur', function () {
        //     my_comment[i].style.height = '49px';
        // })
    }
    // 点击其他地方，评论框收缩
    this.document.body.addEventListener('click', function () {
        for (let i = 0; i < my_comment_div.length; i++) {
            my_comment[i].style.height = '49px';
        }
    })
    // 写回答
    let reply = this.document.querySelector('.question-title .reply');
    let edit_answer = this.document.querySelector('.edit-answer');
    reply.addEventListener('click', function () {
        if (edit_answer.style.display == 'block') {
            edit_answer.style.display = 'none';
        } else {
            edit_answer.style.display = 'block';
        }
    })

    // 在问题详情页，点击搜索按钮，出现搜索的问题，问题详情和回答消失
    let question_wraper = this.document.querySelector('.question-wraper');
    let answer_display = this.document.querySelector('.answer-display');
    let answer_search_question = this.document.querySelector('.answer-search-question');
    console.log(answer_search_question);
    search_button.addEventListener('click', function () {
        question_wraper.style.display = 'none';
        answer_display.style.display = 'none';
        answer_search_question.style.display = 'block';
    })

    // 点击发起提问按钮，弹出编辑问题的框
    let start_ask = this.document.querySelector('.start-ask');
    let start_ask_box_wraper = this.document.querySelector('.start-ask-box-wraper');
    let start_ask_box_close = document.querySelector('.start-ask-box-close');
    let header_inner = this.document.querySelector('.header-inner');
    let start_ask_box_ask = this.document.querySelector('.start-ask-box-ask');
    start_ask.addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        header_inner.style.position = 'static';
        addActiveClass(start_ask_box_wraper);
        addActiveClass(start_ask_box_ask);
    })
    start_ask_box_close.addEventListener('click', function () {
        document.body.style.overflow = 'auto';
        start_ask_box_wraper.className = 'start-ask-box-wraper active passive';
        start_ask_box_ask.className = 'start-ask-box-ask active passive';
        setTimeout(function () {
            start_ask_box_wraper.className = 'start-ask-box-wraper';
            start_ask_box_ask.className = 'start-ask-box-ask';
            header_inner.style.position = 'fixed';
        }, 800);
    })

    // 点击侧边工具栏的表情
    let expression = this.document.querySelector('.expression');
    console.log(expression);
    let expression_box = this.document.querySelector('.expression-box');
    expression.addEventListener('click', function () {
        if (expression_box.style.display == 'block') {
            expression_box.style.display = 'none';
        } else {
            expression_box.style.display = 'block';
        }
    })
})