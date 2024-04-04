// data about the songs (it should all be in a database)
const titles = ["On & On", "Heroes Tonight", "Invincible", "My Heart"]
const authors = ["Cartoon, Jéja, Daniel Levi", "Janji, Johnning", "DEAF KEV", "Different Heaven & EH!DE"]
const bgColors = ["#FFF", "#e6c993", "#AFE0FF", "#C7A0C7"];
const descriptions = [
    "Morbi et fringilla eros. Fusce laoreet, neque at lacinia convallis, risus nisi semper nibh, eu mollis velit purus eget lectus. Phasellus interdum pretium elementum. Donec rhoncus, dolor id bibendum ullamcorper, enim enim imperdiet urna, vel tincidunt mi odio vel nunc. Proin laoreet ultrices lectus, vitae gravida massa hendrerit accumsan.",
    "Praesent auctor metus mattis metus viverra iaculis. Pellentesque aliquet pharetra consequat. Phasellus maximus vulputate rhoncus. Vivamus non eleifend augue. Mauris facilisis iaculis ipsum, eget hendrerit nisi condimentum at. Morbi at efficitur augue, nec iaculis mauris. Aliquam id varius eros. Pellentesque cursus pulvinar augue ac rutrum.",
    "Morbi eu metus tristique, dictum nibh eget, posuere metus. Quisque eget ante ut sem pulvinar porttitor a in leo. Ut elementum, mauris ut pulvinar accumsan, neque massa fringilla sapien, quis tempus mauris turpis suscipit quam. Praesent consectetur condimentum justo a pretium. Etiam tellus elit, pharetra ac eleifend nec, lacinia nec elit.",
    "Vivamus laoreet ligula et augue varius faucibus. Maecenas vestibulum turpis a nibh lobortis, et tincidunt massa laoreet. Donec ultricies fringilla nibh, lacinia suscipit nibh egestas eu. Nulla hendrerit felis vel tristique pellentesque. Proin id ante nec elit vulputate laoreet. Sed urna metus, luctus quis faucibus varius, porttitor vitae dui."
]
const songFiles = ["Assets/Songs/Cartoon, Jéja - On & On (feat. Daniel Levi) [NCS Release].mp3", 
    "Assets/Songs/Janji - Heroes Tonight (feat. Johnning) [NCS Release].mp3", 
    "Assets/Songs/DEAF KEV - Invincible [NCS Release].mp3", 
    "Assets/Songs/Different Heaven & EH!DE - My Heart [NCS Release].mp3"]


let isPlaying; // whether a song is being played or not
let currentSongIndex; // the index of the current song
// frequently used objects
let musicPlayer, progressSlider, currentTimeDisplay, totalDurationDisplay;

// when the window is loaded, get the objects and initialize the page content
window.onload = function(){
    musicPlayer = document.getElementById("musicPlayer");
    progressSlider = document.getElementById("progressSlider");
    currentTimeDisplay = document.getElementById("currentTime");
    totalDurationDisplay = document.getElementById("totalDuration");

    initialize();
}

// function to initialize page content
function initialize(){
    // create the list of songs in the side panel
    initializesongList();

    // set the visualized song to the first one
    currentSongIndex = 0;
    changeSong(currentSongIndex);

    // song not playing by default
    isPlaying = false;
}

// function to initialize the list of songs in the side panel
function initializesongList(){
    let songList = document.getElementById("songList");

    for (var i = 0; i < titles.length; i++){
        let newSongItem = document.createElement("li");
        newSongItem.classList.add("list-group-item");

        // Create a new button element
        let newButton = document.createElement("button");
        newButton.setAttribute("id", "songButton" + i);
        newButton.setAttribute("onclick", "changeSection(" + i + ")");
        newButton.textContent = titles[i];

        // Append the button to the li element
        newSongItem.appendChild(newButton);

        // Append the li element to the ul
        songList.appendChild(newSongItem);
    }
}

// function to change the current song to the specified one
function changeSong(songIndex){
    const songButtonPrefix = "songButton"
    const coverPrefix = "Assets/Covers/cover"

    // change bolded item in side bar
    document.getElementById(songButtonPrefix + currentSongIndex).style.fontWeight = "normal";
    document.getElementById(songButtonPrefix + songIndex).style.fontWeight = "bold";

    // change texts with song title
    document.getElementById("songTitle").textContent = titles[songIndex];
    document.getElementById("songTitleCard").textContent = titles[songIndex];

    // change text with author
    document.getElementById("songAuthor").textContent = authors[songIndex];

    // change song description
    document.getElementById("songDescription").textContent = descriptions[songIndex];

    // change cover image
    document.getElementById("songCover").src = coverPrefix + songIndex + ".jpg";

    // change song file in player
    document.getElementById("musicPlayer").src = songFiles[songIndex];

    // set background color
    document.body.style.backgroundColor = bgColors[songIndex];

    currentSongIndex = songIndex;
}

// function to change song when selected through the sidebar
function changeSection(sectionIndex){
    changeSong(sectionIndex);
    pause(); // do not play music
}

// change to a song whose index is offset positions ahead
function nextPrevSong(offset){
    // change song
    newSongIndex = (currentSongIndex + offset + titles.length) % titles.length;
    changeSong(newSongIndex);

    // resume playing if already playing
    if(isPlaying)
        playSong();
}

// go to next song
function nextSong(){
    nextPrevSong(1);
}

// got to previous song
function previousSong(){
    nextPrevSong(-1);
}

// Play/Pause toggle function
function togglePlayPause() {
    if(isPlaying)
        pauseSong();
    else
        playSong();
}

// pause the music
function pauseSong(){
    playPauseIcon = document.getElementById('playPauseIcon');
    musicPlayer.pause();
    playPauseIcon.classList.remove('bi-pause-circle-fill');
    playPauseIcon.classList.add('bi-play-circle-fill');
    isPlaying = false;
}

// play the music
function playSong(){
    playPauseIcon = document.getElementById('playPauseIcon');
    musicPlayer.play();
    playPauseIcon.classList.remove('bi-play-circle-fill');
    playPauseIcon.classList.add('bi-pause-circle-fill');
    isPlaying = true;
}

// function called when a song ends: play next one
function onSongEnd(){
    nextSong();
}

// when the data about the song is loaded, set the timers and slider
function onSongLoaded(){
    totalDurationDisplay.textContent = formatTime(musicPlayer.duration);
    progressSlider.value = 0;
    currentTimeDisplay.textContent = formatTime(0);
}

// function called when music progresses: display the progress
function onTimeUpdate(){
    const percentage = (musicPlayer.currentTime / musicPlayer.duration) * 100;
    progressSlider.value = percentage;
    currentTimeDisplay.textContent = formatTime(musicPlayer.currentTime);
}

// function called when the user interacts with progress bar: 
// set the song progress to the one specified by the user
function onSliderInput(){
    const seekTime = (musicPlayer.duration / 100) * progressSlider.value;
    musicPlayer.currentTime = seekTime;
}

// function called when the user inputs a volumne: set the music volume to it
function onVolumeInput(){
    musicPlayer.volume = document.getElementById('volumeControl').value;
}

// function to format a time for display
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}