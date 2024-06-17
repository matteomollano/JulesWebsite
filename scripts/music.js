// music.js

function toggleFavorite(songName, artist, songLink) {
    // Retrieve existing favorite songs from local storage or initialize an empty object
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};

    // If the item is not in favoriteSongs, create a new entry with default properties
    if (!favoriteSongs[songName]) {
        favoriteSongs[songName] = {
            songName: songName,
            artist: artist,
            songLink: songLink,
            favorited: true,
        };
    } else {
        // Toggle the favorited state
        favoriteSongs[songName].favorited = !favoriteSongs[songName].favorited;
    }

    // Save the updated favorites back to local storage
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
}

// Function to apply favorites on page load
function applyFavorites() {
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};
    const heartButtons = document.querySelectorAll('.favorites-button');

    for (let button of heartButtons) {
        // use the song name as the item's id
        const songName = button.closest('tr').querySelector('.song-name').textContent.trim();

        if (favoriteSongs[songName]) {
            if (favoriteSongs[songName].favorited) {
                // apply the red style
                button.querySelector('.clear-heart').setAttribute('src', "images/heart-red.png");
            }
            else {
                // apply the clear style
                button.querySelector('.clear-heart').setAttribute('src', "images/heart-clear.png");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const heartButtons = document.querySelectorAll('.favorites-button');

    for (let button of heartButtons) {
        button.onclick = function() {
            const songName = button.closest('tr').querySelector('.song-name').textContent.trim();
            const artist = button.closest('tr').querySelector('.artist').textContent.trim();
            const songLink = button.closest('tr').querySelector('.song-link').querySelector('.website-button').getAttribute('href');
            toggleFavorite(songName, artist, songLink);
            applyFavorites();
        }
    }

    // Apply favorites on initial page load
    applyFavorites();
});