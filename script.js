// Get references to HTML elements
const playPauseButton = document.getElementById("play-pause-button");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
const shuffleButton = document.getElementById("shuffle-button");
const repeatButton = document.getElementById("repeat-button");
const progress = document.getElementById("progress");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playlistList = document.getElementById("playlist-list");
const addToPlaylistButton = document.getElementById("add-to-playlist");

// Define an array of tracks
const tracks = [
    { title: "Nijamene chebutunna jane jana", artist: " --Sid Sriram", src: "track1.mp3" },
    { title: "College papa (MAD 2023)", artist: " --Bheems Ceciroleo", src: "track2.mp3" },
    { title: "Vennelave", artist: " --G.V.Prakash Kumar", src: "track3.mp3" },
    { title: "Yedho Alajadi", artist: " --S.P.Charan", src: "track4.mp3" },
    { title: "Let me love you", artist: " --Unknown", src: "track5.mp3" },
    { title: "Ooru Palletooru", artist: " --Mangli", src: "track6.mp3" },
    { title: "Okati rendu moodu", artist: " --Shankar Mahadevan", src: "track7.mp3" },
    { title: "Track 8", artist: "Artist 2", src: "track8.mp3" },
    // Add more tracks here
];

let currentTrackIndex = 0;
let isPlaying = false;

// Create an audio element
const audio = new Audio(tracks[currentTrackIndex].src);

// Function to update the progress bar
function updateProgressBar() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
}

// Function to play or pause the audio
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
}

// Event listeners for buttons
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    audio.src = tracks[currentTrackIndex].src;
    togglePlayPause();
    updateTrackInfo();
});
previousButton.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    audio.src = tracks[currentTrackIndex].src;
    togglePlayPause();
    updateTrackInfo();
});

// Function to shuffle tracks
function shuffleTracks() {
    for (let i = tracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }
    currentTrackIndex = 0;
    audio.src = tracks[currentTrackIndex].src;
    togglePlayPause();
    updateTrackInfo();
}

// Event listener for shuffle button
shuffleButton.addEventListener("click", shuffleTracks);

// Function to toggle repeat mode
let repeatMode = 0; // 0 - No repeat, 1 - Repeat one, 2 - Repeat all

function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    audio.loop = repeatMode === 1; // Enable loop for "Repeat one" mode
    repeatButton.textContent = repeatMode === 1 ? "Repeat One" : repeatMode === 2 ? "Repeat All" : "No Repeat";
}

// Event listener for repeat button
repeatButton.addEventListener("click", toggleRepeat);

// Event listener for audio ended (for "Repeat All" mode)
audio.addEventListener("ended", () => {
    if (repeatMode === 2) {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        audio.src = tracks[currentTrackIndex].src;
        togglePlayPause();
        updateTrackInfo();
    }
});

// Function to update track information
function updateTrackInfo() {
    trackTitle.textContent = tracks[currentTrackIndex].title;
    trackArtist.textContent = tracks[currentTrackIndex].artist;
}

// Event listener for audio timeupdate
audio.addEventListener("timeupdate", updateProgressBar);

// Add tracks to the music library
function createMusicLibrary() {
    const library = document.querySelector(".music-library .tracks");
    library.innerHTML = "";
    tracks.forEach((track, index) => {
        const trackElement = document.createElement("div");
        trackElement.classList.add("track");
        trackElement.innerHTML = `
            <img src="album-cover.jpg" alt="Album Cover">
            <p>${track.title}</p>
            <p>${track.artist}</p>
        `;
        trackElement.addEventListener("click", () => {
            currentTrackIndex = index;
            audio.src = track.src;
            togglePlayPause();
            updateTrackInfo();
        });
        library.appendChild(trackElement);
    });
}

// Initialize the music library
createMusicLibrary();

// Function to add the current track to the playlist
addToPlaylistButton.addEventListener("click", () => {
    const trackIndex = currentTrackIndex;
    const track = tracks[trackIndex];
    const playlistItem = document.createElement("li");
    playlistItem.textContent = `${track.title} - ${track.artist}`;
    playlistList.appendChild(playlistItem);
});

// Initialize track info
updateTrackInfo();