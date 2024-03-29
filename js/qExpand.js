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
// let
tInput.maxlength = realize.innerHTML;

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
const userId = '1665204142358941414';
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
    if (images == null || images.length === 0) {
        let str = '';
        for (let i = 0; i < images.length; i++) {
            str += ":" + images[i];
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
                // 成功了之后就再次发送请求 由于上一次请求是成功的 所以这个时候就直接执行添加操作就可以了
                let qId = res.data;
                let title = tInput.value;
                axios({
                    url: urlPrefix + "customize/insertQuestion.do",
                    method: 'post',
                    data: {
                        title: title,
                        qId: qId,
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
                result[result.length] = images[i].src;
            }
        }
    }
    return result.length === 0 ? null : result;
}

// 控制贝壳的随机分布 由于外部盒子已经有了相对定位了 所以只需要移动里面的位置就可以了

// async function randomLocation() {
//     let beikas = document.querySelectorAll('.beike-area>div');
//     let area = document.querySelector('.beike-area');
//     const oWidth = area.offsetWidth;
//     const oHeight = area.offsetHeight;
//     console.log(oWidth +":" + oHeight)
//     let arrayX = []
//     let arrayY = []
//     for (let i = 0;i < beikas.length;i ++) {
//         let x = 0;
//         let y = 0;
//         while (true) {
//             await generateX(oWidth).then(result => {
//                 console.log(x);
//                 x = result;
//             });
//             let flag = true;
//             await isConflictX(x,arrayX).then((result) => flag = result);
//             if (!flag) {
//                 while (true) {
//                     await generateY(oHeight).then(result => {
//                         y = result;
//                     });
//                     await isConflictY(y,arrayY).then((result) => flag = result);
//                     if (!flag) break;
//                 }
//                 break;
//             }
//         }
//         let left = x - 100 < 0 ? 0 : (x - 100);
//         let top = y - 100 < 0 ? 0 : (y - 100);
//         beikas[i].style.left = left + 'px';
//         beikas[i].style.top = top + 'px';
//         arrayX[arrayX.length] = left;
//         arrayY[arrayY.length] = top;
//     }
// }
// // 判断是否冲突
// async function isConflict(x,y,obj,obj1) {
//     let flag = isConflictX(x,obj);
//     let flag1 = isConflictY(y,obj1);
//     return flag && flag1;
// }
// async function isConflictX(t,obj) {
//     if (t == null && obj.length === 0) return true;
//     if (t != null && obj.length === 0) return false;
//     // if (t == null) return true;
//     let count = 0;
//     for (let i = 0; i < obj.length; i++) {
//         if (Math.abs(t - obj[i]) < 100) count++;
//     }
//     return count !== 0;
// }
// async function isConflictY(y,obj) {
//     if (y == null && obj.length === 0) return true;
//     if (y != null && obj.length === 0) return false;
//     // if (y == null) return true;
//     let count = 0;
//     for (let i = 0; i < obj.length; i++) {
//         let sub = Math.abs(y - obj[i]);
//         console.log(sub);
//         if (Math.abs(y - obj[i]) < 100) count++;
//     }
//     return count !== 0;
// }
// // 随机生成x
// async function generateX(oWidth) {
//     let result = null;
//     while (true) {
//         let temp = Math.floor(Math.random() * 700);
//         if (temp < 0 || temp > oWidth) continue;
//         result = temp;
//         break;

//     }
//     return result;
// }
// // 随机生成y元素
// async function generateY(oHeight) {
//     let result = null;
//     while (true) {
//         let temp = Math.floor(Math.random() * 400);
//         if (temp < 0 || temp > oHeight) continue;
//         result = temp;
//         break;
//     }
//     return result;
// }
// let sweat = document.querySelector('.langhua1');
// sweat.addEventListener('click',function() {
//     setTimeout(function () {
//         randomLocation();
//     },4 * 1000)
// })