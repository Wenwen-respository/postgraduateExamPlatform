window.addEventListener('load', function () {

    // school盒子的轮播图效果
    let school_ul = this.document.querySelector('.school-ul'),
        // school_name_lis = this.document.querySelector('.info-content-ul').querySelectorAll('li'),
        school_left_buttons = this.document.querySelector('.left-school-button'),
        question_button = this.document.querySelector('.question-button'),
        school_discuss_button = this.document.querySelector('.discuss-button'),
        school_bgc = document.querySelector('.school-bgc'),
        school_box1=document.querySelector('.school-box1'),
        school_box3=document.querySelector('.school-box3'),
        open_door_back=document.querySelector('.open-door-pro'),
        open_cicle=document.querySelector('.open-circle'),
        delet_d=document.querySelector('.delete-d');

    //房间出现 
    school_left_buttons.addEventListener('click', function (e) {
        e.preventDefault()
        // console.log("ee");
        school_bgc.classList.add('sca');
        school_box1.style.top="200vh";
        school_left_buttons.style.opacity = "0";
        school_bgc.style.top = "0";
        school_bgc.style.zIndex=1111;
        open_door_back.style.opacity="1";
        open_door_back.style.transition="all 2s";
    })

    open_cicle.addEventListener('click',function(){
        // console.log("ss");
        open_door_back.classList.add('bgc');
        let clock=document.querySelector('.clock');
        setTimeout(function(){
        school_bgc.style.backgroundImage="url(./images/desk.jpg)";
        school_bgc.style.transition="all .9s";
        open_door_back.classList.remove('bgc');
        open_door_back.style.display="none";
        clock.style.display="block";
        },2200)
    })
    delet_d.addEventListener('click',function(){
        school_bgc.classList.remove('sca');
        school_bgc.style.backgroundColor="transparent";
        school_left_buttons.style.opacity = "1";
        school_box1.style.top="0";
        school_bgc.style.top = "200vh";
        open_door_back.style.opacity="0";
        open_door_back.style.transition="all .3s";
    })
    
    school_discuss_button.addEventListener('click', function () {
        school_ul.style.transform = "translateY(100vh)";
        school_ul.style.transition = "all .6s";
        // school_box1.style.top="0";
    })
    question_button.addEventListener('click', function () {
        // school_ul.style.transform = "translateY(-100vh)";
        school_box3.style.transform = "translateY(-100vh)";
        school_box1.style.top="100vh";
        school_box3.style.transition = "all .6s";

    })
  

    // const radio_wraper = document.querySelector('.radio-wraper');
    const shelf_banner = document.querySelector('.shelf-banner');
    // 书架圈圈出现消失以及点击
    shelf_banner.addEventListener('mouseover', function () {
        shelf_banner.style.opacity=1;
    })
    shelf_banner.addEventListener('mouseout', function () {
        shelf_banner.style.opacity=0;
    })
    shelf_banner.addEventListener('click', function () {
        // window.location.href="../shelf.html";
        window.location.href="../shelf.html";
    })
         

    // 按钮出现以及对应内容的点击
    const circle=document.querySelectorAll('.share-circle');
    const room_content=document.querySelectorAll('.room-content');
    for(let i=0;i<circle.length;i++){
        circle[i].index = i;
        circle[i].addEventListener('mouseover',function(){
            circle[i].style.opacity=1;
        })
        circle[i].addEventListener('mouseout',function(){
            circle[i].style.opacity=0;
        })
        circle[i].addEventListener('click',function(){
            if(room_content[i].style.display=="block"){
                room_content[i].style.display="none";
            }else{
                room_content[i].style.display="block";
            }
            // for (let j = 0; j < room_content.length; j++) {
                // room_content[j].className = room_content[j].className.replace(" room-active", "").trim();
            // }
                // room_content[this.index].className = room_content[this.index].className +" room-active";
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
})