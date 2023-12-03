export function createCard(item, deleteCard, like, openImagePopup) {

    const cardTemplate = document.querySelector('#card-template').content;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCard = cardElement.querySelector('.card__like-button');

    likeCard.addEventListener('click', like);

    cardImage.addEventListener('click', openImagePopup);

    
    
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

export function deleteCard() {
    const card = document.querySelector('.card__delete-button').closest('.card');
    card.remove();
}

export function like (evt) {
    const likeIcon = evt.target.closest('.card__like-button');
    likeIcon.classList.toggle('card__like-button_is-active');
}