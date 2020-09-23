const background = document.querySelector('#background'); // background derived from album cover below
const thumbnail = document.querySelector('#thumbnail'); // album cover
const song = document.querySelector('#song'); // audio object

const songArtist = document.querySelector('.song-artist'); // element where track artist appears
const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears

songIndex = 0;
songs = ['http://icecast.radiofrance.fr/fip-midfi.mp3',
'http://icecast.radiofrance.fr/fiprock-midfi.mp3',
'http://icecast.radiofrance.fr/fipjazz-midfi.mp3',
'http://icecast.radiofrance.fr/fipgroove-midfi.mp3',
'http://icecast.omroep.nl:80/radio1-bb-aac',
'http://icecast.omroep.nl:80/radio2-bb-aac',
'http://icecast.omroep.nl:80/radio3-bb-aac',
'http://icecast.omroep.nl:80/radio4-bb-aac',
'./assets/music/firstday.mp3'
'./assets/music/dontstartnow.mp3']; // object storing paths for audio objects
thumbnails = ['./assets/images/fip_radio.png',
'./assets/images/fip_rock.png',
'./assets/images/fip_jazz.png',
'./assets/images/fip_groove.png',
'./assets/images/dontstartnow.png',
'./assets/images/radio1.png',
'./assets/images/radio2.png',
'./assets/images/radio3.png'
'./assets/images/radio4.png',
'./assets/images/amlife.png'
'./assets/images/dontstartnow.png']; // object storing paths for album covers and backgrounds
songArtists = ['FIP Stream 1',
'FIP Stream 2',
'FIP Stream 3',
'FIP Stream 4',
'NPO',
'NPO',
'NPO',
'NPO',
'WBEZ'
'Dua Lipa']; // object storing track artists
songTitles = ['Radio',
'Rock',
'Jazz',
'Groove',
'Radio 1',
'Radio 2',
'Radio 3',
'Radio 4',
'This American Life'
'Dont Start Now']; // object storing track titles

// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"

        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track
function nextSong() {
    songIndex++;
    if (songIndex > 6) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 6;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};
