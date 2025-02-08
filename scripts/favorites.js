// favorites.js

// Add a favorited shop item to the favorites-grid
function addFavoritedItem(dataProductId, productName, productImgName, productImgId, websiteLink, websiteName) {

    const favoritesGrid = document.querySelector('.favorites-grid');

    // Create the website-link (shop item) div
    const div = document.createElement("div");
    div.setAttribute('class', 'website-link');
    div.setAttribute('data-product-id', dataProductId);
    div.innerHTML = `
        <div>
            <p class="product-name">${productName}</p>
        </div>
        <div>
            <img class="product-image" id="${productImgId}" src="${productImgName}">
        </div>
        <div>
            <a class="website-button" target="_blank" href="${websiteLink}">${websiteName}</a>
            <button class="favorites-button">
                <img class="clear-heart" src="images/heart-red.png">
            </button>
        </div>
    `;

    // Add the new div to the favorites-grid
    favoritesGrid.appendChild(div);

    // Attach the unfavorite event to the heart button
    const heartButton = div.querySelector('.favorites-button');
    heartButton.addEventListener('click', () => {
        unfavoriteItem(dataProductId); // Unfavorite this item
    });
}

// Add a favorited song to the music table
function addFavoritedSong(dataSongId, songName, artist, songLink) {
    const musicTable = document.querySelector('.music-table');
    const tbody = musicTable.querySelector('tbody');

    // Create a new song row
    const newSongRow = document.createElement('tr');
    newSongRow.setAttribute('data-song-id', dataSongId)

    // Create cells for the new song row
    const heartCell = document.createElement('th');
    const songNameCell = document.createElement('td');
    const artistCell = document.createElement('td');
    const songLinkCell = document.createElement('td');

    // Set the content for each cell
    heartCell.setAttribute('scope', 'row');
    heartCell.innerHTML = `
    <button class="favorites-button">
        <img class="clear-heart" src="images/heart-red.png">
    </button>`;
    songNameCell.textContent = songName;
    artistCell.textContent = artist;
    songLinkCell.innerHTML = `<a class="website-button" target="_blank" href="${songLink}">Play</a>`;

    // Append the cells to the row
    newSongRow.appendChild(heartCell);
    newSongRow.appendChild(songNameCell);
    newSongRow.appendChild(artistCell);
    newSongRow.appendChild(songLinkCell);

    // Append the row to the table body
    tbody.appendChild(newSongRow);

    // Attach the unfavorite event to the heart button
    const heartButton = newSongRow.querySelector('.favorites-button');
    heartButton.addEventListener('click', () => {
        unfavoriteSong(dataSongId); // Unfavorite this item
    });
}

// shows or hides a div based on user's selection
function showContent(selectedOption) {
    const shopItems = document.getElementById('shop-items');
    const songs = document.getElementById('songs');

    // Show the selected section
    if (selectedOption === 'shop-items') {
        shopItems.style.display = 'block';
        songs.style.display = 'none';
    } else if (selectedOption === 'songs') {
        shopItems.style.display = 'none';
        songs.style.display = 'block';
    } else if (selectedOption === 'all') {
        shopItems.style.display = 'block';
        songs.style.display = 'block';
    }
}

// Function to unfavorite a shop item
function unfavoriteItem(dataProductId) {
    // Retrieve the existing favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // Get the shop item
    const shopItem = favorites[dataProductId]

    // If the item is in favorites, remove it (unfavorite)
    if (dataProductId) {
        shopItem.favorited = false; // set the item's favorited property to false

        // Get the website-link div based on the data-product-id attribute
        let websiteLinkDiv = document.querySelector(`.website-link[data-product-id='${dataProductId}']`);

        // Set the heart button to a clear style
        const heartImage = websiteLinkDiv.querySelector('.clear-heart')
        heartImage.setAttribute('src', "images/heart-clear.png");

        // Save the updated favorites back to local storage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Remove the website-link item from the favorites-grid
        websiteLinkDiv.remove();
    }
}

// Function to unfavorite a song
function unfavoriteSong(dataSongId) {
    // Retrieve the existing favorite songs from local storage
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};

    // Get the song
    const song = favoriteSongs[dataSongId]

    // If the song is in favoriteSongs, remove it (unfavorite)
    if (song) {
        song.favorited = false; // set the song's favorited property to false

        // Get the song row based on the data-song-id attribute
        const songRow = document.querySelector(`tr[data-song-id='${dataSongId}']`);

        // Save the updated favorite songs back to local storage
        localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));

        // Remove the song row from the table
        songRow.remove()
    }
}

// Get all favorited shop items from Local Storage and add them to the favorites.html grid
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve existing favorites from local storage or initialize an empty object
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // if the item is favorited, add it to the favorites-grid
    for (const dataProductId in favorites) {
        const item = favorites[dataProductId];
        if (item.favorited) {
            addFavoritedItem(dataProductId, item.productName, item.productImgName, item.productImgId, item.websiteLink, item.websiteName);
        }
    }
});

// Get all favorited songs from Local Storage and add them to the favorites.html table
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve existing favorite songs from local storage or initialize an empty object
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs')) || {};

    // if the song is favorited, add it to the music table
    for (const dataSongId in favoriteSongs) {
        const song = favoriteSongs[dataSongId];
        if (song.favorited) {
            addFavoritedSong(dataSongId, song.songName, song.artist, song.songLink);
        }
    }
});