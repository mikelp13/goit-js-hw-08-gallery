import images from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector(".js-gallery"),
  modal: document.querySelector(".lightbox"),
  modalImage: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector(".lightbox__overlay"),
};

refs.galleryList.insertAdjacentHTML("afterbegin", createMarkup(images));
refs.galleryList.addEventListener("click", onGalleryClick);
refs.closeBtn.addEventListener("click", onBtnClick);
refs.backdrop.addEventListener("click", onBackdropClick);

function createMarkup(images) {
  const galleryItems = images.reduce(
    (acc, { preview, original, description }, index) => {
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
                    data-index = ${index}
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
  //  console.log(imageRef.dataset.index);// IMG index

  openModal(largeImageURL, imageRef);
}

function onBtnClick() {
  closeModal();
  refs.modalImage.src = "";
  refs.modalImage.alt = "";
}

function onBackdropClick() {
  closeModal();
}

function openModal(largeImageURL, imageRef) {
  refs.modal.classList.add("is-open");
  refs.modalImage.src = largeImageURL; //set modal-image src attribute
  refs.modalImage.alt = imageRef.alt; //set modal-image alt attribute
  refs.modalImage.dataset.index = imageRef.dataset.index; //get INDEX

  window.addEventListener("keydown", onPressEscape); // add event on ESC button
  window.addEventListener("keydown", onPressArrowKey); // add event on arrow buttons
}

function onPressArrowKey(event) {
  let activeIndex;
  activeIndex = Number(refs.modalImage.dataset.index);

  if (event.code === "ArrowRight") {
    activeIndex += 1;

    if (activeIndex >= images.length) {
      // return;
      activeIndex = 0;
    }
    setNextImage(activeIndex);
  }

  if (event.code === "ArrowLeft") {
    activeIndex -= 1;

    if (activeIndex < 0) {
      // return;
      activeIndex = images.length - 1;
    }
    setNextImage(activeIndex);
  }
  console.log(event.code);
}

function setNextImage(activeIndex) {
  refs.modalImage.src = images[activeIndex].original;
  refs.modalImage.alt = images[activeIndex].description;
  refs.modalImage.dataset.index = activeIndex;
}

function closeModal() {
  refs.modal.classList.remove("is-open");
  window.removeEventListener("keydown", onPressEscape); // remove event on ESC button
  window.removeEventListener("keydown", onPressArrowKey);// remove event on Arrow buttons when modal is closed
}

function onPressEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}
