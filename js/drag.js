window.addEventListener('load', function () {
    var flag=false;
    // 便签部分 待做、文件
    let note = document.querySelector('.note');
    const note_ul = document.querySelector('.note ul');
    // var index;
    // 上传文件函数 有bug
    function up(files) {
        for (let i = 0; i < files.length; i++) {
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
                    var file_li = document.createElement('li');
                    file_li.innerHTML = "<i class='iconfont'>" + img_name + "</i><span class='note-title'>" + files[i].name + "</span><br/><span class='note-size'>" + size + "</span><i class='iconfont delete-icon'>&#xe606;</i><i class='iconfont preview-icon pre'>&#xec86;</i>"
                    note_ul.appendChild(file_li);
                    ifme();
                }
                else {
                    console.log("陛下的的文件过大 本庙有点小 容不下");
                }
            } else {
                console.log("陛下的的文件z容不下")
            }
        }
        suoyi();
    }

    // 预览
    function ifme(){
        let pre=document.querySelectorAll('.pre');
        for(let i=0;i<pre.length;i++){
            pre[i].addEventListener('click',function(){
                window.open('../iframe.html');
            })
        } 
    }
    ifme();

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

    note.addEventListener('drop', function (e) {
        // DataTransfer 对象用于保存拖动并放下（drag and drop）过程中的数据
        // console.log(e.dataTransfer);
        // DataTransfer.files  包含数据传输中可用的所有本地文件的列表
        flag=true;
        var note_list = e.dataTransfer.files;
        up(note_list);
        delet();
            // 有上传文件的删除
    })

    // 改变长度 索引
    function suoyi(){
        for(let i=0;i< document.querySelectorAll('.delete-icon').length;i++){
            document.querySelectorAll('.delete-icon')[i].index=i;
            }
    }
    
    // 删除
    function delet(){
        let dele_icon=document.querySelectorAll('.delete-icon');
        for(let i=0;i< dele_icon.length;i++){
            dele_icon[i].index=i;
            dele_icon[i].addEventListener('click',function(e){
                console.log("有");
                e.stopPropagation();
                // console.log(this.index);
                // // 最近删除
                let delete_li = document.createElement('li');
                delete_li.innerHTML = document.querySelectorAll('.note ul li')[this.index].innerHTML;
                document.querySelector(".delete-history ul").appendChild(delete_li);
                ifme();
                // 删除
                let notUl=document.querySelector('.note ul');
                let noteLi=document.querySelectorAll('.note ul li');
                notUl.removeChild(noteLi[this.index]);
                suoyi();
            })
        }
    }
    // 点击上传文件
    const file_up = document.querySelector("#file-up");
    file_up.addEventListener('change', function (e) {
        flag=true;
        // 获取上传的文件集合
        var files = e.target.files;
        console.log("files: ", files);
        up(files);
        delet();
    })

    // 没有上传时候的删除
    let dele_icon=document.querySelectorAll('.delete-icon');
    for(let i=0;i< dele_icon.length;i++){
        dele_icon[i].index=i;
        dele_icon[i].addEventListener('click',function(e){
        if(flag==false){
            console.log(flag);
            console.log("没");
            e.stopPropagation();
            // console.log(this.index);
            // console.log(document.querySelectorAll('.note ul li').length);
            // 最近删除
            let delete_li = document.createElement('li');
            delete_li.innerHTML = document.querySelectorAll('.note ul li')[this.index].innerHTML;
            document.querySelector(".delete-history ul").appendChild(delete_li);
            ifme();
            // 删除
            let notUl=document.querySelector('.note ul');
            let noteLi=document.querySelectorAll('.note ul li');
            notUl.removeChild(noteLi[this.index]);
            suoyi();    
        }
        })
    }    
   
    // 删除历史记录出现消失
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
    // 点击添加icon 添加待做
    const add_icon_one = document.querySelectorAll('.add-icon-one');
    const history_icon = document.querySelectorAll('.history-icon');
    for(let i=0;i<add_icon_one.length;i++){
        add_icon_one[i].addEventListener('click', function () {
            // console.log(add_icon_one[i]);
       const undo_add_li = document.createElement('li');
       let uncontent = "添加事项...";
       undo_add_li.innerHTML = "<span class='do-circle'></span><span class='do-content' contenteditable='true'>" + uncontent + "</span>"
        //  待做内容添加
        undo_add_li.style.color = "#aaa";
        let do_content=document.querySelector('.do-content');
            undo_add_li.addEventListener('keydown', function () {
                if(do_content.innerText!=="添加事项..."){
                    undo_add_li.style.color = "#333";
                }
            }) 
       if (undo_li_all.length > 0) {
           //第一个参数是要插入的元素，第二个参数是在最前面插入
           undo_ul.insertBefore(undo_add_li, document.querySelectorAll('.undo ul li')[0]);
           g();
           f();
           del();
            is();
       } else {
           undo_ul.appendChild(undo_add_li);
           g();
           f();
           del();
           is();
       }
            })
    }

    function is(){
        g();
        let inner=document.querySelectorAll('.undo ul li');
        for(let i=0;i<inner.length;i++){
            if(inner[i].innerText=="添加事项..."){
            // console.log(1);
            history_icon[1].style.pointerEvents="none";
            add_icon_one[1].style.pointerEvents="none";
            }
        }
        for(let i=0;i<inner.length;i++){
            if(inner[i].innerText!=="添加事项..."){
            // console.log(1);
            history_icon[1].style.pointerEvents="auto";
            add_icon_one[1].style.pointerEvents="auto";
            }
        }
    }

    // 改变索引
    function g(){
        for(let i=0;i<document.querySelectorAll('.undo ul li ').length;i++){
            document.querySelectorAll('.undo ul li .do-circle')[i].index=i;
        }
    }
    // 圆圈已完成部分 横线
    // 删除
function del(){
    let undoUL=document.querySelector('.undo ul');
    let undoLi=document.querySelectorAll('.undo ul li');
    let do_content=document.querySelectorAll('.undo ul li .do-content');
    for(let i=0;i<undoLi.length;i++){
        do_content[i].addEventListener('keydown',function(event){
            if(do_content[i].innerHTML==""){
                if(event.keyCode == 8 || event.keyCode ==46){
                    undoUL.removeChild(undoLi[i]);
                    if(undoLi[i]==undoLi[i]){
                        history_icon[1].style.pointerEvents="auto";
                        add_icon_one[1].style.pointerEvents="auto";
                    }
                    g();
                }
            }
        })
        
    }
}
del();
   
   
    // 已完成 横线添加
    function f(){
        let un_li=document.querySelectorAll('.undo ul li');
        let un_circle=document.querySelectorAll('.undo ul li .do-circle');
        for (let i = 0; i < un_li.length; i++) {
            un_li[i].index=i;
            if(un_li[i].classList.contains('finish')){
                        let b=1;
                un_circle[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    b++;
                    if(b%2==0){
                        un_li[i].classList.remove('finish');
                    }
                    else{
                      un_li[i].classList.add('finish');
                    }
                })
            }
            else{
                let b=0;
                un_circle[i].addEventListener('click', function (e) {
                    e.stopPropagation();
                    b++;
                    if(b%2==0){
                        un_li[i].classList.remove('finish');
                    }
                    else{
                      un_li[i].classList.add('finish');
                    }
                })
            }
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

    
    // 经常做的事 点击消失
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
    document.addEventListener('click', function (e) {
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
            g();
            f();
            del();
        })
    }

    // 便签拖拽 有bug 便签里面内容双击也会引起拖拽
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
                event.stopPropagation();
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