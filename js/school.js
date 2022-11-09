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
        open_door_back=document.querySelector('.open-door-pro');

    //房间出现 
    school_left_buttons.addEventListener('click', function () {
        // console.log("ee");
        school_left_buttons.style.transform = "scale(10)";
        school_left_buttons.style.transition = "all .6s";
        school_left_buttons.style.top = "500px";
        school_left_buttons.style.left = "700px";
        school_box1.style.top="200vh";
            setTimeout(function () {
                school_left_buttons.style.opacity = "0";
                school_bgc.style.top = "0";
                // school_bgc.style.opacity = "1";
                school_bgc.style.zIndex=1111;
                open_door_back.style.opacity="1";
                // school_bgc.style.pointerEvents="auto";
            }, 200)
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
    school_bgc.addEventListener('click',function(){
        // console.log("ss");
        open_door_back.classList.add('bgc');
        let clock=document.querySelector('.clock');
        // school_bgc.style.backgroundImage="url(../images/open-door-pro.jpg)";
        // school_bgc.style.backgroundSize="contain";
        setTimeout(function(){
         school_bgc.style.backgroundImage="url(./images/desk.jpg)";
         school_bgc.style.transition="all .9s";
        open_door_back.classList.remove('bgc');
        open_door_back.style.display="none";
        clock.style.display="block";
        },2200)

    })

    const radio_wraper = document.querySelector('.radio-wraper');
    const shelf_banner = document.querySelector('.shelf-banner');
    let  radio_circle =document.querySelector('#radio-circle');
    // 收音机圈圈出现消失以及点击
    radio_circle.addEventListener('mouseover', function () {
        radio_circle.style.opacity=1;
    })
    radio_circle.addEventListener('mouseout', function () {
        radio_circle.style.opacity=0;
    })
    radio_circle.addEventListener('click', function () {
        if (radio_wraper.style.display == "block") {
            radio_wraper.style.display = "none";
        } else {
            radio_wraper.style.display = "block";
        }
    })
    // 书架圈圈出现消失以及点击
    shelf_banner.addEventListener('mouseover', function () {
        shelf_banner.style.opacity=1;
    })
    shelf_banner.addEventListener('mouseout', function () {
        shelf_banner.style.opacity=0;
    })
    shelf_banner.addEventListener('click', function () {
        // window.location.href="../shelf.html";
        window.open("../shelf.html");
    })
         

    // 按钮出现以及对应内容的点击
    const circle=document.querySelectorAll('.share-circle');
    const room_content=document.querySelectorAll('.room-content');
    // for(let i=0;i< room_content.length;i++){
    //     room_content[i].index=i;
    //     console.log(room_content[i]);
    //     document.addEventListener('click', function () {
    //     if(room_content[i].classList.contains('room-active')){
    //             room_content[i].classList.remove('room-active');
    //     }
    //         })        
// }
    for(let i=0;i<circle.length;i++){
        circle[i].index = i;
        circle[i].addEventListener('mouseover',function(){
            circle[i].style.opacity=1;
        })
        circle[i].addEventListener('mouseout',function(){
            circle[i].style.opacity=0;
        })
        circle[i].addEventListener('click',function(){
            for (let j = 0; j < room_content.length; j++) {
                room_content[j].className = room_content[j].className.replace(" room-active", "").trim();
            }
                room_content[this.index].className = room_content[this.index].className +" room-active";
        })
    }
  
    // var clickTimer = null;
    // function btnClick() {
    //     clearTimeout(clickTimer);  //首先清除计时器
    //     clickTimer = setTimeout(() => {
    //         console.log("单击==")
    //     },200);
    // }

    // function btndbClick() {
    //     clearTimeout(clickTimer);
    //     console.log("双击---");
    // }
    // radio_circle.addEventListener('click', function () {
    //     btnClick();
    //     btndbClick();
    // })

})