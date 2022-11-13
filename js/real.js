window.addEventListener('load',function(){
  // 真题
  var index=1;
  function real(real_topic,real_type,real_doc,href){
    const real_ul=document.querySelector('.real-wrap');
    let real_li=document.createElement('li');
    real_li.innerHTML=" <p class='topic'>"+real_topic+"</p><p class='real-exp'><span class='real-bgc'><i class='iconfont'>&#xe6a5;</i>"+real_type+"</span><span class='real-bgc'><i class='iconfont'>&#xe621;</i>"+real_doc+"</span></p><p class='real-tools'><span class='pre'><i class='iconfont'>&#xec86;</i>预览</span><span><a href='"+href+"'download='"+href+"'><i class='iconfont'>&#xe855;</i>下载</a></span></p>"
    if(document.querySelectorAll('.real-wrap li').length<18*index){
      real_ul.appendChild(real_li);
      // let f=ifme;
      // f();
        // 重复代码很多 这个函数 没有用到在不同函数调用同一个封装函数
        function ifme(){
          let pre=document.querySelectorAll('.pre');
          for(let i=0;i<pre.length;i++){
              pre[i].addEventListener('click',function(){
                  window.open('../iframe.html');
              })
          }
          
      }
      ifme();
    }
  }
  // 展开更多
  const more=document.querySelector('.next-real');
  window.addEventListener('scroll',function(){
    if(document.querySelectorAll('.real-wrap li').length<18*index){
         real();
    }
    // 出现
    if(document.querySelectorAll('.real-wrap li').length>17){
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