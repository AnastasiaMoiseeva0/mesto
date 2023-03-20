import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import { initialCards } from '../components/cards.js';
import UserInfo from '../components/UserInfo.js';

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

const cardList = new Section({
  items: initialCards,
  renderer: (elem) => {
      const newCard = new Card(elem, placeTemplate, (cardData) => {
        imagePopup.open(cardData)
      });
      const newCardElement = newCard.getElement();
      cardList.addItem(newCardElement);
  },
},
  placesContainer
)

cardList.renderItems();

const imagePopup = new PopupWithImage(popupImage);
const editProfileFormValidator = new FormValidator(editProfileForm, config);
const newCardFormValidator = new FormValidator(newCardForm, config);
const userInfo = new UserInfo({ profileName, profileProfession });

editProfileFormValidator.enable();
newCardFormValidator.enable();

const profilePopup = new PopupWithForm(popupEditForm, config, editProfileFormValidator, () => {
  const name = nameInput.value;
  const job = jobInput.value; 

  userInfo.setUserInfo({name, job});
}, () => {
  const info = userInfo.getUserInfo();

  nameInput.value = info.name;
  jobInput.value = info.job;
});

const newCardPopup = new PopupWithForm(popupNewCardForm, config, newCardFormValidator, () => {
  const titleFromInput = placeTitleInput.value;
  const linkFromInput = urlInput.value;
  const cardData = { name: titleFromInput, link: linkFromInput };
  const newCard = new Card(cardData, placeTemplate, (cardData) => {
    imagePopup.open(cardData);
  });
  cardList.addItem(newCard.getElement());
}, () => {
  newCardForm.reset();
})

profileEditButton.addEventListener("click", () => {
 profilePopup.open();
});
newCardButton.addEventListener("click", () => {
  newCardPopup.open();
});