(()=>{"use strict";var t=function(){return fetch("https://nomoreparties.co/v1/wff-cohort-2/cards",{headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"}}).then((function(t){return t.json()})).then((function(t){return t}))},e=function(){return fetch("https://nomoreparties.co/v1/wff-cohort-2/users/me ",{method:"GET",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"}}).then((function(t){return t.json()})).then((function(t){return t}))};function n(t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);c.id=t._id;var a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button");return a.addEventListener("click",r),e().then((function(e){var n=e._id;t.owner._id!==n&&(u.style.display="none"),t.likes.some((function(t){return t._id==n}))&&s.classList.add("card__like-button_is-active")})).catch((function(t){console.log(t)})),a.src=t.link,a.alt=t.name,i.textContent=t.name,s.textContent=t.likes.length,s.addEventListener("click",o),u.addEventListener("click",n),c}function o(t){var e,n=t.target.closest(".card");(e=n.id,fetch("https://nomoreparties.co/v1/wff-cohort-2/cards/".concat(e),{method:"DELETE",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(){t.target.closest(".card").remove()})).catch((function(t){console.log(t)}))}var r=function(t){var e,n=t.target.closest(".card__like-button"),o=t.target.closest(".card");t.target.classList.contains("card__like-button_is-active")?(e=o.id,fetch("https://nomoreparties.co/v1/wff-cohort-2/cards/likes/".concat(e),{method:"DELETE",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(e){t.target.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(t){"Ошибка удаления лайка: ".concat(t)})):function(t){return fetch("https://nomoreparties.co/v1/wff-cohort-2/cards/likes/".concat(t),{method:"PUT",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))}(o.id).then((function(e){t.target.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(t){"Ошибка постановки лайка: ".concat(t)}))},c=function(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",i),t.addEventListener("click",u)},a=function(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),t.removeEventListener("click",u)},i=function(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");a(e)}},u=function(t){t.target==t.target&&t.target.classList.remove("popup_is-opened")},s=function(t,e){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove("form__submit_inactive")):(e.disabled=!0,e.classList.add("form__submit_inactive"))};function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var d=document.querySelector(".places__list"),f=document.querySelector(".popup_type_image"),p=document.querySelector(".popup__image"),m=document.querySelector(".popup__caption"),h=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),_=document.forms["edit-profile"],y=_.elements.name,g=_.elements.description,b=document.forms["edit-avatar"],k=b.elements.avatar,S=document.querySelector(".popup_type_avatar-edit"),L=document.querySelector(".profile__image"),E=document.querySelector(".profile__title"),j=document.querySelector(".profile__description"),q=document.querySelector(".profile__add-button"),C=document.querySelector(".popup_type_new-card"),w=document.forms[2],T=w.querySelector(".popup__input_type_card-name"),x=w.elements.link;function A(t){p.src=t.target.src,p.alt=t.target.alt,m.textContent=t.target.alt,c(f)}C.classList.add("popup_is-animated"),f.classList.add("popup_is-animated"),v.classList.add("popup_is-animated"),S.classList.add("popup_is-animated"),L.addEventListener("click",(function(){c(S)})),t().then((function(t){t.forEach((function(t){var e=n(t,o,r,A);t.id=t._id,d.append(e)}))})).catch((function(t){console.log(t)})),h.addEventListener("click",(function(){y.value=E.textContent,g.value=j.textContent,c(v)})),_.addEventListener("submit",(function(t){var e;t.preventDefault(),(e={name:y.value,about:g.value},fetch("https://nomoreparties.co/v1/wff-cohort-2/users/me",{method:"PATCH",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.about})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){E.textContent=t.name,j.textContent=t.about})).catch((function(t){console.log(t)})),a(v)})),b.addEventListener("submit",(function(t){var e;t.preventDefault(),(e=k.value,fetch("https://nomoreparties.co/v1/wff-cohort-2/users/me/avatar",{method:"PATCH",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){L.style.backgroundImage="url('".concat(t.avatar,"')")})).catch((function(t){console.log(t)})),a(S),b.reset()})),q.addEventListener("click",(function(){c(C)})),document.querySelectorAll(".popup__close").forEach((function(t){var e=t.closest(".popup");t.addEventListener("click",(function(){return a(e)}))})),w.addEventListener("submit",(function(t){var e;t.preventDefault(),(e={name:T.value,link:x.value},fetch("https://nomoreparties.co/v1/wff-cohort-2/cards",{method:"POST",headers:{authorization:"46247d38-ec87-463c-9f64-1af8e2f1c203","Content-Type":"application/json"},body:JSON.stringify({name:e.name,link:e.link})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}))).then((function(t){var e=n(t,o,r,A);T.value="",x.value="",d.prepend(e),a(C),w.reset()})).catch((function(t){console.log(t)}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(t){!function(t){var e=Array.from(t.querySelectorAll(".popup__input")),n=t.querySelector(".popup__button");s(e,n),e.forEach((function(o){o.addEventListener("input",(function(){!function(t,e){e.validity.patternMismatch?e.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):e.setCustomValidity(""),e.validity.valid?function(t,e){var n=t.querySelector(".".concat(e.id,"_error"));e.classList.remove("popup__input_error"),n.classList.remove("form__input-error_active"),n.textContent=""}(t,e):function(t,e,n){var o=t.querySelector(".".concat(e.id,"_error"));e.classList.add("popup__input_error"),o.textContent=n,o.classList.add("form__input-error_active")}(t,e,e.validationMessage)}(t,o),s(e,n)}))}))}(t)})),Promise.all([e(),t()]).then((function(t){var e,n,o=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==e);u=!0);}catch(t){s=!0,r=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0];o[1],E.textContent=r.name,j.textContent=r.about,L.style.backgroundImage="url('".concat(r.avatar,"')")})).catch((function(t){console.log("Ошибка: ".concat(t))}))})();