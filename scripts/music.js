// music.js

function toggleFavorite(dataSongId, songName, artist, songLink) {
    // Retrieve existing favorite songs from local storage or initialize an empty object
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};

    // If the item is not in favoriteSongs, create a new entry with default properties
    if (!favoriteSongs[dataSongId]) {
        favoriteSongs[dataSongId] = {
            songName: songName,
            artist: artist,
            songLink: songLink,
            favorited: true,
        };
    } else {
        // Toggle the favorited state
        favoriteSongs[dataSongId].favorited = !favoriteSongs[dataSongId].favorited;
    }

    // Save the updated favorites back to local storage
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
}

// Function to apply favorites on page load
function applyFavorites() {
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};
    const heartButtons = document.querySelectorAll('.favorites-button');

    for (let button of heartButtons) {
        // use the data-song-id as the song's id
        const dataSongId = button.closest('tr').getAttribute('data-song-id');

        if (favoriteSongs[dataSongId]) {
            if (favoriteSongs[dataSongId].favorited) {
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
            const dataSongId = button.closest('tr').getAttribute('data-song-id');
            const songName = button.closest('tr').querySelector('.song-name').textContent.trim();
            const artist = button.closest('tr').querySelector('.artist').textContent.trim();
            const songLink = button.closest('tr').querySelector('.song-link').querySelector('.website-button').getAttribute('href');
            toggleFavorite(dataSongId, songName, artist, songLink);
            applyFavorites();
        }
    }

    // Apply favorites on initial page load
    applyFavorites();
});