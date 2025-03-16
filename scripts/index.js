// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const plecesList = content.querySelector('.places__list');
const profileAddButton = content.querySelector('.profile__add-button');
// @todo: Функция создания карточки
function createCard(initialCards) {
  initialCards.forEach(function(element) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
 
    cardTitle.textContent = element.name;
    cardImage.src = element.link;

    cardDeleteButton.addEventListener('click', deleteCard)

    plecesList.append(cardElement);
})
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  const cardDelete = evt.target.closest('.places__item');
    cardDelete.remove();
}
// @todo: Вывести карточки на страницу
profileAddButton.addEventListener('click', function () {
  createCard(initialCards);
});