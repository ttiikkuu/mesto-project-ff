import { getUser, deleteCardApi, deleteLike, AddLike } from './api.js'

export function createCard(item, deleteCard, like, openImagePopup) {

    const cardTemplate = document.querySelector('#card-template').content;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.id = item._id;
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeCard = cardElement.querySelector('.card__like-button');

    cardImage.addEventListener('click', openImagePopup);

    getUser()
    .then((data) => {
      const userId = data._id;
      if (item.owner._id !== userId) {
        deleteButton.style.display = 'none';
    }
    if (item.likes.some((el) => el._id == userId)) {
        likeCard.classList.add('card__like-button_is-active');
    }
    })
    .catch((err) => {
      console.log(err);
    });

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
        const card = evt.target.closest('.card');
        card.remove();
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
      AddLike(cardLikeId.id)
      .then((res) => {
        evt.target.classList.add('card__like-button_is-active');
        counterLikes.textContent = res.likes.length;
      })
      .catch((err) => {`Ошибка постановки лайка: ${err}`});
    }
  }