function createCard(card, onDelete, cardTemplate, onLike, openModalCard) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');

	cardTitle.textContent = card.name;
	cardImage.src = card.link;
	cardImage.alt = card.name;

	cardDeleteButton.addEventListener('click', onDelete);
	cardLikeButton.addEventListener('click', onLike);

	cardImage.addEventListener('click', () => openModalCard(card));

	return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
	const cardDelete = evt.target.closest('.places__item');
	cardDelete.remove();
}

function toggleLike(evt) {
	evt.target.classList.toggle('card__like-button_is-active');
}



export { createCard, deleteCard, toggleLike };
