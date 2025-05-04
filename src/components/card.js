import { deleteCard, deleteLikeCard, putLikeCard } from './api';

function createCard(card, onDelete, cardTemplate, onLike, openModalCard) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImage = cardElement.querySelector('.card__image');
	const cardDeleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeButton = cardElement.querySelector('.card__like-button');
	const cardLikeCounter = cardElement.querySelector('.card__like-counter');
	const userId = localStorage.getItem('userId');

	cardTitle.textContent = card.name;
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardLikeCounter.textContent = card.likes.length;

	cardElement.dataset.cardId = card._id;

	if (card.owner._id !== userId) {
		cardDeleteButton.classList.add('card__delete-button-none');
	}

	if (card.likes.some(user => user._id === userId)) {
		cardLikeButton.classList.add('card__like-button_is-active');
	}

	cardDeleteButton.addEventListener('click', onDelete);
	cardLikeButton.addEventListener('click', onLike);

	cardImage.addEventListener('click', () => openModalCard(card));

	return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(evt) {
	const cardElement = evt.target.closest('.places__item');
	const cardId = cardElement.dataset.cardId;

	deleteCard(cardId)
		.then(() => {
			cardElement.remove();
		})
		.catch(err => {
			console.log(err);
		});
}

function handleLikeToggle(evt) {
	const cardElement = evt.target.closest('.places__item');
	const cardId = cardElement.dataset.cardId;
	const cardLikeCounter = cardElement.querySelector('.card__like-counter');

	if (!evt.target.classList.contains('card__like-button_is-active')) {
		putLikeCard(cardId)
			.then(likeCard => {
				cardLikeCounter.textContent = likeCard.likes.length;
				evt.target.classList.toggle('card__like-button_is-active');
			})
			.catch(err => {
				console.log(err);
			});
	} else {
		deleteLikeCard(cardId)
			.then(dislikeCard => {
				cardLikeCounter.textContent = dislikeCard.likes.length;
				evt.target.classList.toggle('card__like-button_is-active');
			})
			.catch(err => {
				console.log(err);
			});
	}
}

export { createCard, handleDeleteCard, handleLikeToggle };
