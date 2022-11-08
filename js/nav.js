// 侧边导航栏部分
window.addEventListener('load',function(){
    const slide_nav=document.querySelectorAll('.slide-nav');
    const slide_nav_p=document.querySelectorAll('.slide-nav ul li p');
    const slide_nav_li=document.querySelectorAll('.slide-nav ul li');
    for(let i=0;i<slide_nav.length;i++){
        slide_nav[i].addEventListener('mouseover',function(){
            slide_nav[i].style.transform="translateX(0)";
            slide_nav[i].style.transition="all .6s";
        })
        slide_nav[i].addEventListener('mouseout',function(){
            slide_nav[i].style.transform="translateX(70px)";
            slide_nav[i].style.transition="all .6s";
        })
    }
    for(let i=0;i<slide_nav_li.length;i++){
        slide_nav_li[i].addEventListener('mouseover',function(){
            slide_nav_p[i].style.opacity="1";
            slide_nav_p[i].style.pointerEvents="auto";
        })
        slide_nav_li[i].addEventListener('mouseout',function(){
            slide_nav_p[i].style.opacity="0";
            slide_nav_p[i].style.pointerEvents="none";
        })
    }
    // for(let i=0;i<slide_nav_li.length;i++){
    //     slide_nav_li[i].addEventListener('click',function(){
           
    //     })
    // }

   
})