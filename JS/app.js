const wrapper = document.querySelector(".wrapper"),
    musicImg = document.querySelector(".img-area img"),
    musicName = document.querySelector(".song-details .name"),
    musicArtist = document.querySelector(".song-details .artist"),
    mainAudio = document.querySelector("#main-audio"),
    playPauseBtn = document.querySelector(".play-pause"),
    prevBTN = document.querySelector("#prev"),
    nextBTN = document.querySelector("#next"),
    progressArea = document.querySelector(".progress-area"),
    progressBar = document.querySelector(".progress-bar"),
    musicList = document.querySelector(".music-list"),
    showMoreBtn = document.querySelector("#more-music"),
    hideMusicBtn = document.querySelector("#close");


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow()
})

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `assets/imagenes/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `assets/musica/${allMusic[indexNumb - 1].src}.mp3`;
}

//function play

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//function pause

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//next 

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex);
    playMusic()
    playingNow()
}

//prev
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex);
    playMusic()
    playingNow()
}

//play
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow()
});

//next
nextBTN.addEventListener("click", () => {
    nextMusic();
})

//prev
prevBTN.addEventListener("click", () => {
    prevMusic();
})

//update

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = document.querySelector(".current")
    musicDuration = document.querySelector(".duration")

    mainAudio.addEventListener("loadeddata", () => {
        //duración total
        let audioDuration = mainAudio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`

    });

    //duración total
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if (currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
});

progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth
    let clickedOffSetX = e.offsetX
    let songDuration = mainAudio.duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration
    playMusic()
});

const repeatBtn = document.querySelector("#repeat-plist")
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one"
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle"
            repeatBtn.setAttribute("title", "Playback shuffle")
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat"
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
    }
});

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText
    switch (getText) {
        case "repeat":
            nextMusic()
            break;
        case "repeat_one":
            mainAudio.currentTime = 0
            loadMusic(musicIndex)
            playMusic()
            break;
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1)
            } while (musicIndex == randIndex)
            musicIndex = randIndex
            loadMusic(musicIndex)
            playMusic()
            playingNow()
            break;
    }
});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show")
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click()
});

const ulTag = document.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                       <span>${allMusic[i].name}</span>
                       <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="assets/musica/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}" class="audio-duration">3:18</span>
                </li>`
    ulTag.insertAdjacentHTML("beforeend", liTag)

    let liAudioDuration = document.querySelector(`#${allMusic[i].src}`)
    let liAudioTag = document.querySelector(`.${allMusic[i].src}`)

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
    });
}

const allLiTags = document.querySelectorAll("li")

function playingNow() {
    for (let j = 0; j < allLiTags.length; j++) {
        let audioTag = allLiTags[j].querySelector(".audio-duration")
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing")
            let audioDuration = audioTag.getAttribute("t-duration")
            audioTag.innerText = audioDuration
        }

        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing")
            audioTag.innerText = "Playing"
        }

        allLiTags[j].setAttribute("onclick", "clicked(this)")
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index")
    musicIndex = getLiIndex
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}