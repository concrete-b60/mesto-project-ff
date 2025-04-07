import {
	createCard,
	deleteCard,
	toggleLike,
} from './components/card';
import { initialCards } from './components/cards';
import { closeModal, openModal } from './components/modal';
import './pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelectorAll('.popup__close');
const popup = document.querySelectorAll('.popup');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeName = formNewPlace.querySelector('.popup__input_type_card-name');
const link = formNewPlace.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

//задача вывести все карточки на страницу
initialCards.forEach(card => {
	renderCard(
		createCard(card, deleteCard, cardTemplate, toggleLike, openPopupImage),
		placesList
	);
});

profileEditButton.addEventListener('click', function () {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;

	openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', function () {
	openModal(popupTypeNewCard);
});

popupClose.forEach(button => {
	button.addEventListener('click', function (evt) {
		const modal = evt.target.closest('.popup');
		closeModal(modal);
	});
});

popup.forEach(modal => {
	modal.addEventListener('click', function (event) {
		if (event.target === modal) {
			closeModal(modal);
		}
	});
});

function handleFormSubmit(evt) {
	evt.preventDefault();
	profileTitle.textContent = nameInput.value;
	profileDescription.textContent = jobInput.value;

	closeModal(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);

function handleFormNewPlace(evt) {
	evt.preventDefault();
	const card = { name: placeName.value, link: link.value };

	const newCard = createCard(
		card,
		deleteCard,
		cardTemplate,
		toggleLike,
		openPopupImage
	);
	placesList.prepend(newCard);

	placeName.value = '';
	link.value = '';
	closeModal(popupTypeNewCard);
}

formNewPlace.addEventListener('submit', handleFormNewPlace);

// @todo: функция вставки карточки на страницу
function renderCard(cardElement, placesList) {
	placesList.append(cardElement);
}

function openPopupImage(card) {
	popupImage.src = card.link;
	popupImage.alt = card.name;
	popupCaption.textContent = card.name;

	openModal(popupTypeImage);
}
