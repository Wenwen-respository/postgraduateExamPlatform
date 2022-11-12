const urlPrefix = 'http://localhost:8080/etsif/'
const addConstant = '<!-- 下面这一个是添加表情包的样式操作 -->\n' +
    '                                <li class="addCustomize">\n' +
    '                                    <input type="file" name="filename" multiple="multiple"/>\n' +
    '                                    <span>+</span>\n' +
    '                                </li>';
// questions.html的扩展js文件 包括前后端交互
// 1.提问的题目的字数检测
let qBox = document.querySelector('.my-question-box')
let tInput = document.querySelector('.questionHeader');
let realize = document.querySelector('#realize');
let reality = document.querySelector('#reality');
let submit = document.querySelector('.right button');
let addFlag = document.querySelector('.addCustomize span');
let fInput = document.querySelector('.addCustomize input[type="file"]');
let addIFlag = document.querySelector('.add span');
let fImageInput = document.querySelector('.add input');
let qBody = document.querySelector('.questionBody');
let filter1 = '.png';
let filter2 = '.jpg';
let filter3 = '.jpeg';
let array1 = [filter1, filter2, filter3];
let area = document.querySelector('.beike-area');
// let
tInput.maxlength = realize.innerHTML;
const pageCount = 5;
window.addEventListener('load',function() {

    const userId = getUrlParam('pid');
    if (userId == null) {
        // 说明是用户进行登录操作 如果不是用户进行登录操作的
    }
    else {
        // 说明是用户访问 首先会判断是否还在线中
        axios({
            url : urlPrefix + 'question/queryOther.do',
            method : 'get',
            params : {
                pid : userId,
                pageCount : pageCount
            }
        }).then(res => {
            if (res.flag) {
                let beikas = document.querySelectorAll('.beike');
                for (let i = 0;i < beikas.length;i ++) beikas[i].hidden = true; // 隐藏元素
                if (res.data == null || res.data.length === 0) {
                    return;
                }
                for (let i = 0;i < res.data.length;i ++) {
                    // 全部都进行隐藏操作
                    let beike = beikas[i];
                    let solution = res.data[i].solution == null ? '暂无解析' : res.data[i].solution;
                    beike.setAttribute('qId',res.data[i].id);
                    beike.querySelector('img').src = './images/beike' + (i + 1) + '.png';
                    beike.querySelector('.question').innerHTML = '<span class="tag">问题</span>' + res.data[i].title;
                    beike.querySelector('.question').setAttribute('qId',res.data[i].id);
                    beike.querySelector('.analysis').innerHTML = '<span class="tag">解析</span>' + solution;
                    beike.querySelector('.answer-area').hidden = true; // 隐藏元素
                    beike.hidden = false; // 显示元素
                }
            }
            else {
                if ("用户已经下线" === res.message) window.location.href = 'register.html';
                console.log(res.message);
            }
        })
    }
})
tInput.addEventListener('keyup', function (events) {
    let value = this.value;
    if (value.length >= 5) {
        // 改变颜色
        submit.style.backgroundColor = '#67c23a';
        submit.style.color = '#ffffff';

    }
    else {
        submit.style.backgroundColor = '#F0F0F0';
        submit.style.color = '#999999';
    }
    if (value.length > tInput.maxlength) {

    }
    else {
        reality.innerText = value.length;
    }
})

addFlag.style.cursor = 'pointer';
addFlag.addEventListener('click', function () {
    fInput.click();
})
addIFlag.addEventListener('click', function () {
    fImageInput.click();
})
// 添加事件 获得资源

fImageInput.addEventListener('change', function () {
    const userId = getUrlParam('pid');

    let qImage = document.querySelectorAll('.qImage');
    console.log(this.files);
    if (qImage != null && qImage.length === 1) {
        for (let i = 0; i < this.files.length; i++) {
            if (!isExist(this.files[i].name)) {
                console.log("仅支持jpg.jpeg,png格式文件");
                return;
            }
            // let url = getObjectURL(this.files[i]);
            saveImageInCache(this.files[i]).then(result => {
                let img = this.createElement('img');
                img.setAttribute('src', result);
                qImage[0].appendChild(img);
            })
        }
        return;
    } else if (qImage != null && qImage.length >= 1) {
        // 说明有多个 就默认放在最下面的那一个当中
        let qImageLast = qImage[qImage.length - 1];
        for (let i = 0; i < this.files.length; i++) {
            if (!isExist(this.files[i].name)) {
                console.log("仅支持jpg.jpeg,png格式文件");
                return;
            }
            //
            saveImageInCache(this.files[i]).then(result => {
                let img = this.createElement('img');
                img.setAttribute('src', result);
                qImageLast.appendChild(img);
            })
        }
        return;
    }
    let div = document.createElement("div");
    div.className = 'qImage';
    qBody.appendChild(div);
    for (let i = 0; i < this.files.length; i++) {
        if (!isExist(this.files[i].name)) {
            console.log("仅支持jpg.jpeg,png格式文件");
            return;
        }
        // let url = getObjectURL(this.files[i]);
        // let url = this.files[i].name;
        let uploadFile = this.files[i];
        let fileName = uploadFile.name;
        let fileType = fileName.substr(fileName.indexOf('.') + 1); // 文件的格式
        let formData = new FormData();
        formData.append('headerImg', new File([uploadFile], fileName, { type: "image/" + fileType }))

        saveImageInCache(this.files[i]).then(result => {
            let img = document.createElement('img');
            img.setAttribute("src", result);
            div.appendChild(img);
        })
    }
})
// 上传照片到缓存当中 如果用户删除一张照片的话 那么在用户提交的时候会进行删-除操作
async function saveImageInCache(obj) {
    if (obj == null) return;
    let uploadFile = obj;
    let fileName = obj.name;
    let fileType = fileName.substr(fileName.indexOf('.') + 1); // 文件的格式
    let formData = new FormData();
    formData.append('headerImg', new File([uploadFile], fileName, { type: "image/" + fileType }))
    let result = await axios({
        url: urlPrefix + '/customize/saveInCache.do?filename=' + fileName + '&pid=' + userId,
        method: 'post',
        data: formData
    }).then(res => {
        if (res.flag) {
            // 如果成功的话 那么这张照片就会返回一个值来进行添加操作
            return res.data;
        } else {
            return '';
        }
    });
    return result;
}

// 获得url地址
function getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL !== undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}


let isExist = function (target) {
    for (var i = 0; i < array1.length; i++) {
        if (target.includes(array1[i])) return true;
    }
    return false;
}

// 转换不同的工作页面
let customize = document.querySelector('.customize'); // 表情包工作区
let image = document.querySelector('.image'); // 图片工作区
let array = [customize, image];
let fSpan = document.querySelectorAll('.left span');
let fDiv = document.querySelector('.function');
let temp = null;
let customizeUl = document.querySelector('.customize>ul');
for (let i = 0; i < fSpan.length; i++) {
    fSpan[i].addEventListener('click', function () {
        let id = this.getAttribute('data-id');
        if (temp != null && temp === id) {
            fDiv.hidden = !fDiv.hidden;
            temp = null;
            return;
        }
        // 程序运行到这里
        fDiv.hidden = false;
        temp = id;
        for (let j = 0; j < array.length; j++) {
            array[j].hidden = true;
        }
        array[id].hidden = false;
    })
}
// 将表情包添加到数据库 由于这个时候未连接用户页面 所以使用的方式是测试方式 使用的id是zhangsan用户的
const userId = getUrlParam('pid');
document.querySelector('.addCustomize input[type="file"]').addEventListener('change', function () {
    if (this.files == null || this.files.length === 0) return;
    for (let i = 0; i < this.files.length; i++) {
        if (!isExist(this.files[i].name)) {
            // 这里需要发送消息
            console.log("暂不支持除jpg,jpeg,png之外的其他图片格式")
            return;
        }
        let uploadFile = this.files[i];
        let fileName = this.files[i].name;
        let fileType = fileName.substr(fileName.indexOf('.') + 1); // 文件的格式
        var formData = new FormData();
        formData.append('headerImg', new File([uploadFile], fileName, { type: "image/" + fileType }))
        axios({
            url: urlPrefix + '/customize/insert.do?filename=' + fileName + '&pid=' + userId,
            method: 'post',
            data: formData
        }).then(res => {
            if (res.flag) {
                // 如果是成功的话 那么返回的消息就是文件的名字 执行完毕值
                console.log("上传表情包成功")
                let html = '';
                for (let j = 0; j < res.data.length; j++) {
                    let temp = '<li><img src="' + res.data[j].url + '" alt=""></li>';
                    html += temp;
                }
                customizeUl.innerHTML = html + addConstant;
                console.log(html + addConstant);
                addFlag = document.querySelector('.addCustomize span');
                addFlag.addEventListener('click', function () {
                    fInput.click();
                })
            }
            else {
                console.log("文件上传失败")
            }
        })
    }
})

// 实现表情包添加到文章当中去
let cLis = customizeUl.querySelectorAll('li:not(li[class="addCustomize"])');
for (let i = 0; i < cLis.length; i++) {
    cLis[i].addEventListener('click', function () {
        let cImage = this.querySelector('img');
        let src = cImage.src; // 获取到src属性
        let html = '<img class="qCustomize" src="' + src + '" alt="">';
        let element = document.querySelector('.questionBody>div:last-child');
        if (element == null) {
            html = '<div><img class="qCustomize" src="' + src + '" alt=""></div>';
            qBody.innerHTML += html;
            return;
        }
        element.innerHTML += html;
    })
}
// 给提交按钮绑定事件
submit.addEventListener('click', function () {
    let title = tInput.value;
    if (title < 5) return;
    // 如果不是的话 那么会判断文章是否为空
    let content = qBody.innerHTML;
    if (content.length <= 25) {
        console.log("不满足问题最低发送要求");
        return;
    }
    let html = qBody.innerHTML;
    // 程序运行到这里 就说明已经都满足了 解析文本是否有元素节点
    let images = getImage(); // 获取图片信息
    // 程序首先需要跟缓存的图片进行对比 对比成功了之后才能插入数据
    if (images != null || images.length !== 0) {
        let str = '';
        for (let i = 0; i < images.length; i++) {
            str += "," + images[i];
        }
        str.substr(str.length - 1, str.length);
        axios({
            // 缓存比较阶段就会在数据库当中开辟一个新的记录
            url: urlPrefix + "customize/compareAndSet.do",
            method: 'post',
            data: {
                filenames: str,
                pid: userId
            }
        }).then(res => {
            if (res.flag) {
                // 成功了之后就再次发送请求 由于上一次请求是成功的 所以这个时候就直接执行添加操作就可以了 暂时不管这个东西了
                let qId = res.data;
                let title = tInput.value;
                axios({
                    url: urlPrefix + "customize/insertQuestion.do",
                    method: 'get',
                    params: {
                        content: html,
                        title: title,
                        qId: qId,
                        pid: userId
                    }
                }).then(res => {
                    if (res.flag) {
                        // 发布成功就会清空数据 就会跳到历史提问的那里 观察数据 可以进行修改操作等

                    }
                    else {
                        console.log(res.message);
                    }
                })
            }
            else {

            }
        })
    }
    else {
        axios({
            url: urlPrefix + "customize/insertQ.do",
            method: 'post',
            data: {
                title: tInput.value,
                content: html,
                pid: userId
            }
        }).then(res => {
            if (res.flag) {
                // 发布成功就会清空数据 就会跳到历史提问的那里 观察数据 可以进行修改操作等

            }
            else {
                console.log(res.message);
            }
        })
    }
})
function parseLegalString(html) {
    while (html.indexOf('"') !== -1) {
        html.replaceAll(/"/g,"'");
    }
    return html;
}
// 获得所有的图片信息 返回的是一个数组
function getImage() {
    let divs = qBody.querySelectorAll('.qImage'); // 获取到这一个
    if (divs == null || divs.length === 0) return null;
    // 程序运行到这里 就说明当中有qImage
    let result = [];
    // 遍历获取图片节点
    for (let i = 0; i < divs.length; i++) {
        let images = divs[i].querySelectorAll('img:not(img[class])'); // 获取图片节点信息
        if (images != null && images.length !== 0) {
            // 有可能会有多张照片信息
            for (let j = 0; j < images.length; j++) {
                result[result.length] = images[j].src;
            }
        }
    }
    return result.length === 0 ? null : result;
}

// 为点击贝壳出现评论绑定事件
let beikes = document.querySelectorAll('.beike');
for (let i = 0;i < beikes.length;i ++) {
    beikes[i].addEventListener('click',function() {
        let qId = this.getAttribute('qid'); // 获取问题的主键id值
        if (qId == null) return;
        axios({
            url : urlPrefix + 'question/queryComments.do',
            method : 'get',
            params : {
                qId : qId
            }
        }).then(res => {
            if (res.flag) {
                let area = this.querySelector('.answer-area'); // 获取贝壳区域
                area.innerHTML = '';
                if (res.data == null || res.data.length === 0) return;
                for (let i = 0; i < res.data.length; i ++) {
                    let compose = new Date(res.data[i].create).toLocaleDateString();
                    let html = '<div class="answer-box" cId="' + res.data[i].id + '">' +
                        '                                              <div class="top">' +
                        '                                                  <div class="avatar"><img src="' + res.data[i].headshot + '" alt=""></div>' +
                        '                                                  <div class="info">' +
                        '                                                      <div class="name">' + res.data[i].name + '</div>' +
                        '                                                      <div class="time">' + compose + '</div>' +
                        '                                                  </div>' +
                        '                                              </div>' +
                        '                                              <div class="middle">' + res.data[i].content + '</div>'  +
                        '                                               <div class="bottom"> ' +
                        '                                                   <span><i class="iconfont">&#xe8b0;</i>分享</span>' +
                        '                                                   <span><i class="iconfont">&#xe891;</i>评论</span>' +
                        '                                                   <span class="like"><i class="iconfont">&#xec7f;</i>点赞</span> ' +
                        '                                               </div>' +
                        '                                          </div>';
                    area.innerHTML += html;
                }
                area.hidden = false; // 显示元素
            }
            else {
                console.log(res.message);
            }
        })
    })
}

// 绑定海浪刷新事件 刷新海浪进行操作
const langhua = document.querySelector('.langhua1');
langhua.addEventListener('click',function() {
    // 进行ajax请求 重新部署页面进行操作
    // 说明是用户访问 首先会判断是否还在线中
    let i = 0;
    setTimeout(function() {
            clearTimeout();
            axios({
                url : urlPrefix + 'question/queryOther.do',
                method : 'get',
                params : {
                    pid : userId,
                    pageCount : pageCount
                }
            }).then(res => {
                if (res.flag) {
                    let beikas = document.querySelectorAll('.beike');
                    for (let i = 0;i < beikas.length;i ++) beikas[i].hidden = true; // 隐藏元素
                    if (res.data == null || res.data.length === 0) {
                        return;
                    }
                    for (let i = 0;i < res.data.length;i ++) {
                        // 全部都进行隐藏操作
                        let beike = beikas[i];
                        let solution = res.data[i].solution == null ? '暂无解析' : res.data[i].solution;
                        beike.setAttribute('qId',res.data[i].id);
                        beike.querySelector('img').src = './images/beike' + (i + 1) + '.png';
                        beike.querySelector('.question').innerHTML = '<span class="tag">问题</span>' + res.data[i].title;
                        beike.querySelector('.analysis').innerHTML = '<span class="tag">解析</span>' + solution;
                        beike.querySelector('.answer-area').hidden = true; // 隐藏元素
                        beike.hidden = false; // 显示元素
                    }
                }
                else {
                    if ("用户已经下线" === res.message) window.location.href = 'register.html';
                    console.log(res.message);
                }
            })
    },2500)
})

// 绑定用户历史提问的操作 这一个操作的执行时间在用户点击历史提问的时候
let historyDiv = document.querySelector('.header .right');
historyDiv.addEventListener('click',function() {
    const pid = getUrlParam('pid');
    if (pid == null) {
        console.log("请先登录");
        return;
    }
    axios({
        url : urlPrefix + 'question/historyByPid.do',
        method : 'get',
        params : {
            pId : pid
        }
    }).then(res => {
        if (res.flag){
            // 说明响应成功了
            console.log(res.data);
            let ul = document.querySelector('.history-content>ul');
            ul.innerHTML = ''; // 清空元素
            if (res.data == null || res.data.length === 0) {
                return;
            }
            for (let i = 0;i < res.data.length;i++) {
                let answer = res.data[i].comment >= 10000 ? (res.data[i].comment / 10000) + '万' : res.data[i].comment;
                let html = '  <li><a href="./answer.html?qId=' + res.data[i].id + '" target="_blank">' + res.data[i].title + '</a>\n' +
                    '                    <div class="answer-num right">' + answer +'个回答</div>\n' +
                    '                </li>';
                ul.innerHTML += html;
            }
        }
        else {
            if ('用户已经下线' === res.message) window.location.href = 'register.html';
        }
    })
})

// 为搜索框绑定时间进行操作
let searchButton =  document.querySelector('.search-box .right button');
let sInput = document.querySelector('.search-box .left input');
let myQuestionBox = document.querySelector('.my-question-box');
searchButton.addEventListener('click',function() {
    let value = sInput.value;
    if (value == null || value.length === '') return;
    // 如果程序运行到这里 那么就根据关键词进行搜索操作吧
    axios({
        url : urlPrefix + "question/queryByWord.do",
        method : 'get',
        params : {
            pid : getUrlParam('pid'),
            word : value,
            pageCount : pageCount,
        }
    }).then(res => {
        if (res.flag) {
            let beikas = document.querySelectorAll('.beike');
            for (let i = 0;i < beikas.length;i ++) beikas[i].hidden = true; // 隐藏元素
            if (res.data == null || res.data.length === 0) {
                return;
            }
            for (let i = 0;i < res.data.length;i ++) {
                // 全部都进行隐藏操作
                let beike = beikas[i];
                let solution = res.data[i].solution == null ? '暂无解析' : res.data[i].solution;
                beike.setAttribute('qId',res.data[i].id);
                beike.querySelector('img').src = './images/beike' + (i + 1) + '.png';
                beike.querySelector('.question').innerHTML = '<span class="tag">问题</span>' + res.data[i].title;
                beike.querySelector('.question').setAttribute('qId',res.data[i].id);
                beike.querySelector('.analysis').innerHTML = '<span class="tag">解析</span>' + solution;
                beike.querySelector('.answer-area').hidden = true; // 隐藏元素
                beike.hidden = false; // 显示元素
            }
            document.querySelector('.my-question-backdrop').style.display = 'none';
            document.querySelector('.my-question-box').style.display = 'none';
        }
        else {
            if ("用户已经下线" === res.message) window.location.href = 'register.html';
            console.log(res.message);
        }
    })
})