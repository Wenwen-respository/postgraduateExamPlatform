window.addEventListener('load', function () {

    // school盒子的轮播图效果
    let school_ul = this.document.querySelector('.school-ul'),
        school_left_buttons = this.document.querySelector('.left-school-button'),
        question_button = this.document.querySelector('.question-button'),
        school_discuss_button = this.document.querySelector('.discuss-button'),
        school_bgc = document.querySelector('.school-bgc'),
        open_door_back=document.querySelector('.open-door-pro'),
        open_cicle=document.querySelector('.open-circle'),
        delet_d=document.querySelectorAll('.delete-d');
        const clock=document.querySelector('.clock');

    // 侧边栏点击切换
    let slide_li=document.querySelectorAll('.slide-nav ul li');
    let slide_web=document.querySelectorAll('.school-box');
    for(let i=0;i<slide_li.length-1;i++){
        slide_li[i].index=i;
        slide_li[i].addEventListener('click',function(){
            for(let j=0;j<slide_web.length;j++){
            slide_web[j].className = slide_web[j].className.replace(" first-active", "").trim();
            }
            slide_web[this.index].className = slide_web[this.index].className + " first-active";
        })
    } 

    //房间的门点击出现
    var cloud_bt=document.querySelector('.cloud-bt-sec');
    school_left_buttons.addEventListener('click', function (e) {
        cloud_bt.style.display="block";
        // 叉叉出现
        for(let i=0;i<delet_d.length;i++){
            delet_d[i].style.display="block";
        }
        for(let j=0;j<slide_web.length;j++){
            slide_web[j].className = slide_web[j].className.replace(" first-active", "").trim();
            }
            slide_web[3].className = slide_web[3].className + " first-active";
    })

    // 房间出现
    let d_button=document.querySelectorAll('.share-circle');
    open_cicle.addEventListener('click',function(){
        open_door_back.classList.add('bgc');
        for(let i=0;i<d_button.length;i++){
            d_button[i].style.opacity=0;
        }
        setTimeout(function(){
            school_bgc.style.backgroundImage="url(./images/desk.jpg)";
            open_door_back.style.display="none";
            cloud_bt.style.display="none";
            clock.style.display="block";
            for(let i=0;i<delet_d.length;i++){
                delet_d[i].style.display="none";
            }
            for(let i=0;i<d_button.length;i++){
                d_button[i].style.opacity=1;
            }
        },2200)
    })

    //讨论房、房间的叉叉 
    for(let i=0;i<delet_d.length;i++){
        delet_d[i].addEventListener('click',function(){
            for(let j=0;j<slide_web.length;j++){
                slide_web[j].className = slide_web[j].className.replace(" first-active", "").trim();
                }
                slide_web[0].className = slide_web[0].className + " first-active";
        })
    }
    
    // 讨论房点击出现
    school_discuss_button.addEventListener('click', function () {
        for(let i=0;i<delet_d.length;i++){
            delet_d[i].style.display="block";
        }
        for(let j=0;j<slide_web.length;j++){
            slide_web[j].className = slide_web[j].className.replace(" first-active", "").trim();
            }
            slide_web[1].className = slide_web[1].className + " first-active";
    })

    // 问题点击出现
    question_button.addEventListener('click', function () {
        for(let j=0;j<slide_web.length;j++){
            slide_web[j].className = slide_web[j].className.replace(" first-active", "").trim();
            }
            slide_web[2].className = slide_web[2].className + " first-active";
    })

    // 书架圈圈出现消失以及点击
    const shelf_banner = document.querySelector('.shelf-banner');
    shelf_banner.addEventListener('click', function () {
        window.location.href="../shelf.html";
    })
         

    // 按钮出现以及对应内容的点击
    const circle=document.querySelectorAll('.share-circle');
    const room_content=document.querySelectorAll('.room-content');
    for(let i=0;i<circle.length;i++){
        circle[i].index = i;
        circle[i].addEventListener('click',function(){
            if(room_content[i].style.display=="block"){
                room_content[i].style.display="none";
            }else{
                room_content[i].style.display="block";
            }
        })
    }

    // 单击双击 有bug
    var  clickTimeId;
      function  onDocumentClick(event) {
        // 取消上次延时未执行的方法
        clearTimeout(clickTimeId);
        //执行延时
        clickTimeId = setTimeout( function () {
          console.log( "鼠标单击" );
        }, 450);
      }
    function  onDocumenDblClick(event) {
        event.preventDefault();
        // 取消上次延时未执行的方法
        clearTimeout(clickTimeId);
        document.querySelector('.note-content').style.display="none";
    }

    // 日历、便签双击消失
   function  onload() {
        document.addEventListener( 'click' , onDocumentClick);
        document.querySelector('.note-top').addEventListener( 'dblclick' , onDocumenDblClick);
        document.querySelector('.calender-wrap').addEventListener('dblclick',function(event){
            event.preventDefault();
            clearTimeout(clickTimeId);
            this.style.display="none";
        })
}
   onload();

    //小点点下方的提示框出现 
   let change_button=document.querySelectorAll('.first-button');
   let change_box=document.querySelectorAll('.first-bt');
   let share_box=document.querySelectorAll('.share-box');
   let change_inner=document.querySelectorAll('.discuss-inner');
   let share_circle=document.querySelectorAll('.share-circle');
   for(let i=0;i<change_button.length;i++){
    change_button[i].addEventListener('mouseover',function(){
        change_box[i].style.border="3px solid #fff";
        change_inner[i].style.opacity=1;
    })
    change_button[i].addEventListener('mouseout',function(){
        change_box[i].style.border="3px solid #828b8e";
        change_inner[i].style.opacity=0;
    })
   }
   for(let i=0;i<share_circle.length;i++){
    share_circle[i].addEventListener('mouseover',function(){
        share_box[i].style.border="3px solid #fff";
        share_box[i].style.opacity=1;
    })
    share_circle[i].addEventListener('mouseout',function(){
        share_box[i].style.border="3px solid #828b8e";
        share_box[i].style.opacity=0;
    })
   }
})