import { Card } from './Card.js';
import { PopupWithImage, PopupWithForm } from './popups.js'; 
import {initialCards} from './cards.js';
import { FormValidator } from "./FormValidator.js";

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

const editProfileForm = document.querySelector(".edit-form_profile");
const nameInput = document.querySelector(".edit-form__field_name-input");
const jobInput = document.querySelector(".edit-form__field_job-input"); 
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const newCardForm = document.querySelector(".edit-form_card");
const placeTitleInput = document.querySelector(".edit-form__field_title-input");
const urlInput = document.querySelector(".edit-form__field_url-input");

const imagePopup = new PopupWithImage(popupImage);
const editProfileFormValidator = new FormValidator(editProfileForm, config);
const newCardFormValidator = new FormValidator(newCardForm, config);
editProfileFormValidator.enable();
newCardFormValidator.enable();

const profilePopup = new PopupWithForm(popupEditForm, config, editProfileFormValidator, () => {
  const name = nameInput.value;
  const job = jobInput.value; 

  profileName.textContent = name;
  profileProfession.textContent = job;
}, () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
});

const newCardPopup = new PopupWithForm(popupNewCardForm, config, newCardFormValidator, () => {
  const titleFromInput = placeTitleInput.value;
  const linkFromInput = urlInput.value;
  const cardData = { name: titleFromInput, link: linkFromInput };
  const newCard = new Card(cardData, placeTemplate, imagePopup);
  placesContainer.prepend(newCard.getElement());
}, () => {
  newCardForm.reset();
})

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