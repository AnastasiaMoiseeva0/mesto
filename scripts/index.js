import { Card } from './Card.js';

import { ImagePopup, EditProfilePopup, NewCardPopup } from './popups.js'; 

const config = {
  popupClass: ".popup",
  popupCloseButtonClass: ".popup__close",
  editFormSelector: ".edit-form",
  editFormFieldSelector: ".edit-form__field",
  editFormErrorActiveClass: "edit-form__field-error_active",
  editFormTypeErrorClass: "edit-form__field_type_error",
  editFormSubmitSelector: ".edit-form__submit",
  buttonDisabledClass: "button_disabled",
};

/** Элементы Найдены по id и сохранены в переменные */
const profileEditButton = document.querySelector("#edit-profile-button");

const newCardButton = document.querySelector("#add-card-button");

const popupEditForm = document.querySelector("#popupEditForm");
const popupNewCardForm = document.querySelector("#popupNewCardForm");
const popupImage = document.querySelector("#popupImage");

const placeTemplate = document.querySelector("#place").content; //находим содержимое template
const placesContainer = document.querySelector("#placesContainer"); //сохраняем в переменную контейнер с карточками

const imagePopup = new ImagePopup(popupImage);
const editProfilePopup = new EditProfilePopup(popupEditForm, config);
const newCardPopup = new NewCardPopup(popupNewCardForm, config, placeTemplate, popupImage, placesContainer)

/**размещение карточек из массива на странице*/
const placesElements = initialCards.map((elem) => {
  const newCard = new Card(elem, placeTemplate, imagePopup);
  return newCard.getElement();
});

placesContainer.prepend(...placesElements);

profileEditButton.addEventListener("click", () => {
 editProfilePopup.open();
});
newCardButton.addEventListener("click", () => {
  newCardPopup.open();
});