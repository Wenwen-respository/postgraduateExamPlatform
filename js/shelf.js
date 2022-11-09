window.addEventListener('load',function(){
  const toogle = document.querySelector('#toogle');
  const sideMenu = document.querySelector('#side-menu');
  // 侧边栏
  toogle.addEventListener('click', function() {
    isCollapsible = Array.from(sideMenu.classList).includes('collapsible');
    if (isCollapsible) {
      sideMenu.classList.remove('collapsible');
    } else {
      sideMenu.classList.add('collapsible');
    }
  })

  // 回到首页部分
  const back=document.querySelector('.back-first');
  back.addEventListener('click',function(){
    window.location.href="../index.html";
  })

  // 搜索内容部分
  const shelf_input=document.querySelectorAll('.shelf-input');
  console.log(shelf_input);
  const history=document.querySelectorAll('.real-history');
  const tips=document.querySelectorAll('.real-tips');
  const search_icon=document.querySelectorAll('.input-banner i');
  for(let i=0;i<shelf_input.length;i++){
    shelf_input[i].index=i;
    shelf_input[i].addEventListener('focus',function(e){
      e.preventDefault();
      history[i].style.display="block";
      if(tips[i].style.display=="block"){
        history[i].style.display="none";
      }
      shelf_input[i].addEventListener('keydown',function(e){
        tips[i].style.display="block";
        if(tips[i].style.display=="block"){
          history[i].style.display="none";
        }
        // enter键搜索
          if (!e) e = window.event;
          if (e.keyCode){
              var input_value=shelf_input[i].value;
              // console.log("1:"+input_value);  
              
              // 空内容不进行搜索
              if (e.keyCode == 13) {
                if(input_value== null || input_value == ""||input_value===undefined){
                  console.log('没内容');
              }else{
                  let newUrl="?id="+""+"&&value="+input_value;
                  window.location.replace(newUrl);
              // console.log("2:"+input_value);  
              }  
              }   
        }
      })
      // 点击搜索按钮进行搜索
      search_icon[i].addEventListener('click',function(){
        var input_value=shelf_input[i].value;
        if(input_value== null || input_value == ""||input_value===undefined){
          console.log('没内容');
      }else{
        // console.log("3:"+input_value); 
        let newUrl="?id="+""+"&&value="+input_value;
        window.location.replace(newUrl);
      }
    })
    })
  
    // 搜索提示以及历史记录消失
    shelf_input[i].addEventListener('blur',function(){
      if(tips[i].style.display=="block"||history[i].style.display=="block"){
          setTimeout(function(){
            tips[i].style.display="none";
            history[i].style.display="none";
          },400)
      }
    })
  }


  // 点击侧边栏进行切换
  const shelf_li=document.querySelectorAll('.shelf-item');
  const shelf_content=document.querySelectorAll('.shelf-content');
  for(let i=0;i<shelf_li.length;i++){
    shelf_li[i].index=i;
    shelf_li[i].addEventListener('click',function(){
      for (let j = 0; j < shelf_content.length; j++) {
        shelf_content[j].className = shelf_content[j].className.replace(" shelf-active", "").trim();
    }
        shelf_content[this.index].className = shelf_content[this.index].className +" shelf-active";
    })
  }
})
