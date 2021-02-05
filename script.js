const imageConatiner = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// Unsplash API
const count = 10;
const apiKey = 'Y3a7BoP0jYnHCkslxHJ2ObDwwxwVFn4FhW8impmN0K8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// helper function
function setAttributes(Element, attributes) {
    for (const key in attributes) {
        Element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links and Photos
function displayPhotos() {
    // Run function for each object in photos
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });
        // put <img> inside <a> and then put both inside image container.
        item.appendChild(img);
        imageConatiner.appendChild(item);

    });
}

// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch(error) {
        // Catch error
    }
}

// Check to see if scrolling near bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
});

getPhotos();
