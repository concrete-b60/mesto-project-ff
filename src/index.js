import {
	loadInitialData,
	patchProfileAvatar,
	patchUserProfile,
	postNewCard,
} from './components/api';
import {
	createCard,
	handleDeleteCard,
	handleLikeToggle,
} from './components/card';
import { closeModal, openModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
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
const profileImage = document.querySelector('.profile__image');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector(
	'.popup__input_type_description'
);
const formNewPlace = document.querySelector('form[name="new-place"]');
const placeName = formNewPlace.querySelector('.popup__input_type_card-name');
const link = formNewPlace.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const formNewAvatar = document.querySelector('form[name="new-avatar"]');
const linkAvatar = formNewAvatar.querySelector('.popup__input_type_url-avatar');

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
};

loadInitialData()
	.then(([userData, cards]) => {
		profileTitle.textContent = userData.name;
		profileDescription.textContent = userData.about;
		profileImage.style.backgroundImage = `url("${userData.avatar}")`;

		localStorage.setItem('userId', userData._id);

		cards.forEach(card => {
			renderCard(
				createCard(
					card,
					handleDeleteCard,
					cardTemplate,
					handleLikeToggle,
					openPopupImage
				),
				placesList
			);
		});
	})
	.catch(err => {
		console.log(err);
	});

profileEditButton.addEventListener('click', function () {
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileDescription.textContent;
	clearValidation(formEditProfile, validationConfig);
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

	const popupButton = evt.target
		.closest('.popup')
		.querySelector('.popup__button');

	popupButton.textContent = 'Сохранение...';
	popupButton.disabled = true;

	patchUserProfile(nameInput.value, jobInput.value)
		.then(updateProfile => {
			profileTitle.textContent = updateProfile.name;
			profileDescription.textContent = updateProfile.about;
		})
		.catch(err => {
			console.log(err);
		})
		.finally(() => {
			popupButton.textContent = 'Сохранить';
			popupButton.disabled = false;
			closeModal(popupTypeEdit);
		});
}

formEditProfile.addEventListener('submit', handleFormSubmit);

function handleFormNewPlace(evt) {
	evt.preventDefault();

	const popupButton = evt.target
		.closest('.popup')
		.querySelector('.popup__button');

	popupButton.textContent = 'Сохранение...';
	popupButton.disabled = true;
	postNewCard(placeName.value, link.value)
		.then(card => {
			const newCard = createCard(
				card,
				handleDeleteCard,
				cardTemplate,
				handleLikeToggle,
				openPopupImage
			);
			placesList.prepend(newCard);
		})
		.catch(err => {
			console.log(err);
		})
		.finally(() => {
			popupButton.textContent = 'Сохранить';
			popupButton.disabled = false;
			placeName.value = '';
			link.value = '';
			clearValidation(formNewPlace, validationConfig);
			closeModal(popupTypeNewCard);
		});
}

formNewPlace.addEventListener('submit', handleFormNewPlace);

function renderCard(cardElement, placesList) {
	placesList.append(cardElement);
}

function openPopupImage(card) {
	popupImage.src = card.link;
	popupImage.alt = card.name;
	popupCaption.textContent = card.name;
	openModal(popupTypeImage);
}

enableValidation(validationConfig);

profileImage.addEventListener('click', function () {
	openModal(popupTypeNewAvatar);
});

function handleFormNewAvatar(evt) {
	evt.preventDefault();

	const popupButton = evt.target
		.closest('.popup')
		.querySelector('.popup__button');

	popupButton.textContent = 'Сохранение...';
	popupButton.disabled = true;
	patchProfileAvatar(linkAvatar.value)
		.then(data => {
			profileImage.style.backgroundImage = `url("${data.avatar}")`;
		})
		.catch(err => {
			console.log(err);
		})
		.finally(() => {
			popupButton.textContent = 'Сохранить';
			popupButton.disabled = false;
			linkAvatar.value = '';
			clearValidation(formNewAvatar, validationConfig);
			closeModal(popupTypeNewAvatar);
		});
}

formNewAvatar.addEventListener('submit', handleFormNewAvatar);
