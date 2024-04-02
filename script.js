let currentSongIndex;
const songButtonPrefix = "songButton"
const coverPrefix = "Assets/Covers/cover"

// all the following data should be in a database
const titles = ["Song 0", "Song 1", "Song 2", "Song 3"]
const authors = ["Author 0.1, Author 0.2", "Author 1", "Author 2", "Author 3"]
const bgColors = ["#FFF", "#e6c993", "#AFE0FF", "#C7A0C7"];
const descriptions = [
    "Morbi et fringilla eros. Fusce laoreet, neque at lacinia convallis, risus nisi semper nibh, eu mollis velit purus eget lectus. Phasellus interdum pretium elementum. Donec rhoncus, dolor id bibendum ullamcorper, enim enim imperdiet urna, vel tincidunt mi odio vel nunc. Proin laoreet ultrices lectus, vitae gravida massa hendrerit accumsan.",
    "Praesent auctor metus mattis metus viverra iaculis. Pellentesque aliquet pharetra consequat. Phasellus maximus vulputate rhoncus. Vivamus non eleifend augue. Mauris facilisis iaculis ipsum, eget hendrerit nisi condimentum at. Morbi at efficitur augue, nec iaculis mauris. Aliquam id varius eros. Pellentesque cursus pulvinar augue ac rutrum.",
    "Morbi eu metus tristique, dictum nibh eget, posuere metus. Quisque eget ante ut sem pulvinar porttitor a in leo. Ut elementum, mauris ut pulvinar accumsan, neque massa fringilla sapien, quis tempus mauris turpis suscipit quam. Praesent consectetur condimentum justo a pretium. Etiam tellus elit, pharetra ac eleifend nec, lacinia nec elit.",
    "Vivamus laoreet ligula et augue varius faucibus. Maecenas vestibulum turpis a nibh lobortis, et tincidunt massa laoreet. Donec ultricies fringilla nibh, lacinia suscipit nibh egestas eu. Nulla hendrerit felis vel tristique pellentesque. Proin id ante nec elit vulputate laoreet. Sed urna metus, luctus quis faucibus varius, porttitor vitae dui."
]

function changeSong(songIndex){
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

    // set background color
    document.body.style.backgroundColor = bgColors[songIndex];

    currentSongIndex = songIndex;
}

function nextSong(){
    nextPrevSong(1);
}

function previousSong(){
    nextPrevSong(-1);
}

function nextPrevSong(offset){
    newSongIndex = (currentSongIndex + offset + titles.length) % titles.length;
    changeSong(newSongIndex);
}

function initialize(){
    initializesongList();
    currentSongIndex = 0;
    changeSong(currentSongIndex);
}

function initializesongList(){
    let songList = document.getElementById("songList");

    for (var i = 0; i < titles.length; i++){
        let newSongItem = document.createElement("li");
        newSongItem.classList.add("list-group-item");

        // Create a new button element
        let newButton = document.createElement("button");
        newButton.setAttribute("id", "songButton" + i);
        newButton.setAttribute("onclick", "changeSong(" + i + ")");
        newButton.textContent = titles[i];

        // Append the button to the li element
        newSongItem.appendChild(newButton);

        // Append the li element to the ul
        songList.appendChild(newSongItem);
    }
}

window.onload = function(){
    initialize();
}