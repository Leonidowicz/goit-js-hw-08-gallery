import galery from './gallery-items.js';
const ref = {
  lightbox: document.querySelector('.lightbox'),
  gallery: document.querySelector('.gallery'),
  overlay: document.querySelector('.lightbox__overlay'),
  closeButton: document.querySelector('.lightbox__button'),
  currentImg: document.querySelector('.lightbox__image'),
};

const scrollY = document.body.style.top;
document.body.style.position = '';
document.body.style.top = '';
window.scrollTo(0, parseInt(scrollY || '0') * -1);

function makeElemOfMarkup(obj) {
  const { preview, original, description } = obj;
  return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
}

function onGaleryClick(event) {
  event.preventDefault();
  if (event.target.tagName === 'IMG') {
    ref.lightbox.classList.add('is-open');

    ref.closeButton.addEventListener('click', closedCurrentInage);
    ref.overlay.addEventListener('click', closedCurrentInage);
    document.addEventListener('keydown', onEscape);

    ref.currentImg.setAttribute('src', event.target.dataset.source);
    ref.currentImg.setAttribute('alt', event.target.getAttribute('alt'));
  }
}
function closedCurrentInage() {
  ref.lightbox.classList.remove('is-open');

  ref.currentImg.setAttribute('src', '');
  ref.currentImg.setAttribute('alt', '');

  ref.closeButton.removeEventListener('click', closedCurrentInage);
  ref.overlay.removeEventListener('click', closedCurrentInage);
  document.removeEventListener('keydown', onEscape);
}
function onEscape(event) {
  if (event.code === 'Escape') {
    closedCurrentInage();
  }
}
const newMarkup = galery.map(makeElemOfMarkup).join('');
ref.gallery.insertAdjacentHTML('beforeend', newMarkup);
ref.gallery.addEventListener('click', onGaleryClick);
