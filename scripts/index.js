// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
	
// @todo: DOM узлы

const cardsContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки

function createCard(item, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = item.link;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard() {
    const card = document.querySelector('.card__delete-button').closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу

function addCards() {
    initialCards.forEach(function (item) {
        const card = createCard(item, deleteCard);
        cardsContainer.append(card);
    });
}

addCards();


