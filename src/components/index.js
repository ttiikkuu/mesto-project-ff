import '../pages/index.css';
import { createCard, deleteCard, like } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation } from './validation.js'
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
});

function openImagePopup (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imageModal);
}

function addCards() {
  getCards()
    .then((data) => {
      data.forEach(function (item) {
        const card = createCard(item, deleteCard, like, openImagePopup);
        item.id = item._id;
        cardsContainer.append(card);

      })
    })
    .catch((err) => {
      console.log(err);
    });
}
addCards();

editButton.addEventListener('click', function(){
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      statusLoading(false, buttonEditProfile, "Сохранить", "Сохранение...");
    });

    closeModal(modalEdit);
}
formElementEditProfile.addEventListener('submit', profileEditFormSubmit);

function avatarEditFormSubmit(evt) {
  evt.preventDefault();
  statusLoading(true, buttonEditAvatar, "Сохранить", "Сохранение...");
  updateUserAvatar(avatarInput.value)
  .then((data) => {
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    statusLoading(false, buttonEditAvatar, "Сохранить", "Сохранение...");
  });

  closeModal(avatarEditModal);
  formElementEditAvatar.reset();
}
formElementEditAvatar.addEventListener('submit', avatarEditFormSubmit);

addCardButton.addEventListener('click', function(){
    openModal(modalAddCard);
});

document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(buttonsPopup));
});  

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    statusLoading(true, buttonAddCard, "Сохранить", "Сохранение...");
    createNewCard({name: placeNameInput.value, link: linkInput.value})
    .then((data) => {
      const newCard = createCard(data, deleteCard, like, openImagePopup);
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
      statusLoading(false, buttonAddCard, "Сохранить", "Сохранение...");
    });
}
formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);

enableValidation(); 

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });