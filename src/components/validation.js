function showInputError(
	popupElement,
	inputElement,
	errorMessage,
	validationConfig
) {
	const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(validationConfig.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(popupElement, inputElement, validationConfig) {
	const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(validationConfig.inputErrorClass);
	errorElement.classList.remove(validationConfig.errorClass);
	errorElement.textContent = '';
	inputElement.setCustomValidity('');
}

function isValid(popupElement, inputElement, validationConfig) {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity('');
	}

	if (!inputElement.validity.valid) {
		showInputError(
			popupElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		);
	} else {
		hideInputError(popupElement, inputElement, validationConfig);
	}
}

function setEventListeners(popupElement, validationConfig) {
	const popupInputList = Array.from(
		popupElement.querySelectorAll(validationConfig.inputSelector)
	);
	const buttonElement = popupElement.querySelector(
		validationConfig.submitButtonSelector
	);

	toggleButtonState(
		popupInputList,
		buttonElement,
		validationConfig.inactiveButtonClass
	);

	popupInputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			isValid(popupElement, inputElement, validationConfig);

			toggleButtonState(
				popupInputList,
				buttonElement,
				validationConfig.inactiveButtonClass
			);
		});
	});
}

function enableValidation(validationConfig) {
	const popupList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	);

	popupList.forEach(popupElement => {
		setEventListeners(popupElement, validationConfig);
	});
}

function hasInvalidInput(popupInputList) {
	return popupInputList.some(inputElement => {
		return !inputElement.validity.valid;
	});
}

function toggleButtonState(popupInputList, buttonElement, inactiveButtonClass) {
	if (hasInvalidInput(popupInputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(inactiveButtonClass);
	}
}

function clearValidation(popupElement, validationConfig) {
	const popupInputList = Array.from(
		popupElement.querySelectorAll(validationConfig.inputSelector)
	);

	const buttonElement = popupElement.querySelector(
		validationConfig.submitButtonSelector
	);

	toggleButtonState(
		popupInputList,
		buttonElement,
		validationConfig.inactiveButtonClass
	);

	popupInputList.forEach(inputElement => {
		hideInputError(popupElement, inputElement, validationConfig);
	});
}

export { clearValidation, enableValidation };
