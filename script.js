const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

//Unsplash api
const imgCount = 30;
const apiKey = 'xQA0omFK1etLJTRjMHm6B2R7TfRCLhOwuh-u5XAdBFQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;

//Photos Array
let photsArray = [];

//check variables
let imagesLoaded = 0;
let totalLoaded = 0;
let ready = false;

//check if all images are loaded
function imageloaded() {
    imagesLoaded++;
    if (imagesLoaded === totalLoaded){
        ready = true;
        loader.hidden = true;
        console.log(ready);
    }
}

//helper function to set attributes
function setAttributes(element, attributes) {
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create elements for links and photos
function diplayPhotos() {
    //run function for each element in array
    imagesLoaded = 0;
    totalLoaded = photsArray.length;
    photsArray.forEach((photo) => {
        //create <a> to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create<img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listner, check when loading is finished
        img.addEventListener('load', imageloaded);

        //put <img> inside <a>, then put both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get Photos
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photsArray = await response.json();
        diplayPhotos();
    }catch(error){

    }
}

//Event listners for loading on scroll
window.addEventListener('scroll', () =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();