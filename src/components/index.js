import '../pages/index.css';

import { initialCards } from './cards.js'
import { createCard, deleteCard, like } from './card.js'
import { openModal, closeModal } from './modal.js'

const cardsContainer = document.querySelector('.places__list');
const imageModal = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editButton = document.querySelector('.profile__edit-button');
const modalEdit = document.querySelector('.popup_type_edit');
const formElementEditProfile = document.forms['edit-profile'];
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addCardButton = document.querySelector('.profile__add-button');
const modalAddCard = document.querySelector('.popup_type_new-card');
const formElementNewCard = document.forms[1];
const placeNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkInput = formElementNewCard.elements.link;

modalAddCard.classList.add('popup_is-animated');
imageModal.classList.add('popup_is-animated');
modalEdit.classList.add('popup_is-animated');

function openImagePopup (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imageModal);
}

function addCards() {
    initialCards.forEach(function (item) {
        const card = createCard(item, deleteCard, like, openImagePopup);
        cardsContainer.append(card);
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
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(modalEdit);
    formElementEditProfile.reset();
}
formElementEditProfile.addEventListener('submit', profileEditFormSubmit);

addCardButton.addEventListener('click', function(){
    openModal(modalAddCard);
});

document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closeModal(buttonsPopup));
});  

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardName = placeNameInput.value;
    const newCardImage = linkInput.value;
    const cards = {
        name: newCardName,
        link: newCardImage,
    };
    const newCard = createCard(cards, deleteCard, like, openImagePopup);
    cardsContainer.prepend(newCard);

    closeModal(modalAddCard);
    formElementNewCard.reset();
}
formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);