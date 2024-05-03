console.log("Audify - A Music Player Application");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let toggleButton = document.getElementById('toggleButton');
const addTaskButton = document.getElementById('addTaskButton');

let songs = 
[
    {songName: "NCS - Warriyo [BGM]", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.webp"},
    {songName: "My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.webp"},
    {songName: "Janji", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Songuehrru", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "NeverEverr", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "ABSBS", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "BackGround", filePath: "songs/2.mp3", coverPath: "covers/9.webp"},
    {songName: "No CopyRight Sounds - Special", filePath: "songs/4.mp3", coverPath: "covers/10.webp"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// toggleButton.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// });

function darkMode() {
    var body = document.body;
    body.style.backgroundColor = body.style.backgroundColor === 'black' ? 'white' : 'black';
}


document.getElementById('sort').addEventListener('click', function() {
    songs.sort(function(a, b) {
        return a.songName.localeCompare(b.songName);
    });
    console.log(songs);

    // Update the songItems with the sorted songs
    songItems.forEach((element, i)=>{ 
        element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    })
});

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        let listeningDiv = document.querySelector('.listening');
        listeningDiv.innerHTML = `<img src="${songs[songIndex].coverPath}" alt="Listening to" id="listeningGif">
                                  <div>
                                      <span class="timestamp" style="color: green;">${audioElement.duration}</span>
                                      <span style="color: green;">${songs[songIndex].songName}</span>
                                  </div>`;
    })
})


let currentPlaylist = [];

function createPlayListButton() {
    currentPlaylist = [];
    updatePlaylist();
}

function addToPlaylist() {
    var playlistContainer = document.getElementById('playlistContainer');
    var playlistItem = document.createElement('div');
    playlistItem.textContent = songs[songIndex].songName;
    playlistItem.addEventListener('click', function() {
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
    });
    playlistContainer.appendChild(playlistItem);
}

function removeFromPlaylist(songName) {
    if (!songName) {
        currentPlaylist.pop();
    } else {
        let songIndex = currentPlaylist.findIndex(song => song.songName === songName);
        if (songIndex !== -1) {
            currentPlaylist.splice(songIndex, 1);
        }
    }
    updatePlaylist();
}

function updatePlaylist() {
    let playlistContainer = document.getElementById('playlistContainer');
    playlistContainer.innerHTML = '<h1>Playlist</h1>';

    for (let song of currentPlaylist) {
        let songElement = document.createElement('p');
        songElement.innerText = song.name;
        playlistContainer.appendChild(songElement);
    }
}