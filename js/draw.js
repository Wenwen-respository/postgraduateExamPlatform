window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas');
    // canvas.getContext('2d') 获得渲染上下文和它的绘画功能
const ctx = canvas.getContext('2d');
let startPos = { x: undefined, y: undefined };
let isPainting = false;
let isErasering = false;
let brushColor = '#000';
let action = 'draw';
// var s;
// var flag=false;
let toogle = document.querySelector('#toogle');
let sideMenu = document.querySelector('#side-menu');
// 侧边栏
toogle.addEventListener('click', function() {
    flag=true;
  isCollapsible = Array.from(sideMenu.classList).includes('collapsible');
  if (isCollapsible) {
    // s=parseInt(window.getComputedStyle(document.querySelector('#side-menu'),null).width);
    sideMenu.classList.remove('collapsible');
    // console.log(s);
    // initCanvas(s);
  } else {
    // 字符串里面拿整数
    // s=parseInt(window.getComputedStyle(document.querySelector('#side-menu'),null).width);
    sideMenu.classList.add('collapsible');
    // console.log(s);
    // initCanvas(s);
  }
})
function initCanvas() {
  canvas.width = document.documentElement.offsetWidth;
  canvas.height = document.documentElement.offsetHeight;
  enableDownload(canvas);
}
// 初始化canvas
initCanvas();



// canvas操作 - 画线
function drawLine({ startX, startY, endX, endY, color = brushColor }) {
  //开始绘制
  ctx.beginPath();
  //线宽
  ctx.lineWidth = 2;
  // 线颜色
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  //起始位置
  ctx.moveTo(startX, startY);
  //停止位置
  ctx.lineTo(endX, endY);
  //描绘线路
  ctx.stroke();
  //结束绘制
  ctx.closePath();
}

// 监听canvas鼠标事件
// 1. mousedwn 确定起始坐标，准备绘制
canvas.addEventListener('mousedown', function (event) {
  startPos.x = event.offsetX;
  startPos.y = event.offsetY;
  isPainting = true;
});
// 2. 监听鼠标移动，绘制图形 or 擦除
canvas.addEventListener('mousemove', function (event) {
  const endX = event.offsetX;
  const endY = event.offsetY;

  if (isPainting && typeof startPos.x === 'number' && typeof startPos.y === 'number') {
    if (isErasering && action === 'eraser') {
      ctx.clearRect(endX - 5, endY - 5, 25, 25);
    } else if (!isErasering && action === 'draw') {
      drawLine({
        startX: startPos.x,
        startY: startPos.y,
        endX,
        endY,
        color: brushColor,
      });
      startPos.x = endX;
      startPos.y = endY;
    }
  }
});
// 监听鼠标抬起， 结束绘制
canvas.addEventListener('mouseup', function () {
  isPainting = false;
  startPos = {x: undefined, y: undefined };
  enableDownload(canvas);
});

// 下载图片 将图片先转成base64 然后进行下载
function enableDownload(canvas) {
  const a = document.getElementById('download');
//   利用canvas将图片转换为base64编码
  a.href = canvas.toDataURL();
}

// 画笔/橡皮切换
document.getElementById('pencil').addEventListener('click', function () {
  action = 'draw';
  isErasering = false;
  isPainting = true;
  document.getElementById('canvas').className = action;
  this.classList.add('active');
  document.getElementById('eraser').classList.remove('active');
});
document.getElementById('eraser').addEventListener('click', function () {
  action = 'eraser';
  isErasering = true;
  isPainting = false;
  document.getElementById('canvas').className = action;
  this.classList.add('active');
  document.getElementById('pencil').classList.remove('active');
});

// 清除画布
document.getElementById('delete').addEventListener('click', function () {
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// 打开 or 关闭色板
function toggleColorPanel() {
  const colorPanel = document.getElementById('color-panel');
  if (colorPanel.className.includes('show')) {
    colorPanel.classList.remove('show');
    colorPanel.classList.add('hide');
  } else {
    colorPanel.classList.remove('hide');
    colorPanel.classList.add('show');
  }
}
document.getElementById('color').addEventListener('click', toggleColorPanel);


// 选择画笔颜色
let color_li=document.querySelectorAll('.color-panel li');
let select_color=document.querySelector('.color');
for(let i=0;i<color_li.length;i++){
    color_li[i].index=i;
    color_li[i].addEventListener('click',function(){
        // alert("dd");
        select_color.style.backgroundColor= window.getComputedStyle(color_li[i],null).backgroundColor;
        brushColor = select_color.style.backgroundColor;
    })
}
})