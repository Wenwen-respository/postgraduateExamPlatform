window.addEventListener('load', function () {

    // map中国地图上的点击事件，点击省份，右边会弹出一个该省份的高校信息
    var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen'];
    var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门'];
    let map = this.document.querySelector('.map'),
        info_box = this.document.querySelector('.info-box');

    for (let i = 0; i < provincesText.length; i++) {
        // 根据省份数量创建省份点元素
        let province_dotted = this.document.createElement('div');
        province_dotted.className = 'province-dotted';
        // province_dotted内的元素
        let tip = this.document.createElement('span');
        tip.innerHTML = provincesText[i];
        province_dotted.append(tip);
        let pulse1 = this.document.createElement('div');
        pulse1.className = 'pulse1';
        province_dotted.append(pulse1);
        let pulse2 = this.document.createElement('div');
        pulse2.className = 'pulse2';
        province_dotted.append(pulse2);
        map.append(province_dotted);
        // 点击对应的省份点，右侧出现相应盒子
        province_dotted.onclick = function () {
            info_box.style.display = 'block';
            info_box.children[0].innerHTML = province_dotted.children[0].innerHTML;
        }
        province_dotted.onmouseenter = function (e) {
            province_dotted.children[0].style.animationName = 'appear';
            province_dotted.children[0].style.animationDuration = '1s';
            province_dotted.children[0].style.opacity = '0.9';
            province_dotted.children[0].style.display = 'block';
            province_dotted.style.zIndex = '3';

        }
        province_dotted.onmouseleave = function (e) {
            province_dotted.children[0].style.animationName = 'disappear';
            province_dotted.children[0].style.animationDuration = '1s';
            province_dotted.children[0].style.opacity = '0';
            province_dotted.children[0].style.display = 'none';
            province_dotted.style.zIndex = '2';

        }
    }
    console.log(map);
    // school盒子的轮播图效果
    let school_ul = this.document.querySelector('.school-ul'),
        school_name_lis = this.document.querySelector('.info-content-ul').querySelectorAll('li'),
        school_left_buttons = this.document.querySelectorAll('.left-school-button'),
        school_right_buttons = this.document.querySelectorAll('.right-school-button');

    let step = 1536;
    for (let i = 0; i < school_name_lis.length; i++) {
        school_name_lis[i].addEventListener('click', function () {
            school_ul.style.left = -step + 'px';
        })
    }
    for (let i = 0; i < 2; i++) {
        school_left_buttons[i].addEventListener('click', function () {
            school_ul.style.left = -step * i + 'px';
        })
        school_right_buttons[i].addEventListener('click', function () {
            school_ul.style.left = -step * (i + 2) + 'px';
        })
    }

    // school板块的滚动事件
    this.window.addEventListener('scroll', function () {
        if (window.pageYOffset > 1250) {
            info_box.style.display = 'none';
        }
        // console.log(window.pageYOffset);
    })


        // 真题
        var num=1;
        function real(real_topic,real_type,real_doc,href){
          const real_ul=document.querySelector('.real-wrap');
          let real_li=document.createElement('li');
          real_li.innerHTML=" <p class='topic'>"+real_topic+"</p><p class='real-exp'><span class='real-bgc'><i class='iconfont'>&#xe6a5;</i>"+real_type+"</span><span class='real-bgc'><i class='iconfont'>&#xe621;</i>"+real_doc+"</span></p><p class='real-tools'><span class='pre'><i class='iconfont'>&#xec86;</i>预览</span><span><a href='"+href+"'download='"+href+"'><i class='iconfont'>&#xe855;</i>下载</a></span></p>"
          if(document.querySelectorAll('.real-wrap li').length<10*num){
            real_ul.appendChild(real_li);
            // let f=ifme;
            // f();
              // 重复代码很多 这个函数 没有用到在不同函数调用同一个封装函数
            //   function ifme(){
            //     let pre=document.querySelectorAll('.pre');
            //     for(let i=0;i<pre.length;i++){
            //         pre[i].addEventListener('click',function(){
            //             window.open('../iframe.html');
            //         })
            //     }
                
            // }
            // ifme();
          }
        }

        // // 展开更多
        const more=document.querySelector('.next-real');
        const real_ban=document.querySelector('.real-ban');
        real_ban.addEventListener('scroll',function(){
          if(document.querySelectorAll('.real-wrap li').length<10*num){
               real();
          }
          // 出现
          if(document.querySelectorAll('.real-wrap li').length>7){
            more.style.display="block";
          }
        })
        // 点击展开更多传入
        more.addEventListener('click',function(){
          num++;
          console.log(num);
          real();
        })

        
      
})