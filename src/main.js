import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.picture-search-name');
const loader = document.querySelector('.loader-container');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-button');


 let lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionsData: 'alt',
        close: true,
      });

const API_KEY = '41764451-f0ee5e8d00846e21c9f97a054';

let currentPage = 1;
let currentQuery = ""; 
let totalImages = 0;
let per_page = 40;


function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}


searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loadMoreBtn.style.display = "none";
  currentPage = 1;
  gallery.innerHTML = "";
      

  currentQuery = searchInput.value.trim();
  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message:
        'Please, enter something!',
      position: 'topRight',
    });
    return;
  }
  showLoader();
  loader.textContent = "Loading images, please wait...";

      
  try {
    const { data: { hits, totalHits } } = await axios.get(`https://pixabay.com/api/`, {
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
    totalImages = totalHits;
    hideLoader();
     
    if (hits.length === 0) {
      loadMoreBtn.style.display = "none";
      iziToast.info({
        title: "Info",
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
      });
      return;
    }
    updateGallery(hits);
    lightbox.refresh();
    loadMoreBtn.style.display = "block";
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "An error occurred while fetching data. Please try again later.",
      position: "topRight",
    });
  } finally {
    loader.textContent = "";
    hideLoader();
  };


  if (currentPage === Math.ceil(totalHits / per_page)) {
    loadMoreBtn.style.display = "none";
   iziToast.info({
    title: "Info",
    message: "We're sorry, but you've reached the end of search results",
    position: "topRight",
  });
}
});



loadMoreBtn.addEventListener("click", async () => {
  loader.textContent = "Loading images, please wait...";
  showLoader();
  currentPage += 1;

 
  try {
  
  const {data: {hits, totalHits}} = await axios.get(`https://pixabay.com/api/`, {
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
    totalImages = totalHits;
  hideLoader();
    updateGallery(hits);
    lightbox.refresh();
    
  
    const cardHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    
    console.log(document.querySelector('.gallery-item'));

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

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
  

  if (currentPage === Math.ceil(totalHits / per_page)) {
    loadMoreBtn.style.display = "none";
   iziToast.info({
    title: "Info",
    message: "We're sorry, but you've reached the end of search results",
    position: "topRight",
  });
}
  });

 
function updateGallery(images) {
  const galleryMarkup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
<li class="gallery-item">
     <a href="${largeImageURL}">
     <img src="${webformatURL}" alt="${tags}">
     </a>
      <div class="image-info">
          <p>Likes:${likes}</p>
          <p>Views: ${views}</p>
          <p>Comments: ${comments}</p>
  <p>Downloads: ${downloads}</p>
      </div>
    </li>`).join('');
  gallery.insertAdjacentHTML('beforeend', galleryMarkup); 
}


