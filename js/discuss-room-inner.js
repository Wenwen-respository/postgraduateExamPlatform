window.addEventListener('load', function () {
    // 点击关闭讨论界面
    let discuss_close = this.document.querySelectorAll('.discuss-close');
    // 两个界面
    let discuss_interface = this.document.querySelectorAll('.discuss-interface');
    let group_chat = this.document.querySelector('.group-chat');
    let private_chat = this.document.querySelector('.private-chat');

    for (let i = 0; i < discuss_close.length; i++) {
        discuss_close[i].addEventListener('click', function () {
            for (let i = 0; i < discuss_interface.length; i++) {
                discuss_interface[i].classList.add('active');
            }
        })
    }

    // 点击群聊按钮和私聊按钮，切换模式
    let group_chat_button = this.document.querySelectorAll('.group-chat-button');
    let private_chat_button = this.document.querySelectorAll('.private-chat-button');
    for (let i = 0; i < group_chat_button.length; i++) {
        group_chat_button[i].addEventListener('click', function () {
            group_chat.style.display = 'block';
            private_chat.style.display = 'none';
        })
    }
    for (let i = 0; i < private_chat_button.length; i++) {
        private_chat_button[i].addEventListener('click', function () {
            private_chat.style.display = 'block';
            group_chat.style.display = 'none';
        })
    }
    // group_chat_button
    console.log(group_chat_button);
    console.log(private_chat_button);
    // 点击右上角回到讨论页
    let start_discuss = this.document.querySelector('.start-discuss');
    start_discuss.addEventListener('click', function () {
        for (let i = 0; i < discuss_interface.length; i++) {
            if (discuss_interface[i].classList.contains('active')) {
                discuss_interface[i].classList.remove('active');
            }
        }
    })

    // 点击按钮返回讨论房首页
    let return_button = this.document.querySelector('.return-button');
    return_button.addEventListener('click', function () {
        setTimeout(function () {
            window.open('./index.html');
        }, 500);
    })

    // 让对话区域滚动条保持滚动到最下
    let dialogue = this.document.querySelectorAll('.dialogue');
    // console.log(dialogue);
    for (let i = 0; i < dialogue.length; i++) {
        dialogue[i].scrollTop = dialogue[i].scrollHeight;
    }
    // 鼠标放在人身上的时候会浮现它的信息
    let info = this.document.querySelectorAll('.info');
    let info_dotted = this.document.querySelectorAll('.info-dotted');
    for (let i = 0; i < info.length; i++) {
        // info_dotted[i].addEventListener('mouseenter', function (e) {
        //     e.stopPropagation();
        //     info_dotted[i].children[0].style.animationName = 'appear';
        //     info_dotted[i].children[0].style.animationDuration = '1s';
        //     info_dotted[i].children[0].style.opacity = '1';
        //     info_dotted[i].children[0].style.display = 'block';
        // })
        // info_dotted[i].addEventListener('mouseleave', function (e) {
        //     e.stopPropagation();
        //     info_dotted[i].children[0].style.animationName = 'disappear';
        //     info_dotted[i].children[0].style.animationDuration = '1s';
        //     info_dotted[i].children[0].style.opacity = '0';
        //     info_dotted[i].children[0].style.display = 'none';
        // })
        info_dotted[i].addEventListener('click', function (e) {
            e.stopPropagation();
            info_dotted[i].children[0].style.animationName = 'appear';
            info_dotted[i].children[0].style.animationDuration = '1s';
            info_dotted[i].children[0].style.opacity = '1';
            info_dotted[i].children[0].style.display = 'block';
        })
        this.document.body.addEventListener('click', function (e) {
            e.stopPropagation();
            info_dotted[i].children[0].style.animationName = 'disappear';
            info_dotted[i].children[0].style.animationDuration = '1s';
            info_dotted[i].children[0].style.opacity = '0';
            info_dotted[i].children[0].style.display = 'none';
        })
    }

    // 点击私信跳转到私聊
    let private_letter = this.document.querySelectorAll('.private-letter');
    for (let i = 0; i < private_letter.length; i++) {
        private_letter[i].addEventListener('click', function () {
            setTimeout(function () {
                info_dotted[i].children[0].style.animationName = 'disappear';
                info_dotted[i].children[0].style.animationDuration = '1s';
                info_dotted[i].children[0].style.opacity = '0';
                info_dotted[i].children[0].style.display = 'none';
            }, 100);
            // 自动出现讨论界面
            for (let i = 0; i < discuss_interface.length; i++) {
                if (discuss_interface[i].classList.contains('active')) {
                    discuss_interface[i].classList.remove('active');
                }
            }
            // 自动点击私聊
            for (let i = 0; i < private_chat_button.length; i++) {
                private_chat_button[i].click();
            }
        })
    }

    // 发送私聊信息
    let bottom_input = this.document.querySelectorAll('.bottom-input');
    let bottom_send = this.document.querySelectorAll('.bottom-send');
    console.log(bottom_send);
    bottom_send[1].addEventListener('click', function (e) {
        e.stopPropagation();
        if (bottom_input[1].value) {
            let speak_right = document.createElement('div');
            speak_right.className = 'speak-right speak';
            let avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.innerHTML = `<img src="./images/user.png" alt="">`;
            speak_right.append(avatar);
            let clearfix1 = document.createElement('div');
            clearfix1.className = 'clearfix';
            clearfix1.innerHTML = `<div class="name">易研为定</div>`;
            speak_right.append(clearfix1);
            let clearfix2 = document.createElement('div');
            clearfix2.className = 'clearfix';
            let remark = document.createElement('div');
            remark.className = 'remark';
            remark.innerHTML = bottom_input[1].value;
            clearfix2.append(remark);
            speak_right.append(clearfix2);
            console.log(speak_right);
            dialogue[1].append(speak_right);
            dialogue[1].scrollTop = dialogue[1].scrollHeight;
        }

    })
    this.window.addEventListener('keydown', function (e) {
        if (e.keyCode == "13") {
            bottom_send[1].click();
        }
        bottom_input[1].value = '';
    })

    // 发送群聊信息
    bottom_send[0].addEventListener('click', function (e) {
        e.stopPropagation();
        if (bottom_input[0].value) {
            let speak_right = document.createElement('div');
            speak_right.className = 'speak-right speak';
            let avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.innerHTML = `<img src="./images/user.png" alt="">`;
            speak_right.append(avatar);
            let clearfix1 = document.createElement('div');
            clearfix1.className = 'clearfix';
            clearfix1.innerHTML = `<div class="name">易研为定</div>`;
            speak_right.append(clearfix1);
            let clearfix2 = document.createElement('div');
            clearfix2.className = 'clearfix';
            let remark = document.createElement('div');
            remark.className = 'remark';
            remark.innerHTML = bottom_input[0].value;
            clearfix2.append(remark);
            speak_right.append(clearfix2);
            console.log(speak_right);
            dialogue[0].append(speak_right);
            dialogue[0].scrollTop = dialogue[0].scrollHeight;
        }
    })
    this.window.addEventListener('keydown', function (e) {
        if (e.keyCode == "13") {
            bottom_send[0].click();
        }
        bottom_input[0].value = '';
    })
})