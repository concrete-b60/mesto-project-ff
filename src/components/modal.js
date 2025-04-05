function openModal(modal) {
	modal.classList.add('popup_is-opened');
	document.addEventListener('keydown', keyHandler);
}

function closeModal(modal) {
	modal.classList.remove('popup_is-opened');
	modal.classList.add('popup_is-animated');
	document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		closeModal(openedPopup);
	}
}

export { closeModal, openModal };
