window.addEventListener('load', function () {
  const secondHand = document.querySelector('.second-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const hourHand = document.querySelector('.hour-hand');
  let date = null;
  let hour = 0;
  let minute = 0;
  let second = 0;
  // 初始化时钟
  initClock();
  clock();
  function initClock() {
    const date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
  }
  function handRotation(target, deg) {
    target.style.transform = `rotate(${deg}deg)`;
  }
  function clock() {
    date = new Date();
    let hour = (date.getHours() % 12) + date.getMinutes() / 59;
    let minute = date.getMinutes();
    let second = date.getSeconds();

    handRotation(hourHand, hour * 30);
    handRotation(minuteHand, minute * 6);
    handRotation(secondHand, second * 6);

    setTimeout(clock, 500);  // 递归
  }

  // // 点击时钟回到首页
  // let desk_clock = this.document.querySelector('.clock');
  // // console.log(desk_clock);
  // desk_clock.addEventListener('click', function () {
  //   setTimeout(function () {
  //     window.open('./index.html');
  //   }, 500)
  // })
});



