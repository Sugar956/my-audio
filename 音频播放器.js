var myAudio = new Audio();
myAudio.src = 'data/薛之谦 - 意外.mp3';

var playBtn = document.querySelector('.playNode'),
    playBln = true,
    volumeBtn = document.querySelector('.volumeNode'),
    volumeBln = true,
    trueLine = document.querySelector('.trueLine'),
    outerNode = document.querySelector('.outerNode'),
    progressNode = document.querySelector('.progressNode'),
    topNode = document.querySelector('.topNode'),
    musicName = document.querySelector('.musicName'),
    lastNode = document.querySelector('.lastNode'),
    allTime = document.querySelector('.allTime'),
    currentTime = document.querySelector('.currentTime'),
    nextNode = document.querySelector('.nextNode');

let allMusic = [
    {
        'musicSrc':'data/薛之谦 - 意外.mp3',
        'musicPic':'data/意外.png',
        'musicName':'薛之谦 - 意外'
    }, {
        'musicSrc':'data/薛之谦 - 我好像在哪见过你.mp3',
        'musicPic':'data/我好像在哪见过你.png',
        'musicName':'薛之谦 - 我好像在哪见过你'
    },{
        'musicSrc':'data/薛之谦 - 暧昧.mp3',
        'musicPic':'data/暧昧.jpg',
        'musicName':'薛之谦 - 暧昧'
    },{
        'musicSrc':'data/薛之谦 - 木偶人.mp3',
        'musicPic':'data/木偶人.png',
        'musicName':'薛之谦 - 木偶人'
    },{
        'musicSrc':'data/薛之谦 - 演员.mp3',
        'musicPic':'data/演员.png',
        'musicName':'薛之谦 - 演员'
    },{
        'musicSrc':'data/薛之谦 - 病态.mp3',
        'musicPic':'data/病态.png',
        'musicName':'薛之谦 - 病态'
    }
];
var Index = 0;
// myAudio.src = allMusic[Index].musicSrc;
// topNode.style.backgroundImage = 'url('+allMusic[Index].musicPic+')';
//点击上、下一首
nextNode.onclick = function () {
    Index++;
    if(Index==allMusic.length){
        Index = 0;
    }
  MusicPlay();
};
lastNode.onclick = function () {
    Index--;
    if(Index==-1){
        Index = allMusic.length-1;
    }
    MusicPlay();
};
//封装播放函数
function MusicPlay(){
    myAudio.src = allMusic[Index].musicSrc;
    myAudio.currentTime = 0;
    trueLine.style.width = '0%';
    topNode.style.backgroundImage = 'url(' + allMusic[Index].musicPic + ')';
    musicName.innerHTML = allMusic[Index].musicName;
    if(playBln==false){
        myAudio.play();
        playBtn.className = 'pauseNode';
    }else {
        myAudio.pause();
        playBtn.className = 'playNode';
    }
}

//播放按钮
playBtn.onclick = function () {
    playBln = !playBln;
    if(playBln==false){
        myAudio.play();
        this.className = 'pauseNode';
    }else {
        myAudio.pause();
        this.className = 'playNode';
    }
};
volumeBtn.onclick = function () {
    volumeBln = !volumeBln;
    if(volumeBln==false){
        myAudio.volume = 0;
        this.className = 'no_volumeNode';
    }else {
        myAudio.volume = 1;
        this.className = 'volumeNode';
    }
};
//进度条
myAudio.addEventListener('timeupdate',function () {
    trueLine.style.width = myAudio.currentTime/myAudio.duration*100+'%';
},false);

//点击进度条
progressNode.onclick = function (e) {
    var ev = e||event;
    // console.log(e)
    //获取鼠标点位置减去 外层元素offsetLeft和最外层元素offsetLeft之和即为进度条长度
    trueLine.style.width =
        ((ev.clientX-(this.offsetLeft+outerNode.offsetLeft))/this.offsetWidth*100)+'%';
    myAudio.currentTime =
        myAudio.duration*((ev.clientX-(this.offsetLeft+outerNode.offsetLeft))/this.offsetWidth);
};

//时间显示
//解决时间为NaN的问题
myAudio.addEventListener('canplay',function () {
    var needTime = parseInt(myAudio.duration),
        s = needTime%60,
        m = parseInt(needTime / 60),
        timeNum = ToDou(m)+":"+ToDou(s);
    allTime.innerHTML = timeNum;
},false);
myAudio.addEventListener('timeupdate',function () {

    // allTime.innerHTML = videoNode.duration;
    var needTime = parseInt(myAudio.currentTime),
        s = needTime % 60,
        m = parseInt(needTime/60),
        timeNum = ToDou(m) + ":" + ToDou(s);
    currentTime.innerHTML = timeNum;
},false)
//当时间不足10的时候
function ToDou(time) {
    return time>10?time:'0'+time;
}
//自动播放下一首
myAudio.addEventListener('ended',function () {
    Index++;
    if (Index==allMusic.length){
        Index = 0;
    }
    MusicPlay();
},false);
