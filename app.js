let currentMusics = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songname = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

var e = document.querySelector(".volume-slider-con");
var eInner = document.querySelector(".volume-slider");

var drag = false;
e.addEventListener("mousedown", function (ev) {
  drag = true;
  updateBar(ev.clientX);
});
document.addEventListener("mousemove", function (ev) {
  if (drag) {
    updateBar(ev.clientX);
  }
});
document.addEventListener("mouseup", function (ev) {
  drag = false;
});

var updateBar = function (x, vol) {
  var volume = e;

  //ตัวเลข 0-1 ขึ้นอยู่กับตัวแปร Percentage
  var percentage;

  //ใช้ if เพื่อดักค่าเสียงที่ได้รับจากการเลื่อนเสียง
  if (vol) {
    percentage = vol * 100;
  } else {
    var position = x - volume.offsetLeft;
    percentage = (100 * position) / volume.clientWidth;
  }

  if (percentage > 100) {
    percentage = 100;
  }
  if (percentage < 0) {
    percentage = 0;
  }

  eInner.style.width = percentage + "%";

  //ปรับเสียงเพลงที่นี่
  music.volume = percentage / 100;
}


playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.volume = 0.5;
        music.play();
    } 
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})
const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songname.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    },300);
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time/60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time%60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}
setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime)
},500)

seekBar.addEventListener('change' , () => {
    music.currentTime = seekBar.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}

forwardBtn.addEventListener('click',() => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } 
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backwardBtn.addEventListener('click',() => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } 
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})