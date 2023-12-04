export const openModal = function(modalType) {
  modalType.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
  modalType.addEventListener('click', closePopupOverlay);
}

export const closeModal = function(modalType) {
  modalType.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
  modalType.removeEventListener('click', closePopupOverlay);
}

const closePopupEscape = function(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
}

const closePopupOverlay = function(evt) {
  if (evt.target === evt.target) {
    evt.target.classList.remove('popup_is-opened');
  }
}


