import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const searchForm = document.querySelector('.picture-search-form');
const searchInput = document.querySelector('.picture-search-name');
const loader = document.querySelector('.loader-container');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');

 const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        close: true,
      });

const API_KEY = '41764451-f0ee5e8d00846e21c9f97a054';

let currentPage = 1;
let currentQuery = ""; 
let totalHits = 0;
let cardHeight = 0; 


function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

    searchForm.addEventListener('submit', async(event) => {
      event.preventDefault();
       currentPage = 1;
       gallery.innerHTML = "";

  const query = searchInput.value.trim();
          if (!query) {
        iziToast.error({
          title: 'Error',
          message:
            'Please, enter something!',
          position: 'topRight',
        });
        return;
          }
  
      
      currentQuery = query;
      showLoader();
      loader.textContent = "Loading images, please wait...";

      
      try {
    const response = await axios.get(`https://pixabay.com/api/`, {
        params: {
            key: API_KEY,
            q: currentQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: currentPage,
            per_page: 40,
        }
    });
    
        const data = response.data;
        hideLoader();
     
    if (data.hits && data.hits.length > 0) {
        totalHits = data.totalHits; 
        const images = data.hits.map((hit) => ({
            url: hit.webformatURL,
            alt: hit.tags,
            largeUrl: hit.largeImageURL,
            likes: hit.likes,
            views: hit.views,
            comments: hit.comments,
            downloads: hit.downloads,
        }));
    
      loadMoreBtn.style.display = "none";

      // const firstCard = createGalleryCard(images[0]);
      // gallery.appendChild(firstCard);
      //   cardHeight = firstCard.getBoundingClientRect().height;

      updateGallery(images);
       window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });
    } else {
    iziToast.info({
        title: "Info",
        message: "Sorry, there are no images matching your search query. Please try again!",
      position: "topRight",
    });
}
} catch (error) {
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching data. Please try again later.",
      position: "topRight",
    });
      } finally {
        loader.textContent = "";
        hideLoader();
       
    toggleLoadMoreButton();
  };
    });




loadMoreBtn.addEventListener("click", async () => {
  loader.textContent = "Loading images, please wait...";
  showLoader();

try {
  const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: API_KEY,
        q: currentQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: currentPage,
        per_page: 40,
      },
    });

  const data = response.data;
  hideLoader();

    if (data.hits && data.hits.length > 0) {
      totalHits = data.totalHits; 
        const images = data.hits.map((hit) => ({
        url: hit.webformatURL,
        alt: hit.tags,
        largeUrl: hit.largeImageURL,
        likes: hit.likes,
        views: hit.views,
        comments: hit.comments,
        downloads: hit.downloads,
      }));

      updateGallery(images);
      // можна додати скрол
      lightbox.refresh();
    } else {
      iziToast.info({
        title: "Info",
        message: "No more images to load.",
        position: "topRight",
      });
    }
  }  catch (error) {
  iziToast.error({
    title: "Error",
    message: "An error occurred while fetching data. Please try again later.",
    position: "topRight",
  });
} finally {
  loader.textContent = "";
  hideLoader(); 
}
  
  toggleLoadMoreButton();
  }
);

 
const galleryMarkup = hits.reduce(
        (html, image) =>
          html +
          `<a class="gallery-link" href="${image.largeImageURL}">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${image.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${image.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${image.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${image.downloads}</p>
              </li>
            </ul>
        </a>`,
        ''
      );
      gallery.insertAdjacentHTML('beforeend', galleryMarkup);
      lightbox.refresh();
  

function updateGallery(images) {
 const galleryMarkup = images.reduce(
        (html, image) =>
          html +
          `<a class="gallery-link" href="${image.largeImageURL}">
            <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${image.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${image.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${image.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${image.downloads}</p>
              </li>
            </ul>
        </a>`,
        ''
      );
      gallery.insertAdjacentHTML('beforeend', galleryMarkup); 
  lightbox.refresh();
}

function toggleLoadMoreButton() {
  if (totalHits > gallery.children.length) {
   loadMoreBtn.style.display = "block";
  } else {
    loadMoreBtn.style.display = "none";
    if (gallery.children.length > 0 && currentPage > 1 && totalHits === gallery.children.length) {
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results",
        position: "topRight",
      });
    }
  }
}

function createGalleryCard(image) {
  const card = document.createElement("div");
  card.classList.add("gallery-card");

  const img = document.createElement("img");
  img.src = image.url;
  img.alt = image.alt;

  card.appendChild(img);
  return card;
}


