import { openModal } from './modal';

function createCard(card, onDelete, cardTemplate, onLike, onPopup) {
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

	cardImage.addEventListener('click', () => onPopup(card));

	return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
	const cardDelete = evt.target.closest('.places__item');
	cardDelete.remove();
}

// @todo: функция вставки карточки на страницу
function renderCard(cardElement, placesList) {
	placesList.append(cardElement);
}

function toggleLike(evt) {
	evt.target.classList.toggle('card__like-button_is-active');
}

function popupImage(card) {
	const popupTypeImage = document.querySelector('.popup_type_image');
	const popupImage = popupTypeImage.querySelector('.popup__image');
	const popupCaption = popupTypeImage.querySelector('.popup__caption');

	popupImage.src = card.link;
	popupImage.alt = card.name;
	popupCaption.textContent = card.name;

	openModal(popupTypeImage);
}

export { createCard, deleteCard, popupImage, renderCard, toggleLike };
