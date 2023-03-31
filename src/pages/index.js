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
  popupDeleteCard,
} from "../utils/constants.js";
import { Api } from '../components/Api.js';
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "110366df-b38b-45be-88c4-715aacdd3349",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then(json => {
  userInfo.setUserInfo({ name: json.name, job: json.about, id: json._id });
})
.catch(error => {
  console.log(error)
});

api.getInitialCards().then(json => {
  cardList.renderItems(json);
})
.catch(error => {
  console.log(error)
});

const cardList = new Section(
  {
    renderer: (elem) => {
      const newCard = createCard(elem);
      cardList.addItem(newCard);
    },
  },
  placesContainer
);

function createCard(elem) {
  const canBeDeleted = elem.owner._id === userInfo.getId();
  const liked = elem.likes.some(like => like._id === userInfo.getId());
  
  const newCard = new Card(
    elem,
    placeTemplate,
    canBeDeleted,
    liked,
    (cardData) => {
      imagePopup.open(cardData);
    },
    (cardData) => {
      confirmationDeletePopup.open(cardData._id);
    },
    (cardData, liked) => {
      const method = liked ? api.setLikeCard.bind(api) : api.deleteLikeCard.bind(api);

      method(cardData._id).then((json) => {
        const card = cardList.getById(cardData._id);
        card.toggleLike();
        card.updateData(json);
      })
      .catch(error => {
        console.log(error)
      });
    }
  );

  return newCard;
}

const confirmationDeletePopup = new PopupWithConfirmation(popupDeleteCard, config, (id) => {
  api.deleteCard(id).then(() => {
    cardList.removeItem(id);
  })
  .catch(error => {
    console.log(error)
  });
});

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
    api.setUserInfo({ name: nameInput, about: jobInput }).then(json => {
      userInfo.setUserInfo({ name: json.name, job: json.about });
    });
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
    api.createCards({ name: titleInput, link: urlInput }).then(cardData => {
      cardList.addItem(createCard(cardData))
    });
  }
);

profileEditButton.addEventListener("click", () => {
  profilePopup.open();
});
newCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
