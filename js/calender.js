window.addEventListener('load',function(){
    var tody = new Date(); //获取当前时间
    var year = tody.getFullYear(); //获取当前年份
    var month = tody.getMonth() + 1; //获取当前月份
    var day = tody.getDate(); //获取当前日
    var allday = 0;
    const doWhat = document.querySelector(".do");
    const calender_box = document.querySelector(".calender-box");
    var calender_do=document.querySelector('.do-time');
    function showmonth() {
      if (month < 10) {
        //给小于10的数字前面加0
        var year_month = year + " 年 " + "0" + month + " 月 ";
      } else {
        var year_month = year + " 年 " + month + " 月 ";
      }
      document.getElementById("month").innerHTML = year_month; //当前年月赋到页面
    }

    function count() {
      if (month != 2) {
        if (month == 4 || month == 6 || month == 9 || month == 11)
          //判断月是30天还是31天,2月除外
          allday = 30;
        else allday = 31;
      } else {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
          //判断是否是闰年，进行相应的改变
          allday = 29;
        else allday = 28;
      }
    }
    //显示相应月份的天数
    function showday() {
      showmonth();
      count();
      // 获取每个月的1号
      var fistdate = new Date(year, month - 1, 1);
      //   console.log(fistdate);
      //   getDay()返回星期几
      var xinqi = fistdate.getDay();
      //   console.log(xinqi);
      var daterow = document.getElementById("day");

      for (
        var i = 0;
        i < xinqi;
        i++ //循环输出天数
      ) {
        console.log(xinqi);
        var dayElement = document.createElement("div");
        dayElement.className = "evrday";
        // 星期为多少 就为星期前面创建多少个空盒子
        daterow.appendChild(dayElement);
        console.log(daterow);
      }
     
      //   为每月的时间添加盒子 allday每个月份的天数
      for (var j = 1; j <= allday; j++) {
        var dayElement = document.createElement("div");
        if (j < 10) {
          //给小于10的数字前面加0
          dayElement.innerHTML = "0" + j;
        } else {
          dayElement.innerHTML = j;
        }

        dayElement.className = "evrday";
        if (j == day)
          //当前日，标红
         { dayElement.style.color = "#dfa46e";
          dayElement.style.backgroundColor = "#f5e5ac";
        }
        dayElement.style.borderRadius = "50%";
        daterow.appendChild(dayElement);
      }
      var clickDay = document.querySelectorAll("#day .evrday");
      for (let z = 0; z < clickDay.length; z++) {
      // console.log(clickDay[z]);
        clickDay[z].addEventListener("click", function (e) {
            e.stopPropagation();
            for (var i = 0; i < clickDay.length; i++) {
                if(clickDay[z].innerHTML !== day){
                    clickDay[i].style.backgroundColor = '';
                }
            }
            this.style.backgroundColor = '#f5e5ac';
        //   alert(document.getElementById("month").innerHTML+clickDay[z].innerHTML+"日");
          calender_do.innerHTML="日期："+document.getElementById("month").innerHTML+clickDay[z].innerHTML+"日";
          doWhat.style.display="block";
        });
       
        // 本天不显示其他效果
        if(clickDay[z].innerHTML == day){
            clickDay[z].addEventListener("mouseover", function () {
                clickDay[z].style.backgroundColor="#f5e5ac";
            })
        }
        // 1号前面多余的盒子显示
        if(clickDay[z].innerHTML == ""){
            clickDay[z].addEventListener("mouseover", function () {
                clickDay[z].style.backgroundColor="transparent";
            })
        }
      }
      document.addEventListener('click',function(){
        doWhat.style.display="none";
    })
    doWhat.addEventListener('click',function(e){
        e.stopPropagation();
    })
    calender_box.addEventListener('click',function(e){
        e.stopPropagation();
    })
     
    }
    showday();

    //下个月
    function next() {
      document.getElementById("day").innerHTML = ""; //先清空day里面的内容
      if (month < 12) {
        month = month + 1;
      } else {
        month = 1;
        year = year + 1;
      }
      showday(); //再把下个月的月份放到day里
    }
    //上个月
    function prev() {
      document.getElementById("day").innerHTML = "";
      if (month > 1) {
        month = month - 1;
      } else {
        month = 12;
        year = year - 1;
      }
      showday();}

      const pre_mon=document.querySelector('.pre-mon');
      const nex_mon=document.querySelector('.next-mon');
      pre_mon.addEventListener('click',function(){
        prev();
      })
      nex_mon.addEventListener('click',function(){
        next();
      })
})