import{S as k,i as n,a as h}from"./assets/vendor-89feecc5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const g of t.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&o(g)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const R=document.querySelector(".search-form"),q=document.querySelector(".picture-search-name"),l=document.querySelector(".loader-container"),i=document.querySelector(".gallery"),c=document.querySelector(".load-more-button"),v=new k(".gallery a",{captionDelay:250,captionsData:"alt",close:!0}),w="41764451-f0ee5e8d00846e21c9f97a054";let d=1,u="",p=0,y=0;function L(){l.style.display="block"}function m(){l.style.display="none"}R.addEventListener("submit",async a=>{a.preventDefault(),c.style.display="none",d=1,i.innerHTML="";const r=q.value.trim();if(!r){n.error({title:"Error",message:"Please, enter something!",position:"topRight"});return}u=r,L(),l.textContent="Loading images, please wait...";try{const o=(await h.get("https://pixabay.com/api/",{params:{key:w,q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,page:d,per_page:40}})).data;if(m(),o.hits&&o.hits.length>0){p=o.totalHits;const e=o.hits.map(t=>({url:t.webformatURL,alt:t.tags,largeUrl:t.largeImageURL,likes:t.likes,views:t.views,comments:t.comments,downloads:t.downloads}));f(e)}else n.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch{n.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{l.textContent="",m(),b()}});c.addEventListener("click",async()=>{const a=C(images[0]);i.appendChild(a),y=document.querySelector("img").getBoundingClientRect().height,f(images),window.scrollBy({top:y*2,behavior:"smooth"}),l.textContent="Loading images, please wait...",L();try{const s=(await h.get("https://pixabay.com/api/",{params:{key:w,q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,page:d,per_page:40}})).data;if(m(),s.hits&&s.hits.length>0){p=s.totalHits;const o=s.hits.map(e=>({url:e.webformatURL,alt:e.tags,largeUrl:e.largeImageURL,likes:e.likes,views:e.views,comments:e.comments,downloads:e.downloads}));f(o),v.refresh()}else n.info({title:"Info",message:"No more images to load.",position:"topRight"})}catch{n.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{l.textContent="",m()}b()});function f(a){const r=a.reduce((s,o)=>s+`
<div class="gallery-item">
      <img src="${o.largeImageURL}" alt="${o.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${o.likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${o.views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${o.comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${o.downloads}</p>
        </div>
      </div>
    </div>`,"");i.insertAdjacentHTML("beforeend",r),v.refresh()}function b(){p>i.children.length?c.style.display="block":(c.style.display="none",i.children.length>0&&d>1&&p===i.children.length&&n.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}function C(a){const r=document.createElement("div");r.classList.add("gallery-card");const s=document.createElement("img");return s.src=a.url,s.alt=a.alt,r.appendChild(s),r}
//# sourceMappingURL=commonHelpers.js.map
