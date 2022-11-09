window.addEventListener('load', function () {
    // 便签部分 待做、文件
    let note = document.querySelector('.note');
    const note_ul = document.querySelector('.note ul');
    // var index;
    // 上传文件函数
    function up(files) {
        for (let i = 0; i < files.length; i++) {
            // 将上传的音乐名添加到列表
            // console.log(files[i].type);
            var size;
            if (files[i].size >= 1000000) {
                // MB表示大小
                size = files[i].size / 1000000 + 'MB';
                // console.log(files[i].size / 1000000 + 'MB');
            } else {
                // KB表示大小
                size = files[i].size / 1000 + 'KB';
                // console.log(files[i].size / 1000 + 'KB');
            }
            var suffix = files[i].name.substring(files[i].name.lastIndexOf(".") + 1)
            console.log(suffix);
            if (suffix == 'doc' || suffix == 'docx') {
                img_name = "&#xe68f;";
            }
            else if (suffix == 'txt') {
                img_name = "&#xe686;";
            }
            else if (suffix == 'pptx' || suffix == 'ppt') {
                img_name = "&#xe680;";
            }
            else if (suffix == 'pdf') {
                img_name = "&#xe684;";
            }
            else if (suffix == 'png' || suffix == 'jpg') {
                img_name = "&#xe6a1;";
            }
            else if (suffix == 'xls' || suffix == 'xlsx') {
                img_name = "&#xe605;";
            }
            if (suffix == 'doc' || suffix == 'docx' || suffix == 'pptx' || suffix == 'ppt' || suffix == 'pdf' || suffix == 'png' || suffix == 'jpg' || suffix == 'xls' || suffix == 'xlsx' || suffix == 'txt') {
                if (files[i].size < 5000000) {
                    // 将拖拽的内容的名字、大小类型添加进盒子
                    let file_li = document.createElement('li');
                    // file_li.innerHTML=files[i].name;
                    file_li.innerHTML = "<i class='iconfont'>" + img_name + "</i><span class='note-title'>" + files[i].name + "</span><br/><span class='note-size'>" + size + "</span><i class='iconfont delete-icon'>&#xe606;</i><i class='iconfont preview-icon'>&#xe660;</i>"
                    note_ul.appendChild(file_li);
                }
                else {
                    console.log("陛下的的文件过大 本庙有点小 容不下");
                }
            } else {
                console.log("陛下的的文件z容不下")
            }
        }
        var a=document.querySelectorAll('.note ul li .delete-icon').length;
        for(let i=0;i<a;i++){
        // console.log(a);
            document.querySelectorAll('.note ul li .delete-icon')[i].index=i;
        }
        return a;
    }

    // 拖拽上传
    // dragover 拖拽进入目标区域后触发
    document.addEventListener('dragover', function (e) {
        e.preventDefault();
    })
    // 阻止drop的默认行为 drop拖拽完成后，释放鼠标时触发
    // 触发该事件时，需要在先dragover事件阻止默认事件，不然drop事件不会触发 
    // 如果从外部（本地）拖拽图片等文件，需要阻止默认行为，不然浏览器默认会打开
    document.addEventListener('drop', function (e) {
        e.preventDefault();
    })
    note.addEventListener('dragover', function (e) {
        e.preventDefault();
    });
    var Is=false;
    note.addEventListener('drop', function (e) {
        // DataTransfer 对象用于保存拖动并放下（drag and drop）过程中的数据
        // console.log(e.dataTransfer);
        // DataTransfer.files  包含数据传输中可用的所有本地文件的列表
        var note_list = e.dataTransfer.files;
        var c=up(note_list);
        console.log(c);
        Is=true;
        if(Is){
            // 有上传文件的删除
            console.log(Is);
            for(let i=0;i<c;i++){
                console.log(c);
                // document.querySelectorAll('.note ul li .delete-icon')[i].index=i;
                document.querySelectorAll('.delete-icon')[i].addEventListener('click',function(e){
                console.log(e.target);
                console.log(this.index);
                
                  // 最近删除
                  let delete_li = document.createElement('li');
                  console.log(document.querySelectorAll('.note ul li')[this.index].innerHTML);
                  delete_li.innerHTML = document.querySelectorAll('.note ul li')[this.index].innerHTML;
                 document.querySelector(".delete-history ul").appendChild(delete_li);

                document.querySelector('.note ul').removeChild(document.querySelectorAll('.note ul li')[this.index]);
                    for(let i=0;i<document.querySelectorAll('.note ul li .delete-icon').length;i++){
                        document.getElementsByClassName('delete-icon')[i].index=i;
                    }
                })
                }
        }
    })

    // 点击上传文件
    const file_up = document.querySelector("#file-up");
    var delete_history=document.querySelector('.delete-history ul');
    file_up.addEventListener('change', function (e) {
        // 获取上传的文件集合
        var files = e.target.files;
        console.log("files: ", files);
        // up(files);
        var b=up(files);
        console.log(b);
        Is=true;
        if(Is){
            // 有上传文件的删除
            console.log(Is);
            for(let i=0;i<b;i++){
                console.log(b);
                document.querySelectorAll('.delete-icon')[i].index=i;
                document.querySelectorAll('.delete-icon')[i].addEventListener('click',function(e){
                    e.stopPropagation();
                    // 最近删除
                    let delete_li = document.createElement('li');
                    console.log(document.querySelectorAll('.note ul li')[this.index].innerHTML);
                    delete_li.innerHTML = document.querySelectorAll('.note ul li')[this.index].innerHTML;
                   document.querySelector(".delete-history ul").appendChild(delete_li);

                document.querySelector('.note ul').removeChild(document.querySelectorAll('.note ul li')[this.index]);
                for(let i=0;i<document.querySelectorAll('.note ul li .delete-icon').length;i++){
                    document.getElementsByClassName('delete-icon')[i].index=i;
                }
               
                })
                }
        }
        // console.log(Is);
    })

        // 没有上传时候的删除
            var  delete_icon=document.querySelectorAll('.delete-icon');
            var note_li=document.querySelectorAll('.note ul li');
            // console.log(Is);
            for(let i=0;i<document.querySelectorAll('.delete-icon').length;i++){
                // console.log("aa");
                delete_icon[i].index=i;
                delete_icon[i].addEventListener('click',function(){
                    // 若放在前面会立即执行 index 点击事件也都会执行
                 if(Is==false){
                    console.log("co");
                    console.log(this.index);
                    // 最近删除
                        let delete_li = document.createElement('li');
                        console.log(document.querySelectorAll('.note ul li')[this.index].innerHTML);
                        delete_li.innerHTML = document.querySelectorAll('.note ul li')[this.index].innerHTML;
                       document.querySelector(".delete-history ul").appendChild(delete_li);
                         note_ul.removeChild(document.querySelectorAll('.note ul li')[this.index]);
                    // 改变绑定的index
                    for(let i=0;i<document.querySelectorAll('.note ul li .delete-icon').length;i++){
                        document.querySelectorAll('.delete-icon')[i].index=i;
                        }
                       
            }
                })
        }
            
        // 删除历史记录
        const deleteHistory = document.querySelector(".history-icon_two");
        const deleteHis=document.querySelector('.delete-history');
        
        deleteHistory.addEventListener('click',function(e){
                e.stopPropagation();
                // 出现和消失
                if (deleteHis.style.display == "block") {
                    deleteHis.style.display = "none";
                }
                else {
                    deleteHis.style.display = "block";
                }
            })
            document.addEventListener('click', function () {
                deleteHis.style.display = "none";
            })
            deleteHis.addEventListener('click', function (e) {
                e.stopPropagation();
            })
    




    // 待完成部分
    var undo = document.querySelector('.undo');
    var undo_ul = document.querySelector('.undo ul');
    var do_top = document.querySelector('.undo .do-top');
    var undo_li_all = document.querySelectorAll('.undo ul li');
    var undo_li = document.querySelectorAll('.undo ul li .do-content');
    var unfa=false;
    // 点击添加icon 添加待做
    const add_icon_one = document.querySelectorAll('.add-icon-one');
    const history_icon = document.querySelectorAll('.history-icon');
    for(let i=0;i<add_icon_one.length;i++){
        add_icon_one[i].addEventListener('click', function () {
            console.log(add_icon_one[i]);
                const undo_add_li = document.createElement('li');
                let uncontent = "添加事项...";
                undo_add_li.innerHTML = "<span class='do-circle'></span><span class='do-content' contenteditable='true'>" + uncontent + "</span>"
                 //  待做内容添加
                 undo_add_li.style.color = "#aaa";
                 undo_add_li.style.fontSize = "14px";
                 let do_content=document.querySelector('.do-content');
                     undo_add_li.addEventListener('keydown', function () {
                         // console.log("ff");
                         if(do_content.innerHTML==""){
                         // console.log("dd");
                             undo_add_li.style.color = "#333";
                             undo_add_li.style.fontSize = "16px";
                         }
                     })
                if (undo_li_all.length > 0) {
                    //第一个参数是要插入的元素，第二个参数是在最前面插入
                    undo_ul.insertBefore(undo_add_li, document.querySelectorAll('.undo ul li')[0]);
                } else {
                    undo_ul.appendChild(undo_add_li);
                }
                // f();
            })
    }
   


    // 改变索引
    function g(){
        for(let i=0;i<document.querySelectorAll('.undo ul li ').length;i++){
            // console.log(document.querySelectorAll('.undo ul li ').length);
            document.querySelectorAll('.undo ul li .do-circle')[i].index=i;
        }
    }
    // 圆圈已完成部分 横线
    // 删除
    let undoUL=document.querySelector('.undo ul');
    let undoLi=document.querySelectorAll('.undo ul li');
    let do_content=document.querySelectorAll('.undo ul li .do-content');
    for(let i=0;i<undoLi.length;i++){
        do_content[i].addEventListener('keydown',function(event){
            if(do_content[i].innerHTML==""){
                if(event.keyCode == 8 || event.keyCode ==46){
                    undoUL.removeChild(undoLi[i]);
                    // console.log(document.querySelectorAll('.undo ul li').length);
                }
            }
            g();
        })
        if(undoUL.innerHTML==""){
            console.log("空");
        }
        
    }
   
    // 已完成 横线添加
    function f(){
        for (let i = 0; i < document.querySelectorAll('.undo ul li').length; i++) {
                 document.querySelectorAll('.undo ul li .do-circle')[i].addEventListener('click', function (e) {
                    e.stopPropagation();
            g();
            console.log(document.querySelectorAll('.undo ul li').length);
                 console.log(this.index);
                 if(document.querySelectorAll('.undo ul li')[this.index].classList.contains('finish')){
                     console.log("有");
                     document.querySelectorAll('.undo ul li')[this.index].classList.remove('finish');
                 }
                 else{
                     console.log("无");
                     document.querySelectorAll('.undo ul li')[this.index].classList.add('finish');
                 }
                     // delete_content_one[i].contentEditable = true;
                     // delete_content_one[i].contentEditable = false;
                 })
         } 
    }
    f();
       
    
    // 便签头部固定
    // undo.addEventListener('scroll', function () {
    //     if (undo.scrollTop > 500) {
    //         do_top.style.position = "fixed";
    //         do_top.style.width = "400px";
    //         do_top.style.backgroundColor = "rgb(246, 241, 221)";
    //     }
    //     else {
    //         do_top.style.position = "relative";
    //         do_top.style.width = "auto";
    //         do_top.style.backgroundColor = "transparent";
    //     }
    // })

    // 便签上的时间
    var currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const do_time = document.querySelectorAll('.do-time');
    for (let i = 0; i < do_time.length; i++) {
        do_time[i].innerHTML = 'Date：' + year + '/' + month + '/' + day;
    }

    
    // // 经常做的事
    const often = document.querySelector('.often');
    for(let i=0;i<history_icon.length;i++){
        history_icon[i].addEventListener('click', function (e) {
            console.log("c");
            e.stopPropagation();
            // 出现和消失
            if (often.style.display == "block") {
                often.style.display = "none";
            }
            else {
                often.style.display = "block";
            }
        })
    }
    document.addEventListener('click', function () {
        often.style.display = "none";
    })
    often.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    // 将内容添加进待做
    const often_li = document.querySelectorAll('.often ul li');
    for (let i = 0; i < often_li.length; i++) {
        often_li[i].addEventListener('click', function () {
            const creat_li = document.createElement('li');
            creat_li.innerHTML = "<span class='do-circle'></span><span class='do-content' contenteditable='true'>" + often_li[i].innerHTML + "</span>";
            document.querySelector('.undo ul').insertBefore(creat_li, document.querySelectorAll('.undo ul li')[0]);
        })
    }

    // 便签拖拽
    function dragFunc(id) {
        var Drag = document.getElementById(id);
        // console.log(Drag);
        Drag.onmousedown = function (event) {
            var event_content = event || window.event;
            event.stopPropagation();
            var divX = event_content.clientX - Drag.offsetLeft;
            var divY = event_content.clientY - Drag.offsetTop;
            document.onmousemove = function (event) {
                var event_content = event || window.event;
                Drag.style.left = event_content.clientX - divX + "px";
                Drag.style.top = event_content.clientY - divY + "px";
                Drag.style.cursor = "move";
            };
        };
        Drag.onmouseup = function (e) {
            e.stopPropagation();
            document.onmousemove = null;
            this.style.cursor = "pointer";
        };
    }
    dragFunc('note-content');
    dragFunc('calender');




})