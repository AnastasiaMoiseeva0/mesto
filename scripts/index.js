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
const profileEditButton = document.querySelector(".profile__edit-button");

const newCardButton = document.querySelector(".profile__add");

const popupEditForm = document.querySelector(".popup_form_edit-profile");
const popupNewCardForm = document.querySelector(".popup_form_new-card");
const popupImage = document.querySelector(".popup_image");

const placeTemplate = document.querySelector(".place_template").content; //находим содержимое template
const placesContainer = document.querySelector(".places"); //сохраняем в переменную контейнер с карточками

const imagePopup = new ImagePopup(popupImage);
const profilePopup = new EditProfilePopup(popupEditForm, config);
const newCardPopup = new NewCardPopup(popupNewCardForm, config, placeTemplate, popupImage, placesContainer)

/**размещение карточек из массива на странице*/
const placesElements = initialCards.map((elem) => {
  const newCard = new Card(elem, placeTemplate, imagePopup);
  return newCard.getElement();
});

placesContainer.prepend(...placesElements);


profileEditButton.addEventListener("click", () => {
 profilePopup.open();
});
newCardButton.addEventListener("click", () => {
  newCardPopup.open();
});