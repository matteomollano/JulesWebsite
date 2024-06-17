// shop.js

function toggleFavorite(itemName, itemImgSrc, itemImgId, itemWebsiteLink, itemWebsiteName) {
    // Retrieve existing favorites from local storage or initialize an empty object
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

    // If the item is not in favorites, create a new entry with default properties
    if (!favorites[itemName]) {
        favorites[itemName] = {
            productName: itemName, // Set the actual product name
            productImgName: itemImgSrc, // Set the image source URL
            productImgId: itemImgId,
            websiteLink: itemWebsiteLink, // Set the product website link
            websiteName: itemWebsiteName,
            favorited: true, // Initialize as favorited
        };
    } else {
        // Toggle the favorited state
        favorites[itemName].favorited = !favorites[itemName].favorited;
    }

    // Save the updated favorites back to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to apply favorites on page load
function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const heartButtons = document.querySelectorAll('.favorites-button');

    for (let button of heartButtons) {
        // use the item name as the item's id
        const itemName = button.closest('.website-link').querySelector('.product-name').textContent.trim();

        if (favorites[itemName]) {
            if (favorites[itemName].favorited) {
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

// Attach click event listener to heart buttons
document.addEventListener('DOMContentLoaded', () => {
    const heartButtons = document.querySelectorAll('.favorites-button');

    for (let button of heartButtons) {
        button.onclick = function() {
            const itemName = button.closest('.website-link').querySelector('.product-name').textContent.trim();
            const itemImgSrc = button.closest('.website-link').querySelector('.product-image').getAttribute('src');
            const itemImgId = button.closest('.website-link').querySelector('.product-image').getAttribute('id');
            const itemWebsiteLink = button.closest('.website-link').querySelector('.website-button').getAttribute('href');
            const itemWebsiteName = button.closest('.website-link').querySelector('.website-button').textContent.trim();
            toggleFavorite(itemName, itemImgSrc, itemImgId, itemWebsiteLink, itemWebsiteName);
            applyFavorites(); // Update favorites on click
        }
    }

    // Apply favorites on initial page load
    applyFavorites();
});


/* Original Code for Local Storage */
// Function to toggle favorites
// function toggleFavorite(itemId) {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
//     favorites[itemId] = !favorites[itemId]; // Toggle favorite state
//     localStorage.setItem('favorites', JSON.stringify(favorites));
// }

// Function to apply favorites on page load
// function applyFavorites() {
//     const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
//     const heartButtons = document.querySelectorAll('.favorites-button');

//     for (let button of heartButtons) {
//         // use the item name as the item's id
//         const itemName = button.closest('.website-link').querySelector('.product-name').textContent.trim();
         
            // if (favorites[itemName] {
            //     // apply the red style
            //     button.querySelector('.clear-heart').setAttribute('src', "images/heart-red.png");
            // }
            // else {
            //     // apply the clear style
            //     button.querySelector('.clear-heart').setAttribute('src', "images/heart-clear.png");
            // }
//         
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
    // heartButtons.forEach((button) => {
    //     button.addEventListener('click', (event) => {
    //         const itemId = event.target.closest('.website-link').querySelector('.product-name').textContent.trim();
    //         toggleFavorite(itemId);
    //         applyFavorites(); // Update favorites on click
    //     });
    // });
    // Apply favorites on initial page load
    // applyFavorites();
// });


/* Original Toggling without Local Storage */
// let buttons = document.querySelectorAll(".favorites-button");

// for (let button of buttons) {
//     button.onclick = function() {
//         let heart = button.querySelector(".clear-heart");
//         if (heart.getAttribute('src') === "images/heart-clear.png") {
//             heart.setAttribute('src', "images/heart-red.png");
//         }
//         else {
//             heart.setAttribute('src', "images/heart-clear.png");
//         }
//     }
// }