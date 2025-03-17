// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const plecesList = content.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(card, onDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardDeleteButton.addEventListener("click", onDelete);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const cardDelete = evt.target.closest(".places__item");
  cardDelete.remove();
}

// @todo: функция вставки карточки на страницу
function renderCard(cardElement, plecesList) {
  plecesList.append(cardElement);
}

//задача вывести все карточки на страницу
initialCards.forEach((card) => {
  renderCard(createCard(card, deleteCard), plecesList);
});
