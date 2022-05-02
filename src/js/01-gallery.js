// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const markup = createGalleryCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', markup);

galleryContainer.addEventListener('click', onGalleryContainerClick);
let instance = null;

function createGalleryCardsMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img
                            class="gallery__image"
                            src="${preview}"
                            data-source="${original}"
                            alt="${description}"
                        />
                    </a>
                </div>`;
    }).join('');
};

function onGalleryContainerClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    window.addEventListener('keydown', onEscKeyPress);
    instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" alt="${event.target.alt}" width="800" height="600">
    `);
    instance.show();
}

function onEscKeyPress(event) {
    if (event.code !== 'Escape') {
        return;
    }
    instance.close();
    window.removeEventListener('keydown', onEscKeyPress);
}
