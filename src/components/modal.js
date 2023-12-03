export const openModal = function(modalType) {
  modalType.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('click', closePopupOverlay);
}

export const closeModal = function(modalType) {
  modalType.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
  document.removeEventListener('click', closePopupOverlay);
}

const closePopupEscape = function(evt) {
  if (evt.keyCode === 27) {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }
}

const closePopupOverlay = function(evt) {
  if (evt.target === evt.target) {
    evt.target.classList.remove('popup_is-opened');
  }
}


