window.addEventListener('load',function(){
  // 真题
  var index=1;
  function real(real_topic,real_type,real_doc){
    const real_ul=document.querySelector('.real-wrap');
    let real_li=document.createElement('li');
    real_li.innerHTML=" <p class='topic'>"+real_topic+"</p><p class='real-exp'><span class='real-bgc'><i class='iconfont'>&#xe6a5;</i>"+real_type+"</span><span class='real-bgc'><i class='iconfont'>&#xe621;</i>"+real_doc+"</span></p><p class='real-tools'><span><i class='iconfont'>&#xe660;</i>预览</span><span><i class='iconfont'>&#xe855;</i>下载</span></p>"
    if(document.querySelectorAll('.real-wrap li').length<16*index){
      real_ul.appendChild(real_li);
    }
  }
  // 展开更多
  const more=document.querySelector('.next-real');
  window.addEventListener('scroll',function(){
    if(document.querySelectorAll('.real-wrap li').length<16*index){
         real();
    }
    // 出现
    if(document.querySelectorAll('.real-wrap li').length>15){
      more.style.display="block";
    }
  })
  // 点击展开更多传入
  more.addEventListener('click',function(){
    index++;
    console.log(index);
    real();
  })

})