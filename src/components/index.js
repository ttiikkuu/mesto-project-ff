import '../pages/index.css';
import { createCard, deleteCard, like, deleteButtonHide } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validation.js'
import { getCards, createNewCard, getUser, updateUser, updateUserAvatar } from './api.js'

const cardsContainer = document.querySelector('.places__list');
const imageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const modalEdit = document.querySelector('.popup_type_edit');
const formElementEditProfile = document.forms['edit-profile'];
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;
const formElementEditAvatar = document.forms['edit-avatar'];
const avatarInput = formElementEditAvatar.elements.avatar;
const avatarEditModal = document.querySelector('.popup_type_avatar-edit');
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addCardButton = document.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');
const formElementNewCard = document.forms[2];
const placeNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkInput = formElementNewCard.elements.link;
const buttonAddCard = document.querySelector('.button__add-card');
const buttonEditProfile = document.querySelector('.button__edit-profile');
const buttonEditAvatar = document.querySelector('.button__edit-avatar');

modalAddCard.classList.add('popup_is-animated');
imageModal.classList.add('popup_is-animated');
modalEdit.classList.add('popup_is-animated');
avatarEditModal.classList.add('popup_is-animated');


function statusLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

profileImage.addEventListener('click', function(){
    openModal(avatarEditModal);
    clearValidation(formElementEditAvatar, validationConfig);
});

function openImagePopup (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imageModal);
}

function addCards(cards, userId) {
      cards.forEach(function (item) {
        const card = createCard(item, deleteCard, like, openImagePopup, userId);
        item.id = item._id;
        cardsContainer.append(card);
      });
}


editButton.addEventListener('click', function(){
    clearValidation(formElementEditProfile, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    
    openModal(modalEdit);
});

function profileEditFormSubmit(evt) {
    evt.preventDefault();
    statusLoading(true, buttonEditProfile, "Сохранить", "Сохранение...");
    updateUser({name: nameInput.value, about: jobInput.value})
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(modalEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      statusLoading(false, buttonEditProfile, "Сохранить", "Сохранение...");
    });
}
formElementEditProfile.addEventListener('submit', profileEditFormSubmit);

function avatarEditFormSubmit(evt) {
  evt.preventDefault();
  statusLoading(true, buttonEditAvatar, "Сохранить", "Сохранение...");
  updateUserAvatar(avatarInput.value)
  .then((data) => {
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
    closeModal(avatarEditModal);
    formElementEditAvatar.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    statusLoading(false, buttonEditAvatar, "Сохранить", "Сохранение...");
  });
}
formElementEditAvatar.addEventListener('submit', avatarEditFormSubmit);

addCardButton.addEventListener('click', function(){
    openModal(modalAddCard);
    clearValidation(formElementNewCard, validationConfig);
});

document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(buttonsPopup));
});  

function handleNewCardFormSubmit(evt, userId) {
    evt.preventDefault();
    statusLoading(true, buttonAddCard, "Создать", "Создание...");
    createNewCard({name: placeNameInput.value, link: linkInput.value})
    .then((data) => {
      const newCard = createCard(data, deleteCard, like, openImagePopup, userId);
      placeNameInput.value = '';
      linkInput.value = '';

      cardsContainer.prepend(newCard);
      closeModal(modalAddCard);
      formElementNewCard.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      statusLoading(false, buttonAddCard, "Создать", "Создание...");
    });
}


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'form__input-error_active'
}

enableValidation(validationConfig);

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    const userId = userData._id
    addCards(cards, userId);
    formElementNewCard.addEventListener('submit', evt => handleNewCardFormSubmit(evt, userId));
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });