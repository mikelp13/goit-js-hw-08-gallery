import images from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay')
};


refs.galleryList.insertAdjacentHTML("afterbegin", createMarkup(images));
refs.galleryList.addEventListener("click", onGalleryClick);
refs.closeBtn.addEventListener("click", onBtnClick);
refs.backdrop.addEventListener('click', onBackdropClick)


function createMarkup(images) {
  const galleryItems = images.reduce(
    (acc, { preview, original, description }) => {
      acc += `<li class="gallery__item">
                <a
                class="gallery__link"
                href=${original}
                >
                    <img
                    class="gallery__image"
                    src=${preview}
                    data-source=${original}
                    alt=${description}
                  />
              </a>
          </li>`;
      return acc;
    },
    ""
  );
  return galleryItems;
}

function onGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;
  if (imageRef.nodeName !== "IMG") {
    return;
  }
  const largeImageURL = imageRef.dataset.source;
  openModal(largeImageURL, imageRef);
}

function onBtnClick() {
  closeModal()
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
}

function onBackdropClick() {
  closeModal();
}

function openModal(largeImageURL, imageRef){
  refs.modal.classList.add("is-open");
  refs.modalImage.src = largeImageURL; //set modal-image src attribute
  refs.modalImage.alt = imageRef.alt; //set modal-image alt attribute
  window.addEventListener('keydown', onPressEscape); // add event on ESC button
}

function closeModal(){
  refs.modal.classList.remove("is-open");
  window.removeEventListener('keydown', onPressEscape);// remove event on ESC button
}

function onPressEscape(event){
    if (event.code === 'Escape'){
      closeModal();
    }
}