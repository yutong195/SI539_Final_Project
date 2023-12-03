// script.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('togglePlayer').addEventListener('click', function() {
        var player = document.getElementById('musicPlayer');
        if (player.classList.contains('hidden')) {
            player.classList.remove('hidden');
            this.textContent = 'Hide Player';
        } else {
            player.classList.add('hidden');
            this.textContent = 'Show Player';
        }
    });

    var audio = new Audio();
    var basePath = './songs/';
    var songs = ['Perfect-Ed Shareen.mp3','Photograph-Ed Shareen.mp3','River Flows In You-Yiruma.mp3',
    'Drifting Cloud-Masaaki Kishibe.mp3','Miracle Mountain-Masaaki Kishibe.mp3']; // Replace these with your actual song names
    songs = songs.map(song => basePath + song); // Prepend base path to each song name

    var currentSongIndex = 0;

    function playSong(index) {
        audio.src = songs[index];
        audio.play();
        updateSongList();
        updateSongInfoDisplay(); // New function call
    }
    
    function updateSongInfoDisplay() {
        var songName = songs[currentSongIndex].split('\\').pop(); // Get the file name
        songName = songName.replace('.mp3', ''); // Remove .mp3 extension
        var songParts = songName.split('-'); // Assuming format is Title-Author.mp3
        var displayText = songParts[0] + ' by ' + songParts[1]; // Format: Title by Author
        document.getElementById('currentSongInfo').textContent = displayText;
    }
    

    function updateSongList() {
        var songList = document.getElementById('songList');
        songList.value = songs[currentSongIndex];
        // Remove 'playing' class from all options
        for (var option of songList.options) {
            option.classList.remove('playing');
        }
        // Add 'playing' class to current song
        songList.options[currentSongIndex].classList.add('playing');
    }

    document.getElementById('playPause').addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    document.getElementById('nextSong').addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    });

    document.getElementById('prevSong').addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    });

    audio.addEventListener('timeupdate', function() {
        var percentage = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = percentage + '%';
    });
    
    // Add click event listener to the progress bar container
    document.getElementById('progressBarContainer').addEventListener('click', function(e) {
        var progressBarWidth = this.clientWidth;
        var clickPositionX = e.offsetX;
        var clickPositionRatio = clickPositionX / progressBarWidth;
        audio.currentTime = clickPositionRatio * audio.duration;
    });

    document.getElementById('songList').addEventListener('change', function(e) {
        currentSongIndex = songs.indexOf(e.target.value);
        playSong(currentSongIndex);
    });

    // Initial song load
    playSong(0);
});
