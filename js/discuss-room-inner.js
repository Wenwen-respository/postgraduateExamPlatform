window.addEventListener('load', function () {
    // 点击关闭讨论界面
    let discuss_close = this.document.querySelectorAll('.discuss-close');
    // 两个界面
    let discuss_interface = this.document.querySelectorAll('.discuss-interface');
    let group_chat = this.document.querySelector('.group-chat');
    let private_chat = this.document.querySelector('.private-chat');

    for (let i = 0; i < discuss_close.length; i++) {
        discuss_close[i].addEventListener('click', function () {
            for (let i = 0; i < discuss_interface.length; i++) {
                discuss_interface[i].classList.add('active');
            }
        })
    }

    // 点击群聊按钮和私聊按钮，切换模式
    let group_chat_button = this.document.querySelectorAll('.group-chat-button');
    let private_chat_button = this.document.querySelectorAll('.private-chat-button');
    for (let i = 0; i < group_chat_button.length; i++) {
        group_chat_button[i].addEventListener('click', function () {
            group_chat.style.display = 'block';
            private_chat.style.display = 'none';
        })
    }
    for (let i = 0; i < private_chat_button.length; i++) {
        private_chat_button[i].addEventListener('click', function () {
            private_chat.style.display = 'block';
            group_chat.style.display = 'none';
        })
    }
    // group_chat_button
    console.log(group_chat_button);
    console.log(private_chat_button);
    // 点击右上角回到讨论页
    let start_discuss = document.querySelector('.start-discuss');
    start_discuss.addEventListener('click', function () {
        for (let i = 0; i < discuss_interface.length; i++) {
            if (discuss_interface[i].classList.contains('active')) {
                discuss_interface[i].classList.remove('active');
            }
        }
    })

    // 点击按钮返回讨论房首页
    let return_button = this.document.querySelector('.return-button');
    return_button.addEventListener('click', function () {
        setTimeout(function () {
            window.location.href='./index.html';
        }, 500);
    })

    // 让对话区域滚动条保持滚动到最下
    let dialogue = this.document.querySelectorAll('.dialogue');
    // console.log(dialogue);
    for (let i = 0; i < dialogue.length; i++) {
        dialogue[i].scrollTop = dialogue[i].scrollHeight;
    }
    // 点击人身上的时候会浮现它的信息
    let friend_info = this.document.querySelector('.friend-info');
    // let dotted =document.querySelectorAll('.dotted');
    // for (let i = 0; i < dotted.length; i++) {
    //     dotted[i].addEventListener('click', function (e) {
    //         e.stopPropagation();
    //         friend_info.style.display = 'block';
    //     })
    // }

    // 点击其他地方，信息消失
    document.addEventListener('click', function (e) {
        e.preventDefault();
        friend_info.style.display="none";
        friend_info.classList.remove('friend-active');
    })
    
    friend_info.addEventListener('click', function (e) {
        e.stopPropagation();
    })

    // 点击私信跳转到私聊
    let private_letter = this.document.querySelectorAll('.private-letter');
    for (let i = 0; i < private_letter.length; i++) {
        private_letter[i].addEventListener('click', function () {
            // setTimeout(function () {
            //     info_dotted[i].children[0].style.animationName = 'disappear';
            //     info_dotted[i].children[0].style.animationDuration = '1s';
            //     info_dotted[i].children[0].style.opacity = '0';
            //     info_dotted[i].children[0].style.display = 'none';
            // }, 100);
            // 自动出现讨论界面
            for (let i = 0; i < discuss_interface.length; i++) {
                if (discuss_interface[i].classList.contains('active')) {
                    discuss_interface[i].classList.remove('active');
                }
            }
            // 自动点击私聊
            for (let i = 0; i < private_chat_button.length; i++) {
                private_chat_button[i].click();
            }
        })
    }

    // 发送私聊信息
    let bottom_input = this.document.querySelectorAll('.bottom-input');
    let bottom_send = this.document.querySelectorAll('.bottom-send');
    console.log(bottom_send);
    bottom_send[1].addEventListener('click', function (e) {
        e.stopPropagation();
        if (bottom_input[1].value) {
            let speak_right = document.createElement('div');
            speak_right.className = 'speak-right speak';
            let avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.innerHTML = `<img src="./images/user.png" alt="">`;
            speak_right.append(avatar);
            let clearfix1 = document.createElement('div');
            clearfix1.className = 'clearfix';
            clearfix1.innerHTML = `<div class="name">易研为定</div>`;
            speak_right.append(clearfix1);
            let clearfix2 = document.createElement('div');
            clearfix2.className = 'clearfix';
            let remark = document.createElement('div');
            remark.className = 'remark';
            remark.innerHTML = bottom_input[1].value;
            clearfix2.append(remark);
            speak_right.append(clearfix2);
            console.log(speak_right);
            dialogue[1].append(speak_right);
            dialogue[1].scrollTop = dialogue[1].scrollHeight;
        }

    })
    this.window.addEventListener('keydown', function (e) {
        if (e.keyCode == "13") {
            bottom_send[1].click();
        }
        bottom_input[1].value = '';
    })

    // 发送群聊信息
    bottom_send[0].addEventListener('click', function (e) {
        e.stopPropagation();
        if (bottom_input[0].value) {
            let speak_right = document.createElement('div');
            speak_right.className = 'speak-right speak';
            let avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.innerHTML = `<img src="./images/user.png" alt="">`;
            speak_right.append(avatar);
            let clearfix1 = document.createElement('div');
            clearfix1.className = 'clearfix';
            clearfix1.innerHTML = `<div class="name">易研为定</div>`;
            speak_right.append(clearfix1);
            let clearfix2 = document.createElement('div');
            clearfix2.className = 'clearfix';
            let remark = document.createElement('div');
            remark.className = 'remark';
            remark.innerHTML = bottom_input[0].value;
            clearfix2.append(remark);
            speak_right.append(clearfix2);
            console.log(speak_right);
            dialogue[0].append(speak_right);
            dialogue[0].scrollTop = dialogue[0].scrollHeight;
        }
    })
    this.window.addEventListener('keydown', function (e) {
        if (e.keyCode == "13") {
            bottom_send[0].click();
        }
        bottom_input[0].value = '';
    })

//  点击出现修改信息内容
    // const edit = document.querySelector('.edit');
    let edit_bgc = document.querySelector('.edit-bgc');
    let edit_content = document.querySelector('.edit-content')
   

    let avar=document.querySelectorAll('.discuss-interface .sidebar .avatar');
    // console.log(member);
    console.log(avar);
    for(let i=0;i<avar.length;i++){
        avar[i].addEventListener('click',function(){
            console.log(1);
            edit_content.style.opacity = 1;
            edit_content.style.pointerEvents = "auto";
            edit_bgc.style.display = "block";
            edit_content.style.zIndex=1111111111;
        })
    }
    let discuss_cl=document.querySelector('.discuss-cl');
    // 点击其他地方，二级菜单消失
    discuss_cl.onclick = function () {
        edit_content.style.opacity = 0;
        edit_content.style.pointerEvents = "none";
        edit_bgc.style.display = "none";
        // user_info_box.classList.remove('active');
    }
    edit_content.addEventListener('click', function (e) {
        // 二级菜单也要阻止冒泡
        e.stopPropagation();
    })

    function mem(){
        let member=document.querySelectorAll('.member');
        let member_count=document.querySelectorAll('.speak-left .avatar');
        for(let i=0;i<member.length;i++){
            member[i].addEventListener('click',function(e){
                e.stopPropagation();
                let friend_info = document.querySelector('.friend-info');
               friend_info.classList.add('friend-active');
               friend_info.style.display="block";
            })
        }
        for(let i=0;i<member_count.length;i++){
            member_count[i].addEventListener('click',function(e){
                e.stopPropagation();
                let friend_info = document.querySelector('.friend-info');
               friend_info.classList.add('friend-active');
                friend_info.style.display="block";
            })
        }
    }
    mem();
   


    var sf=new Array();
	sf[0] = new Array("广东省","广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|肇庆|惠州|梅州|汕尾|河源|阳江|清远|潮州|揭阳|云浮");
	sf[1]=new Array("上海市","黄浦|卢湾|徐汇|长宁|静安|普陀|闸北|虹口|杨浦|闵行|宝山|嘉定|浦东|金山|松江|青浦|南汇|奉贤|崇明"); 
	sf[2] = new Array("天津市","和平|东丽|河东|西青|河西|津南|南开|北辰|河北|武清|红挢|塘沽|汉沽|大港|宁河|静海|宝坻|蓟县");
	sf[3] = new Array("重庆市","万州|涪陵|渝中|大渡口|江北|沙坪坝|九龙坡|南岸|北碚|万盛|双挢|渝北|巴南|黔江|长寿|綦江|潼南|铜梁 |大足|荣昌|壁山|梁平|城口|丰都|垫江|武隆|忠县|开县|云阳|奉节|巫山|巫溪|石柱|秀山|酉阳|彭水|江津|合川|永川|南川");
	sf[4] = new Array("河北省","石家庄|邯郸|邢台|保定|张家口|承德|廊坊|唐山|秦皇岛|沧州|衡水");
	sf[5] = new Array("山西省","太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城");
	sf[6] = new Array("内蒙古自治区","呼和浩特|包头|乌海|赤峰|呼伦贝尔盟|阿拉善盟|哲里木盟|兴安盟|乌兰察布盟|锡林郭勒盟|巴彦淖尔盟|伊克昭盟");
	sf[7] = new Array("辽宁省","沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛");
	sf[8] = new Array("吉林省","长春|吉林|四平|辽源|通化|白山|松原|白城|延边");
	sf[9] = new Array("黑龙江省","哈尔滨|齐齐哈尔|牡丹江|佳木斯|大庆|绥化|鹤岗|鸡西|黑河|双鸭山|伊春|七台河|大兴安岭");
	sf[10] = new Array("江苏省","南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安");
	sf[11] = new Array("浙江省","杭州|宁波|温州|嘉兴|湖州|绍兴|金华|衢州|舟山|台州|丽水");
	sf[12] = new Array("安徽省","合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州|宿州|池州|淮南|巢湖|阜阳|六安|宣城|亳州");
	sf[13] = new Array("福建省","福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德");
	sf[14] = new Array("江西省","南昌市|景德镇|九江|鹰潭|萍乡|新馀|赣州|吉安|宜春|抚州|上饶");
	sf[15] = new Array("山东省","济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|莱芜|临沂|德州|聊城|滨州|菏泽");
	sf[16] = new Array("河南省","郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|漯河|三门峡|南阳|商丘|信阳|周口|驻马店|济源");
	sf[17] = new Array("湖北省","武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州");
	sf[18] = new Array("湖南省","长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界");
	sf[19] = new Array("北京市","东城|西城|崇文|宣武|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|平谷|怀柔|密云|延庆"); 
	sf[20] = new Array("广西壮族自治区","南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|南宁地区|柳州地区|贺州|百色|河池");
	sf[21] = new Array("海南省","海口|三亚");
	sf[22] = new Array("四川省","成都|绵阳|德阳|自贡|攀枝花|广元|内江|乐山|南充|宜宾|广安|达川|雅安|眉山|甘孜|凉山|泸州");
	sf[23] = new Array("贵州省","贵阳|六盘水|遵义|安顺|铜仁|黔西南|毕节|黔东南|黔南");
	sf[24] = new Array("云南省","昆明|大理|曲靖|玉溪|昭通|楚雄|红河|文山|思茅|西双版纳|保山|德宏|丽江|怒江|迪庆|临沧");
	sf[25] = new Array("西藏自治区","拉萨|日喀则|山南|林芝|昌都|阿里|那曲");
	sf[26] = new Array("陕西省","西安|宝鸡|咸阳|铜川|渭南|延安|榆林|汉中|安康|商洛");
	sf[27] = new Array("甘肃省","兰州|嘉峪关|金昌|白银|天水|酒泉|张掖|武威|定西|陇南|平凉|庆阳|临夏|甘南");
	sf[28] = new Array("宁夏回族自治区","银川|石嘴山|吴忠|固原");
	sf[29] = new Array("青海省","西宁|海东|海南|海北|黄南|玉树|果洛|海西");
	sf[30] = new Array("新疆维吾尔族自治区","乌鲁木齐|石河子|克拉玛依|伊犁|巴音郭勒|昌吉|克孜勒苏柯尔克孜|博尔塔拉|吐鲁番|哈密|喀什|和田|阿克苏");
	sf[31] = new Array("香港特别行政区","香港特别行政区");
	sf[32] = new Array("澳门特别行政区","澳门特别行政区");
	sf[33] = new Array("台湾省","台北|高雄|台中|台南|屏东|南投|云林|新竹|彰化|苗栗|嘉义|花莲|桃园|宜兰|基隆|台东|金门|马祖|澎湖");

    let pro=document.querySelector('#pro');
        pro.addEventListener('change',function(){
        let city=document.querySelector('#city');
            var index = pro.selectedIndex;
            // alert(index)
            var i,j,tmpcity=new Array();
            for(i=0;i<sf.length;i++){
            if(index==i){
                // alert(index);
                tmpcity=sf[i][1].split("|");
                // console.log(sf[i][1]);
                city.innerHTML="";
                for(j=0;j<tmpcity.length;j++){
                    let option=document.createElement('option');
                    option.innerHTML=tmpcity[j];
                    city.appendChild(option);
                }
            }
        }
        })
})