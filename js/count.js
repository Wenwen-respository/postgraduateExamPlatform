window.addEventListener('load', function () {
    function room(num) {
        let innerContent = document.querySelector('.discuss-room-inner-bg');
        console.log(innerContent.innerHTML);
        innerContent.innerHTML = "<img src='./images/" + num + ".png' alt=''>";
        let dots = document.querySelectorAll('.dotted');
        let friend_info = this.document.querySelector('.friend-info');
        // console.log(dots);
        for (let i = 0; i < num; i++) {
            // 点击人身上的时候会浮现它的信息
            dots[i].addEventListener('click', function (e) {
                e.stopPropagation();
                friend_info.style.display = 'block';
            })
        }
    }
    room(10);


})