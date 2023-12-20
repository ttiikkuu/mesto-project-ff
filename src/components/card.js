import { getUser, deleteCardApi, deleteLike, addLike } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, deleteCard, like, openImagePopup, userId) {

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.id = item._id;
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCard = cardElement.querySelector('.card__like-button');

    cardImage.addEventListener('click', openImagePopup);


    if (item.owner._id !== userId) {
        deleteButton.remove();
    }

    if (item.likes.some((el) => el._id == userId)) {
        likeCard.classList.add('card__like-button_is-active');
    }


    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    likeCard.textContent = item.likes.length;

    likeCard.addEventListener('click', like);

    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}

export function deleteCard(evt) {
    const elementCard = evt.target.closest(".card");
    deleteCardApi(elementCard.id)
    .then(() => {
      elementCard.remove();
    })
    .catch((err) => {
        console.log(err);
    });
}

export const like = (evt) => {
    const counterLikes = evt.target.closest('.card__like-button');
    const cardLikeId = evt.target.closest(".card");
    if(evt.target.classList.contains('card__like-button_is-active')) {
      deleteLike(cardLikeId.id)
      .then((res) => {
        evt.target.classList.remove('card__like-button_is-active');
        counterLikes.textContent = res.likes.length;
      })
      .catch((err) => {`Ошибка удаления лайка: ${err}`});
    } else {
      addLike(cardLikeId.id)
      .then((res) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = res.likes.length;
      })
      .catch((err) => {`Ошибка постановки лайка: ${err}`});
    }
  }