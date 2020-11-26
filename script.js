import images from "./gallery-items.js";

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    */

const refs = {
  galleryList: document.querySelector(".js-gallery"),
};

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

refs.galleryList.insertAdjacentHTML("afterbegin", createMarkup(images));

refs.galleryList.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;

  if (imageRef.nodeName !== "IMG") {
    return;
  }
  const largeImageURL = imageRef.dataset.source;
  console.log(largeImageURL);
}
