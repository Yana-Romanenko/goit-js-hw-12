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
      
      currentPage = 1;
      
      currentQuery = query;
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
    

      if (gallery.children.length === 0) {
        const firstCard = gallery.appendChild(createGalleryCard(images[0]));
        cardHeight = firstCard.getBoundingClientRect().height;
        gallery.innerHTML = "";
      }

        updateGallery(images);
    } else {
    iziToast.info({
        title: "Info",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
    });
}
} catch (error) {
    console.error("Error fetching data:", error);
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
    } else {
      iziToast.info({
        title: "Info",
        message: "No more images to load.",
        position: "topRight",
      });
    }
  }  catch (error) {
  console.error("Error fetching data:", error);
  iziToast.error({
    title: "Error",
    message: "An error occurred while fetching data. Please try again later.",
    position: "topRight",
  });
} finally {
  loader.textContent = "";
  hideLoader(); 
  toggleLoadMoreButton();
}
 
    window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });
  toggleLoadMoreButton();
  }
);

 window.scrollBy({
      top: cardHeight * 2, 
      behavior: 'smooth',
    });

function updateGallery(images) {
  const galleryMarkup = images.reduce((html, image) =>  html + `
        <a href="${image.largeUrl}" data-lightbox="gallery" data-title="Likes: ${image.likes}, 
        Views: ${image.views},
         Comments: ${image.comments}, 
         Downloads: ${image.downloads}">
          <img src="${image.url}" alt="${image.alt}" />
        </a>`, '');
  gallery.innerHTML += galleryMarkup;
  lightbox.refresh();

  toggleLoadMoreButton();
}

function toggleLoadMoreButton() {
  if (totalHits > gallery.children.length) {
   loadMoreBtn.style.display = "block";
  } else {
    loadMoreBtn.style.display = "none";
    if (gallery.children.length > 0) {
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


