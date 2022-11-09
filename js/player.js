// 收音机音乐播放器的js
window.addEventListener('load', function () {
    // 要操作的元素
    let play_pause = this.document.querySelector('.play-pause'),
        player_track = this.document.querySelector('.player-track'),
        album_cover = this.document.querySelector('.album-cover'),
        album_name = this.document.querySelector('.album-name'),
        track_name = this.document.querySelector('.track-name'),
        track_time = this.document.querySelector('.track-time'),
        current_time = this.document.querySelector('.current-time'),
        total_time = this.document.querySelector('.total-time'),
        progress_box = this.document.querySelector('.progress-box'),
        hover_time = this.document.querySelector('.hover-time'),
        hover_bar = this.document.querySelector('.hover-bar'),
        progress_bar = this.document.querySelector('.progress-bar'),
        play_prev = this.document.querySelector('.play-prev'),
        play_next = this.document.querySelector('.play-next'),
        radio_circle = this.document.querySelector('#radio-circle');
    radio_wraper = this.document.querySelector('.radio-wraper');

    // 专辑名数组
    let albums = ['听雨', '南乡子', '待花开','仙后 - 豆花之歌（翻自 Pianoboy高至豪）'];
    // 歌曲信息数组(歌手)
    let track_names = ['长风-听雨（纯音乐）', '雁夜风-南乡子', '白鸿-待花开','仙后 '];

    // 定义变量
    let progress_t, //鼠标在进度条上悬停的位置
        progress_loc, //鼠标在进度条上悬停的音频位置
        c_m, //悬停音频位置(分钟)
        ct_minutes, //悬停播放位置(分)
        ct_seconds, //悬停播放位置(秒)
        cur_minutes, //当前播放时间(分)
        cur_seconds, //当前播放时间(秒)
        dur_minutes, //音频总时长(分)
        dur_seconds, //音频总时长(秒)
        play_progress; //播放进度
    // 当前歌曲下标
    let cur_index = -1;

    // 定义音频对象
    var audio;
    // 初始化
    function initPlayer() {
        audio = new Audio(); //创建音频对象
        audio.loop = true; //循环播放

        // 初始化切换歌曲 传入flag=0
        selectTrack(0);
        // 绑定播放暂停按钮的点击事件
        play_pause.addEventListener('click', playPause);
        // 进度条鼠标移动事件
        progress_box.addEventListener('mousemove', function (e) {
            showHover(e);
        });
        // 进度条鼠标离开事件
        progress_box.addEventListener('mouseout', hideHover);
        // 进度条点击事件
        progress_box.addEventListener('click', playFromClickedPos);
        // 音频播放位置改变事件
        audio.addEventListener('timeupdate', updateCurTime);
        // 上一首按钮点击事件
        play_prev.addEventListener('click', function () {
            selectTrack(-1);
        });
        // 下一首按钮点击事件
        play_next.addEventListener('click', function () {
            selectTrack(1);
        });
    }

    // 播放暂停
    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                player_track.classList.add('active');
                play_pause.querySelector('.fa').classList = 'fa fa-pause';
                album_cover.classList.add('active');
                audio.play();
            } else {
                player_track.classList.remove('active');
                play_pause.querySelector('.fa').classList = 'fa fa-play';
                album_cover.classList.remove('active');
                audio.pause();
            }
        }, 300); // 点击以后不会立即执行，要等个0.3秒
    }

    // 显示悬停播放位置弹层
    function showHover(e) {
        // 计算鼠标在进度条上的悬停位置(当前鼠标的X坐标-进度条在窗口中的left位置)
        progress_t = e.clientX - progress_box.getBoundingClientRect().left;
        // 计算鼠标在进度条上悬停时的音频位置
        // audio.duration 音频总时长
        progress_loc = audio.duration * (progress_t / progress_box.getBoundingClientRect().width);
        // 设置悬停进度条的宽度(较深部分)
        hover_bar.style.width = progress_t + 'px';
        // 将悬停音频位置转为分钟
        c_m = progress_loc / 60;
        ct_minutes = Math.floor(c_m); //分
        ct_seconds = Math.floor(progress_loc - ct_minutes * 60); //秒

        if (ct_minutes < 10) {
            ct_minutes = '0' + ct_minutes;
        }
        if (ct_seconds < 10) {
            ct_seconds = '0' + ct_seconds;
        }
        if (isNaN(ct_minutes) || isNaN(ct_seconds)) {
            hover_time.innerText = '--:--';
        } else {
            hover_time.innerText = ct_minutes + ':' + ct_seconds;
        }

        // 设置悬停播放位置弹层的位置并显示
        hover_time.style.left = progress_t + 'px';
        hover_time.style.marginLeft = '-20px';
        hover_time.style.display = 'block';
    }

    // 隐藏悬停播放位置弹层
    function hideHover() {
        hover_bar.style.width = '0px';
        hover_time.innerText = '00:00';
        hover_time.style.left = '0px';
        hover_time.style.marginLeft = '0px';
        hover_time.style.display = 'none';
    }

    // 从点击的位置开始播放
    function playFromClickedPos() {
        // 设置当前播放时间
        audio.currentTime = progress_loc;
        // 设置进度条宽度
        progress_bar.style.width = progress_t + 'px';
        // 隐藏悬停播放位置弹层
        hideHover();
    }

    // 改变当前播放时间
    function updateCurTime() {
        // 当前播放时间(分)
        cur_minutes = Math.floor(audio.currentTime / 60);
        // 当前播放时间(秒)
        cur_seconds = Math.floor(audio.currentTime - cur_minutes * 60);
        // 音频总时长(分)
        dur_minutes = Math.floor(audio.duration / 60);
        // 音频总时长(秒)
        dur_seconds = Math.floor(audio.duration - dur_minutes * 60);
        // 计算播放进度
        play_progress = audio.currentTime / audio.duration * 100;

        if (cur_minutes < 10) {
            cur_minutes = '0' + cur_minutes;
        }
        if (cur_seconds < 10) {
            cur_seconds = '0' + cur_seconds;
        }
        if (dur_minutes < 10) {
            dur_minutes = '0' + dur_minutes;
        }
        if (dur_seconds < 10) {
            dur_seconds = '0' + dur_seconds;
        }

        // 设置播放时间
        if (isNaN(cur_minutes) || isNaN(cur_seconds)) {
            current_time.innerText = '00:00';
        } else {
            current_time.innerText = cur_minutes + ':' + cur_seconds;
        }
        // 设置总时长
        if (isNaN(dur_minutes) || isNaN(dur_seconds)) {
            total_time.innerText = '00:00';
        } else {
            total_time.innerText = dur_minutes + ':' + dur_seconds;
        }
        // 设置进度条宽度
        progress_bar.style.width = play_progress + '%';

        // 播放完毕, 恢复样式
        if (play_progress == 100) {
            play_pause.querySelector('.fa').classList = 'fa fa-play';
            progress_bar.style.width = '0px';
            current_time.innerText = '00:00';
            player_track.classList.remove('active');
            album_cover.classList.remove('active');
        }
    }

    // 切换歌曲(flag: 0=初始, 1=下一首, -1=上一首)
    function selectTrack(flag) {
        if (flag == 0 || flag == 1) {
            cur_index++;
        } else {
            cur_index--;
        }

        if (cur_index > -1 && cur_index < albums.length) {
            if (flag == 0) {
                play_pause.querySelector('.fa').classList = 'fa fa-play';
            } else {
                play_pause.querySelector('.fa').classList = 'fa fa-pause';
            }
            progress_bar.style.width = '0px';
            current_time.innerText = '00:00';
            total_time.innerText = '00:00';
            // 当前专辑名
            let cur_album = albums[cur_index];
            // 当前歌曲信息(歌手 - 歌名)
            let cur_track_name = track_names[cur_index];
            // 设置音频路径
            audio.src = './mp3/' + cur_album + '.mp3';
            if (flag != 0) {
                // 当切换上一首,下一首时,自动播放
                audio.play();
                player_track.classList.add('active');
                album_cover.classList.add('active');
            }

            // 设置专辑名
            album_name.innerText = cur_album;
            // 设置歌曲信息
            track_name.innerText = cur_track_name;
            // 设置封面
            album_cover.querySelector('.active').classList.remove('active');
            album_cover.getElementsByTagName('img')[cur_index] ? album_cover.getElementsByTagName('img')[cur_index].classList.add('active') : album_cover.getElementsByTagName('img')[0].classList.add('active');

        } else {
            // 切换溢出专辑数组时, 恢复cur_index
            if (flag == 0 || flag == 1) {
                cur_index--;
            } else {
                cur_index++;
            }
        }

    }

    // 初始化播放器
    initPlayer();

})