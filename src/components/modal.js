function openModal(modal) {
	modal.classList.add('popup_is-opened');
	document.addEventListener('keydown', handleKeyEvent);
}

function closeModal(modal) {
	modal.classList.remove('popup_is-opened');
	modal.classList.add('popup_is-animated');
	document.removeEventListener('keydown', handleKeyEvent);
}

function handleKeyEvent(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		closeModal(openedPopup);
	}
}

export { closeModal, openModal };
