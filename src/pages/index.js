import "./index.css";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/cards.js";
import UserInfo from "../components/UserInfo.js";
import {
  config,
  profileEditButton,
  popupEditForm,
  popupNewCardForm,
  popupImage,
  placeTemplate,
  placesContainer,
  editProfileForm,
  profileName,
  profileProfession,
  newCardForm,
  newCardButton,
} from "../utils/constants.js";

const cardList = new Section(
  {
    items: initialCards,
    renderer: (elem) => {
      const newCardElement = createCard(elem);
      cardList.addItem(newCardElement);
    },
  },
  placesContainer
);

function createCard(elem) {
  const newCard = new Card(elem, placeTemplate, (cardData) => {
    imagePopup.open(cardData);
  });

  return newCard.getElement();
}

cardList.renderItems();

const imagePopup = new PopupWithImage(popupImage);
const editProfileFormValidator = new FormValidator(editProfileForm, config);
const newCardFormValidator = new FormValidator(newCardForm, config);
const userInfo = new UserInfo({ profileName, profileProfession });

editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
  popupEditForm,
  config,
  editProfileFormValidator,
  ({ nameInput, jobInput }) => {
    userInfo.setUserInfo({ name: nameInput, job: jobInput });
  },
  () => {
    const info = userInfo.getUserInfo();

    profilePopup.setInputValues({
      nameInput: info.name,
      jobInput: info.job,
    });
  }
);

const newCardPopup = new PopupWithForm(
  popupNewCardForm,
  config,
  newCardFormValidator,
  ({ titleInput, urlInput }) => {
    const cardData = { name: titleInput, link: urlInput };
    cardList.addItem(createCard(cardData));
  }
);

profileEditButton.addEventListener("click", () => {
  profilePopup.open();
});
newCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
