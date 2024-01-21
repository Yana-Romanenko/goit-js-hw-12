import{a as E,S as I,i as m}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))f(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&f(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const b=E.create({baseURL:"https://pixabay.com/api/",params:{key:"41764451-f0ee5e8d00846e21c9f97a054",language:"en",image_type:"photo",orientation:"horizontal",safesearch:!0}}),w=document.getElementById(".search-form"),a=document.getElementById(".gallery"),o=document.getElementById(".load-more-button"),S=document.getElementById(".spinner");let c,d=1,p=40,g="";w.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget).get("query");if(t){g=t,d=1;try{i(!0);const s=await y();x(s.hits)}catch{u()}finally{i(!1)}}});o.addEventListener("click",async()=>{d+=1,await q(),o.classList.add("is-hidden"),v()});async function y(){return(await b.get("",{params:{q:g,page:d,per_page:p}})).data}async function q(){try{i(!0);const e=await y();M(e.hits)}catch{u()}finally{i(!1)}}function x(e){if(e.length===0){u();return}e.length<p,o.classList.remove("is-hidden"),i(!1);const t=e.map(h);a.innerHTML="",a.append(...t),L()}function M(e){if(e.length===0){o.classList.add("is-hidden"),i(!1),v();return}const t=e.map(h);a.append(...t),L()}function h(e){const t=document.createElement("a");return t.href=e.largeImageURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
    <div class="gallery-item">
      <img src="${e.largeImageURL}" alt="${e.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${e.likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${e.views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${e.comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${e.downloads}</p>
        </div>
      </div>
    </div>
  `,t}function L(){c?c.refresh():c=new I(".gallery a")}function v(){m.info({title:"Info",message:"There are no more images for your request."})}function i(e){S.classList.toggle("is-hidden",!e)}function u(){a.innerHTML="",m.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
