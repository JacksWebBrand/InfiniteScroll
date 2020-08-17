const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded, totalImages = 0;
let photos = [];

// Unsplash api
let count = 5;
const apiKey = 'j4nQaIm1cst9z0D0oOqV5B0qKgR4XdrCxKkHN60Okww';
const collections = '225';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collections=${collections}`

// Check if all images were loaded and set the load count to 30 for subsequent loads
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function for setting up the DOM elements and attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create photo elements, added to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    // Run function for each object in photos array
    photos.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        }); 
        //  Add event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded())
        //  Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photos = await response.json();
        displayPhotos()
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();