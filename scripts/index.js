// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
	
// @todo: DOM узлы

const cardsContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки

function cards(callback) {
	
	for (let i = 0; i < initialCards.length; i++) {
		
		const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
			  
		cardElement.querySelector('.card__image').src = initialCards[i].link;
		
		cardElement.querySelector('.card__title').textContent = initialCards[i].name;

        cardElement.querySelector('.card__delete-button').addEventListener('click', callback);

		cardsContainer.append(cardElement); 

	}

}

// @todo: Функция удаления карточки

function deleteCard() {
    const card = document.querySelector('.card__delete-button').closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу

cards(deleteCard);


