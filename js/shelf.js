window.addEventListener('load',function(){
  // const toogle = document.querySelector('#toogle');
  // const sideMenu = document.querySelector('#side-menu');
  // // 侧边栏
  // toogle.addEventListener('click', function() {
  //   isCollapsible = Array.from(sideMenu.classList).includes('collapsible');
  //   if (isCollapsible) {
  //     sideMenu.classList.remove('collapsible');
  //   } else {
  //     sideMenu.classList.add('collapsible');
  //   }
  // })

  // 学校信息查看
  function unni(){
    let unni=document.querySelectorAll('.unni');
    for(let i=0;i<unni.length;i++){
      unni[i].addEventListener('click',function(e){
        e.stopPropagation();
        window.open('../map.html');
      // window.location.href="../map.html";
      })
    }
  }
  unni();
 

  // 试题出现
var num=1;
let try_ul=document.querySelector('.try-content .try-banner');
let try_more=document.querySelector('.next-try');
  function tryFun(try_topic,try_sch){
    let try_li=document.createElement('div');
    try_li.className="pre";
    try_li.innerHTML="<p class='try-topic'>"+try_topic+"</p><p class='co-icon unni'><i class='iconfont'>&#xe6b4;</i><span>"+try_sch+"</span></p><p class='yu-icon'><i class='iconfont'>&#xec86;</i><span class='pre'>"+"预览"+"</span></p>"
    
    if(document.querySelectorAll('.try-banner div').length<13*num){
      try_ul.insertBefore(try_li,try_more);
         // 重复代码很多 这个函数 没有用到在不同函数调用同一个封装函数
    }
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
  // 展开更多
  try_ul.addEventListener('scroll',function(){
    if(document.querySelectorAll('.try-banner div').length<13*num){
         tryFun();
         unni();
    }
    // 出现
    if(document.querySelectorAll('.try-banner div').length>12){
      try_more.style.display="block";
    }
  })
  // 点击展开更多传入
  try_more.addEventListener('click',function(){
    num++;
    console.log(num);
    tryFun();
    unni();
  })

  // 回到首页部分
  const back=document.querySelector('.back-first');
  back.addEventListener('click',function(){
    window.location.href="../index.html";
  })

  // 点击侧边栏进行切换
  const shelf_li=document.querySelectorAll('.shelf-item');
  const shelf_content=document.querySelectorAll('.shelf-content');
  for(let i=0;i<shelf_li.length;i++){
    shelf_li[i].index=i;
    shelf_li[i].addEventListener('click',function(){
      for (let j = 0; j < shelf_content.length; j++) {
        shelf_content[j].className = shelf_content[j].className.replace(" shelf-active", "").trim();
        shelf_li[j].className = shelf_li[j].className.replace(" slide-active", "").trim();
    }
        shelf_content[this.index].className = shelf_content[this.index].className +" shelf-active";
        shelf_li[this.index].className = shelf_li[this.index].className +" slide-active";
    })
  }

  // 真题和试题搜索内容部分
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


// 真题查看全部部分
const real_all_li=document.querySelectorAll('.real-bottom');
for(let i=0;i<real_all_li.length;i++){
  real_all_li[i].addEventListener('click',function(){
    window.location.href="../real.html";
  })
}


// 笔记

  // 笔记宽度变化
  var block = document.querySelector('.block');
  var box = document.getElementById('shelf-box');
  block.onmousedown = function (ev) {
      var myEvent = ev || event;
      var distanceX = myEvent.clientX - block.offsetLeft;
      // var distanceY = myEvent.clientY - block.offsetTop;
      document.onmousemove = function (ev) {
          var myEvent = ev || event;
          box.style.width = myEvent.clientX - distanceX + block.offsetWidth + 'px';
          // box.style.height = myEvent.clientY - distanceY + block.offsetHeight + 'px';
      };
      document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
      };
  };

// 笔记二级导航出现消失  重复的有点多
function sec(){
  let slide_li=document.querySelectorAll('.shelf-fir .shelf-first');
  let slide_ul_li=document.querySelectorAll('.shelf-sec');
  let down_arrow=document.querySelectorAll('.down-arrow');
  for(let i=0;i<slide_li.length;i++){
    slide_li[i].index=i;
    if(slide_ul_li[i].classList.contains('shelf-sec-active')){
      let b=1;
      slide_li[i].addEventListener('click',function(){
        b++;
        if(b%2==0){
          slide_ul_li[i].classList.remove('shelf-sec-active');
          down_arrow[i].classList.remove('down-arrow-active');
        }
        else{
          slide_ul_li[i].classList.add('shelf-sec-active');
          down_arrow[i].classList.add('down-arrow-active');
        }
      })
    }
    else{
      let b=0;
      slide_li[i].addEventListener('click',function(){
        b++;
        if(b%2==0){
          slide_ul_li[i].classList.remove('shelf-sec-active');
          down_arrow[i].classList.remove('down-arrow-active');
        }
        else{
          slide_ul_li[i].classList.add('shelf-sec-active');
          down_arrow[i].classList.add('down-arrow-active');
        }
      })
    }
  }
  for(let i=0;i<document.querySelectorAll('.shelf-sec').length;i++){
    document.querySelectorAll('.shelf-sec')[i].index=i;
    document.querySelectorAll('.shelf-sec')[i].addEventListener('click',function(e){
      e.stopPropagation();
    })
  }
}
sec();
  

// 笔记右键导航栏出现

// 取消二级导航栏的浏览器默认自带浏览器
// 二级导航 的新建文件夹菜单 
// 第一个菜单
document.querySelector('.shelf-fir').oncontextmenu=function(e){
  e.preventDefault();
  document.querySelector('.menu-two').style.display="none";
  document.querySelector('.menu-one').style.display="block";
  menu(document.querySelector('.menu-one'),document.querySelector('.shelf-fir'));
}
for(let i=0;i<document.querySelectorAll('.menu-one ul li').length;i++){
  document.querySelectorAll('.menu-one ul li')[i].count=i;
  document.querySelectorAll('.menu-one ul li')[i].addEventListener('click',function(){
    // 新建文件夹
    if(this.count==0){
      let file_li=document.createElement('li');
      file_li.className="shelf-first";
      file_li.innerHTML="<i class='iconfont note-icon'>&#xe6c2;</i>"+"新建文件夹"+"<i class='down-arrow'></i><div class='shelf-sec'><ul></ul></div>";
      document.querySelector('.note-shelf').appendChild(file_li);
      suo();
      sec();
    }
  })
}

//菜单出现 
function menu(content,wrapper){
  let menu=content;
  let container = wrapper;
  wrapper.oncontextmenu=function(e){
      e.preventDefault();//取消默认的浏览器自带右键 
      var evt = window.event || arguments[0];
      /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
          menu.style.left = container.scrollLeft + evt.clientX + "px";
          menu.style.top = container.scrollTop + evt.clientY + "px";
      /*设置菜单可见*/
      menu.style.visibility = "visible";     
  }
}
// 菜单消失
window.onclick=function(e){
  document.querySelector('.menu-two').style.visibility = 'hidden';
  document.querySelector('.menu-one').style.visibility = 'hidden';
  document.querySelector('.menu-three').style.visibility = 'hidden';
}
var a;
// 索引改变 长度改变
function suo(){
  for(let i=0;i<document.querySelectorAll('.shelf-first').length;i++){
    document.querySelectorAll('.shelf-first')[i].index=i;
    document.querySelectorAll('.shelf-first')[i].addEventListener('mouseover',function(){
      document.querySelector('.menu-two').style.display="block";
        document.querySelector('.menu-one').style.display="none";
      menu(document.querySelector('.menu-two'),document.querySelectorAll('.shelf-first')[this.index]);
    // console.log(document.querySelectorAll('.shelf-first')[this.index]);
    a=this.index;
    })
  }
}

suo();

// 第二个菜单内容点击
  for(let i=0;i<document.querySelectorAll('.menu-two ul li').length;i++){
    document.querySelectorAll('.menu-two ul li')[i].count=i;
    document.querySelectorAll('.menu-two ul li')[i].addEventListener('click',function(){
      // 新建文件夹
      if(this.count==0){
        let file_li=document.createElement('li');
        file_li.className="shelf-first";
        file_li.innerHTML="<i class='iconfont note-icon'>&#xe6c2;</i><span class='shelf-s'>"+"新建文件夹"+"</span><i class='down-arrow'></i><div class='shelf-sec'><ul></ul></div>";
        document.querySelector('.note-shelf').appendChild(file_li);
        // 添加可编辑属性
        let divId = document.createAttribute("contenteditable");
        divId.value = 'true';
        document.querySelector('.shelf-s').setAttributeNode(divId);
        suo();
        sec();
        onload();
      }
      // 新建文件
      if(this.count==1){
        let shelf_two=document.querySelectorAll('.shelf-sec ul')[a];
        let file_li=document.createElement('li');
        file_li.innerHTML="<span>新建文件</span>";
        // 添加可编辑属性
        let divId = document.createAttribute("contenteditable");
        divId.value = 'true';
        file_li.setAttributeNode(divId);
        shelf_two.appendChild(file_li);
        suo();
        suoSec();
        d();
        sec();
        onload();
      }
      // 删除文件夹
      if(this.count==2){
        let note_shelf=document.querySelector('.note-shelf');
        note_shelf.removeChild(document.querySelectorAll('.shelf-first')[a]);
        suo();
        sec();
      }
    })
  }

  // 改变长度
  function suoSec(){
    for(let i=0;i<document.querySelectorAll('.shelf-first').length;i++){
      for(let j=0;j<document.querySelectorAll('.shelf-first')[i].querySelectorAll('.shelf-sec ul li').length;j++){
        console.log(document.querySelectorAll('.shelf-first')[i].querySelectorAll('.shelf-sec ul li').length);
      }
    }
  }
var cLi;
var sUl;

// 第三个菜单出现
function d(){
  for(let i=0;i<document.querySelectorAll('.shelf-first').length;i++){
    for(let j=0;j<document.querySelectorAll('.shelf-first')[i].querySelectorAll('.shelf-sec ul li').length;j++){
      document.querySelectorAll('.shelf-first')[i].querySelectorAll('.shelf-sec ul li')[j].addEventListener('mouseover',function(e){
        e.stopPropagation();
        document.querySelector('.menu-two').style.display="none";
        document.querySelector('.menu-one').style.display="none";
        sUl=document.querySelectorAll('.shelf-first')[i].querySelector('.shelf-sec ul');
        menu(document.querySelector('.menu-three'),this);
        cLi=this;
        sec();
      })
    }
  } 
}
  d();

  // 第三个菜单点击
  for(let i=0;i<document.querySelectorAll('.menu-three ul li').length;i++){
    document.querySelectorAll('.menu-three ul li')[i].count=i;
    document.querySelectorAll('.menu-three ul li')[i].addEventListener('click',function(){
      // console.log(cLi);
      // console.log(sUl);
      if(this.count==0){
        sUl.removeChild(cLi);
        suoSec();
        suo();
        sec();
      }
    })
  }

//笔记二级导航下方添加文件夹
  let note_add=document.querySelector('.note-one');
  let note_shelf=document.querySelector('.note-shelf');
  note_add.addEventListener('click',function(){
    let add_li=document.createElement('li');
    add_li.className="shelf-first";
    add_li.innerHTML="<i class='iconfont note-icon'>&#xe6c2;</i><span class='shelf-s'>"+"新建文件夹"+"</span><i class='down-arrow'></i><div class='shelf-sec'><ul></ul></div>";
        document.querySelector('.note-shelf').appendChild(add_li);
        // 添加可编辑属性
        let divId = document.createAttribute("contenteditable");
        divId.value = 'true';
        document.querySelector('.shelf-s').setAttributeNode(divId);
    suo();
    sec();
    onload();
  }) 


// 鼠标标注
   let textDom = document.querySelector('.shelf-note-content');
   let val = "";
   let top_li=document.querySelectorAll('.add-top .add-ic');
  //  上面功能的选择
  for(let i=0;i<top_li.length;i++){
    top_li[i].count=i;
    top_li[i].addEventListener('click',function(){
      // console.log(this.index);
      add(this.count,val);
      if(this.count==5){
        top_li[i].addEventListener('change', function (e) {
          // 获取上传的图片集合
          var files = e.target.files;
          console.log("files: ", files);
          for(let i=0;i<files.length;i++){
            console.log(files[i].name);
          }
        })
      }
    })
  }
  // 鼠标事件监听 鼠标拖动的文本
   textDom.onmouseup = function (e) {
    e.stopPropagation();
   //释放鼠标的时候，调用testSelection()方法
    val = testSelection();
    // console.log(val)
}
// 获取文本
function testSelection() {
    //获取Selection对象
    let selection = window.getSelection();
    //调用selection对象的toString()方法 获取鼠标拖动选中的文本
    // console.log(selection.toString());
    //选中的值
    let str = selection.toString();
    return str;
}

// 为文本添加样式
function add(type, str) {
  let textDom = document.querySelector('.shelf-note-content');
  let text = textDom.innerHTML;
  console.log(text);
  //匹配传入的搜索值不区分大小写 i表示不区分大小写，g表示全局搜索  匹配标签
  // ${} 配合反单引号完成拼接字符串的功能
  let rReg = new RegExp(`${str}`, "");
  // console.log(rReg);
  //替换后的值
  let rHtml = "";
  if (type == 0) {
    rHtml = text.replace(rReg, "<span style='font-weight:700;'>"+str+"</span>");
    console.log(rHtml);
} else if (type == 1) {
    rHtml = text.replace(rReg, "<span style='font-style: italic;'>"+str+"</span>");
} else if (type == 2) {
    rHtml = text.replace(rReg,"<span style='text-decoration: underline;'>"+str+"</span>");
} else if (type == 3) {
  rHtml = text.replace(rReg,"<span style='background-color:red;'>"+str+"</span>");
} else if (type == 4) {
  rHtml = text.replace(rReg,"<span style='color:red;'>"+str+"</span>");
} else if (type == 5||type == 6) {
let title=document.querySelector('.select');
  rHtml = text.replace(rReg,title.innerHTML.substring(0,4)+str+title.innerHTML.slice(-5,-1)+">");
}
else if(type == 7||type==8||type == 9||type == 10||type==11){
  rHtml = text.replace(rReg,top_li[type].innerHTML.substring(0,4)+str+top_li[type].innerHTML.slice(-5,-1)+">");
}
  textDom.innerHTML = rHtml;
}


// 标题123456选择
let title=document.querySelector('.select');
let title_sec=document.querySelector('.title-add-sec');
let title_li=document.querySelectorAll('.title-add ul li');
let title_i=document.querySelector('.title-i');
  title_i.addEventListener('click',function(e){
    e.stopPropagation();
    title_sec.classList.toggle('title-active'); 
})
  for(let i=0;i<title_li.length;i++){
    title_li[i].index=i;
    title_li[i].addEventListener('click',function(){
    title.innerHTML=title_li[i].innerHTML;
    title_sec.classList.remove('title-active');
  })
}
document.addEventListener('click',function(){
  title_sec.classList.remove('title-active');
})

// 单击双击
var  clickTimeId;
let shelfLi=document.querySelectorAll('.shelf-fir ul li span');
function  onload() {
  document.addEventListener( 'click' , onDocumentClick);
  for(let i=0;i<shelfLi.length;i++){
    shelfLi[i].addEventListener( 'dblclick' , onDocumenDblClick);
}
}
function  onDocumentClick(event) {
  // 取消上次延时未执行的方法
  clearTimeout(clickTimeId);
  //执行延时
  clickTimeId = setTimeout( function () {
    //此处为单击事件要执行的代码
    // console.log( "鼠标单击" );
  }, 250);
}
function  onDocumenDblClick(event) {
  // 取消上次延时未执行的方法
  clearTimeout(clickTimeId);
  console.log( "鼠标双击" );
  console.log(shelfLi.length);
  let shelf_con = document.createAttribute("contenteditable");
  shelf_con.value = 'true';
  this.setAttributeNode(shelf_con);
  edit();
  
}
onload();
function edit(){
  document.addEventListener('click',function(){
    for(let i=0;i<document.querySelectorAll('.shelf-fir ul li span').length;i++){
      document.querySelectorAll('.shelf-fir ul li span')[i].addEventListener('click',function(e){
        e.stopPropagation();
      })
      let shelf_n = document.createAttribute("contenteditable");
      shelf_n.value = 'false';
      console.log(1);
      document.querySelectorAll('.shelf-fir ul li span')[i].setAttributeNode(shelf_n);
     
    }
  })
}
  let shelf_more=document.querySelector('.shelf-more');
  shelf_more.addEventListener('click',function(){
    window.open('../map.html')
  })

})
