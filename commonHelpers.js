import{S as b,i as r,a as y}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(o){if(o.ep)return;o.ep=!0;const s=a(o);fetch(o.href,s)}})();const k=document.querySelector(".picture-search-form"),R=document.querySelector(".picture-search-name"),n=document.querySelector(".loader-container"),i=document.querySelector(".gallery"),c=document.querySelector(".load-more-button"),g=new b(".gallery a",{captionDelay:250,captionsData:"alt",close:!0}),h="41764451-f0ee5e8d00846e21c9f97a054";let p=1,m="",f=0,$=0;function w(){n.style.display="block"}function d(){n.style.display="none"}k.addEventListener("submit",async l=>{l.preventDefault(),p=1,i.innerHTML="";const t=R.value.trim();if(!t){r.error({title:"Error",message:"Please, enter something!",position:"topRight"});return}m=t,w(),n.textContent="Loading images, please wait...";try{const e=(await y.get("https://pixabay.com/api/",{params:{key:h,q:m,image_type:"photo",orientation:"horizontal",safesearch:!0,page:p,per_page:40}})).data;if(d(),e.hits&&e.hits.length>0){f=e.totalHits;const o=e.hits.map(s=>({url:s.webformatURL,alt:s.tags,largeUrl:s.largeImageURL,likes:s.likes,views:s.views,comments:s.comments,downloads:s.downloads}));c.style.display="none",L(o),window.scrollBy({top:$*2,behavior:"smooth"})}else r.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch{r.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{n.textContent="",d(),v()}});c.addEventListener("click",async()=>{n.textContent="Loading images, please wait...",w();try{const t=(await y.get("https://pixabay.com/api/",{params:{key:h,q:m,image_type:"photo",orientation:"horizontal",safesearch:!0,page:p,per_page:40}})).data;if(d(),t.hits&&t.hits.length>0){f=t.totalHits;const a=t.hits.map(e=>({url:e.webformatURL,alt:e.tags,largeUrl:e.largeImageURL,likes:e.likes,views:e.views,comments:e.comments,downloads:e.downloads}));L(a),g.refresh()}else r.info({title:"Info",message:"No more images to load.",position:"topRight"})}catch{r.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{n.textContent="",d()}v()});const q=hits.reduce((l,t)=>l+`<a class="gallery-link" href="${t.largeImageURL}">
            <img
                class="gallery-image"
                src="${t.webformatURL}"
                alt="${t.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${t.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${t.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${t.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${t.downloads}</p>
              </li>
            </ul>
        </a>`,"");i.insertAdjacentHTML("beforeend",q);g.refresh();function L(l){const t=l.reduce((a,e)=>a+`<a class="gallery-link" href="${e.largeImageURL}">
            <img
                class="gallery-image"
                src="${e.webformatURL}"
                alt="${e.tags}"
            />
           <ul class="info-list">
              <li class="info-item">
                  <p class="info-title">Likes</p>
                  <p class="info-value">${e.likes}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Views</p>
                  <p class="info-value">${e.views}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Comments</p>
                  <p class="info-value">${e.comments}</p>
              </li>
              <li class="info-item">
                  <p class="info-title">Downloads</p>
                  <p class="info-value">${e.downloads}</p>
              </li>
            </ul>
        </a>`,"");i.insertAdjacentHTML("beforeend",t),g.refresh()}function v(){f>i.children.length?c.style.display="block":(c.style.display="none",i.children.length>0&&p>1&&f===i.children.length&&r.info({title:"Info",message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}
//# sourceMappingURL=commonHelpers.js.map
