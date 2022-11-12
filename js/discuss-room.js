window.addEventListener('load', function () {
    // 点击搜索框左侧分类按钮，出现二级菜单
    // let class_btn = this.document.querySelector('.class');
    // let class_hiddenBox = this.document.querySelector('.class-hiddenBox');
    // let class_hiddenBox_lis = this.document.querySelector('.class-hiddenBox').querySelectorAll('li');
    // console.log(class_btn);
    // class_btn.addEventListener('click', function (e) {
    //     e.stopPropagation();
    //     if (class_hiddenBox.classList.contains('active')) {
    //         class_hiddenBox.classList.remove('active');
    //     } else {
    //         class_hiddenBox.classList.add('active');
    //     }
    // })
    // for (let i = 0; i < class_hiddenBox_lis.length; i++) {
    //     class_hiddenBox_lis[i].addEventListener('click', function () {
    //         class_btn.innerHTML = `${class_hiddenBox_lis[i].innerHTML}<i class="class-arrow"></i>`;
    //     })
    // }
    // 点击页面其他地方，二级菜单收起来
    // this.document.body.addEventListener('click', function () {
    //     class_hiddenBox.classList.remove('active');
    // })

    // 点击新建房间来新建房间
    let new_create = this.document.querySelector('.new-create');
    let new_create_box = this.document.querySelector('.new-create-box');
    // 完成创建按钮
    let create_button = this.document.querySelector('.create-button');
    // 黑色遮罩层
    let black_mask = this.document.querySelector('.black-mask');
    // console.log(new_create);
    new_create.addEventListener('click', function (e) {
        e.stopPropagation();
        new_create_box.classList.remove('active2');
        new_create_box.classList.add('active1');
        black_mask.style.opacity = '0.3';
        black_mask.style.zIndex = '2';
    })
    this.document.body.addEventListener('click', function (e) {
        e.stopPropagation();
        new_create_box.classList.remove('active1');
        new_create_box.classList.add('active2');
        black_mask.style.opacity = '0';
        black_mask.style.zIndex = '-1';
    })
    create_button.addEventListener('click', function (e) {
        e.stopPropagation();
        new_create_box.classList.remove('active1');
        new_create_box.classList.add('active2');
        black_mask.style.opacity = '0';
        black_mask.style.zIndex = '-1';
    })
    new_create_box.addEventListener('click', function (e) {
        e.stopPropagation();
    })

    // 点击跳转到讨论房内部
    let enter = this.document.querySelectorAll('.enter-box');
    console.log(enter);
    for (let i = 0; i < enter.length; i++) {
        enter[i].addEventListener('click', function () {
            setTimeout(function () {
                window.open('./discuss-room-inner.html');
            }, 500);
        })
    }

    // 点击云层散开 
    let cloud_groups = this.document.querySelectorAll('.cloud-group');
    console.log(cloud_groups);
    // cloud_groups.forEach(function (item, index, arr) {
    //     item.addEventListener('click', function () {
    //         arr[index].classList.add('active');
    //     })
    // })
    for (let i = 0; i < cloud_groups.length; i++) {
        cloud_groups[i].addEventListener('click', function () {
            for (let i = 0; i < cloud_groups.length; i++) {
                cloud_groups[i].classList.add('active');
            }
        })
    }
})