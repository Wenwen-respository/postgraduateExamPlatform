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
        console.log("ee");
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
        // school_bgc.style.backgroundImage="url(../images/open-door-pro.jpg)";
        // school_bgc.style.backgroundSize="contain";
        setTimeout(function(){
         school_bgc.style.backgroundImage="url(../images/desk.jpg)";
         school_bgc.style.transition="all .9s";
        open_door_back.classList.remove('bgc');
        open_door_back.style.display="none";
        },2200)
        // open_door_back.style.display="block";

    })

    let  radio_circle =document.querySelector('#radio-circle');
     // 点击收音机圆点控制收音机区域的出现
     radio_circle.addEventListener('click', function () {
        if (radio_wraper.style.display == "block") {
            radio_wraper.style.display = "none";
        } else {
            radio_wraper.style.display = "block";
        }
    })
    const circle=document.querySelectorAll('.circle');
    const room_content=document.querySelectorAll('.room-content');
    const radio_wraper = document.querySelector('.radio-wraper');
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
        // document.addEventListener('click', function () {
        //     console.log("dd");
        //     room_content[i].style.classList("room-active");
        // })
    }
   


})