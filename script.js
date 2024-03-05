const minSongId = 0;
const maxSongId = 9;    
let currSongId = null;  
let prevPlayIcon = null;    
let isPlaying = false;  
const audioCount = document.getElementsByClassName("myaudio").length - 1;
let currSongIndex = null;
var currTime = 0;
var sliderVal = 0;
let myIntervalFun = null;
let divisionFactor = 1;


const playButton = document.getElementById("masterPlay");
playButton.addEventListener('click', function(){
    if (currSongId == null) {
        currSongId = "testaudio0";
        prevPlayIcon= document.getElementsByClassName("songItemPlay")[0];
        currSongIndex = 0;
    }
    const currSong = document.getElementById(currSongId);

    if(isPlaying == false) {
        currSong.play();
        audioTimeBar(currSong, currTime);
         isPlaying = true;
        changePlayPauseIcon(playButton, 'playtopause');
        changePlayPauseIcon(prevPlayIcon, 'playtopause');
    } else {
        currSong.pause();
        isPlaying = false;
        changePlayPauseIcon(playButton, 'pausetoplay');
        changePlayPauseIcon(prevPlayIcon, 'pausetoplay');
    }
});

function playMe(songIndex) {
    songIndex = parseInt(songIndex);
    currSongIndex = songIndex;
    const audios = document.getElementsByClassName("myaudio");
    const myAudio = audios[songIndex];

    const smallPlayBtns = document.getElementsByClassName("songItemPlay");
    const mySmallPlayBtn = smallPlayBtns[songIndex];

    if (currSongId == null) {
        currSongId = myAudio.id;
        prevPlayIcon = mySmallPlayBtn;
    } else if (currSongId != myAudio.id) {
        document.getElementById(currSongId).pause();
        currSongId = myAudio.id;
        isPlaying = false;
        currTime = 0;
        sliderVal = 0;
        changePlayPauseIcon(prevPlayIcon, "pausetoplay");
        changePlayPauseIcon(playButton, "pausetoplay");
    }

    if(isPlaying == false) {
        if (myIntervalFun != null) {
            clearInterval(myIntervalFun);
            myIntervalFun = null;
        }
        myAudio.play();
        audioTimeBar(myAudio, currTime);
        isPlaying = true;
        changePlayPauseIcon(mySmallPlayBtn, "playtopause");
        changePlayPauseIcon(playButton, 'playtopause');
        prevPlayIcon = mySmallPlayBtn;
    } else {
        if (myIntervalFun != null) {
            clearInterval(myIntervalFun);
            myIntervalFun = null;
        }
        myAudio.pause();
        isPlaying = false;
        changePlayPauseIcon(mySmallPlayBtn, "pausetoplay");
        changePlayPauseIcon(playButton, "pausetoplay");
    }
}

function changePlayPauseIcon(element, flag) {
    if(flag == "playtopause") {
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    } else {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    }
}

const prevButton = document.getElementById("previous");
prevButton.addEventListener('click', function() {
    if (currSongIndex == 0) {
        currSongIndex = audioCount;
    } else {
        currSongIndex = currSongIndex - 1;
    }
    playMe(currSongIndex);
});

const nextButton = document.getElementById('next');
nextButton.addEventListener('click', function() {
    if (currSongIndex == audioCount) {
        currSongIndex = 0;
    } else {
        currSongIndex = currSongIndex + 1;
    }
    playMe(currSongIndex);
});

function audioTimeBar(audio, timeValue) {
    const totalDuration = audio.duration;
    divisionFactor = Math.ceil(totalDuration * 10);

    audio.currentTime = timeValue;
    console.log("duration: ", totalDuration);
    console.log("division factor : ", divisionFactor);
    console.log("currentTime : ", audio.currentTime);
    myIntervalFun = setInterval(function () {
        if(isPlaying == true) {
            currTime = audio.currentTime;

            sliderVal = Math.ceil((currTime * 1000 ) / divisionFactor);
            console.log("Slider Value : ", sliderVal);
            document.getElementById("myProgressBar").value = sliderVal;
        }
    }, 500);
}


var slider = document.getElementById("myProgressBar");
let audioPlayTime = 0;
slider.oninput = function() {
    console.log(slider.value);
    //output.innerHTML = this.value;
    console.log("division factor : ", divisionFactor);
    audioPlayTime = (slider.value * divisionFactor) / 1000;
    const currSong = document.getElementById(currSongId);
    if (myIntervalFun != null) {
        clearInterval(myIntervalFun);
        myIntervalFun = null;
    }
    console.log("Audioplay time : ", audioPlayTime);
    audioTimeBar(currSong, audioPlayTime);
}

