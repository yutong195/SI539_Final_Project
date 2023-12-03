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
    var songs = [
        'Perfect_Ed Shareen.mp3',
        'Photograph_Ed Shareen.mp3',
        'River Flows In You_Yiruma.mp3',
        'Drifting Cloud_Masaaki Kishibe.mp3',
        'Miracle Mountain_Masaaki Kishibe.mp3'
    ]; // Replace these with your actual song names
    songs = songs.map(song => basePath + song); // Prepend base path to each song name

    var currentSongIndex = 0;

    function playSong(index) {
        audio.src = songs[index];
        audio.play();
        updateSongList();
        updateSongInfoDisplay(); // Update song info
    }

    function updateSongInfoDisplay() {
        var songName = songs[currentSongIndex].split('/').pop().replace('.mp3', '');
        var songParts = songName.split('_');
        var displayText = songParts[0].replace('_', ' ') + ' by ' + songParts[1].replace('_', ' ');
        document.getElementById('currentSongInfo').textContent = displayText;
    }

    function updateSongList() {
        var songList = document.getElementById('songList');
        songList.value = songs[currentSongIndex];
        for (var option of songList.options) {
            option.classList.remove('playing');
        }
        songList.options[currentSongIndex].classList.add('playing');
    }

    document.getElementById('playPause').addEventListener('click', function() {
        if (audio.paused) {
            this.innerHTML = "Pause";
            audio.play();
        } else {
            this.innerHTML = "Play";
            audio.pause();
        }
    });

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(currentSongIndex);
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(currentSongIndex);
    }

    document.getElementById('nextSong').addEventListener('click', nextSong);

    document.getElementById('prevSong').addEventListener('click', prevSong);

    audio.addEventListener('timeupdate', function() {
        var percentage = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = percentage + '%';
    });

    document.getElementById('progressBarContainer').addEventListener('click', function(e) {
        var progressBarWidth = this.clientWidth;
        var clickPositionX = e.offsetX;
        var clickPositionRatio = clickPositionX / progressBarWidth;
        audio.currentTime = clickPositionRatio * audio.duration;
    });

    document.getElementById('songList').addEventListener('change', function(e) {
        currentSongIndex = songs.indexOf(basePath + e.target.value);
        playSong(currentSongIndex);
    });

    audio.addEventListener('ended', nextSong); // Auto-play next song when current song ends

    // Initial song load
    playSong(0);
});
