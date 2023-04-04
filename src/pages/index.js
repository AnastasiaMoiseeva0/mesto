import "./index.css";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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
  newAvatarButton,
  popupNewAvatar,
  newAvatarForm,
  avatarImage
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([user, cards]) => {
  userInfo.setUserInfo({ name: user.name, job: user.about, id: user._id, link: user.avatar });
  cardList.renderItems(cards.reverse());
})
.catch(error => {
  console.log(error)
});

const cardList = new Section(
  {
    renderer: (elem) => {
      const newCard = createCard(elem).getElement();
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
    (card) => {
      confirmationDeletePopup.open(card);
    },
    (card, liked) => {
      const method = liked ? api.setLikeCard.bind(api) : api.deleteLikeCard.bind(api);

      method(card.getId()).then((json) => {
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

const confirmationDeletePopup = new PopupWithConfirmation(popupDeleteCard, config, (card) => {
  api.deleteCard(card.getId()).then(() => {
    card.removeCard();
    confirmationDeletePopup.close();
  })
  .catch(error => {
    console.log(error)
  })
});

const imagePopup = new PopupWithImage(popupImage);
const editProfileFormValidator = new FormValidator(editProfileForm, config);
const newCardFormValidator = new FormValidator(newCardForm, config);
const userInfo = new UserInfo({ profileName, profileProfession, newAvatar: avatarImage });
const avatarFormValidator = new FormValidator(newAvatarForm, config);

editProfileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const profilePopup = new PopupWithForm(
  popupEditForm,
  config,
  editProfileFormValidator,
  ({ nameInput, jobInput }) => {
    api.setUserInfo({ name: nameInput, about: jobInput }).then(json => {
      userInfo.setUserInfo({ name: json.name, job: json.about, id: json._id, link: json.avatar });
      profilePopup.close();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      profilePopup.setLoading(false);
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

const avatarPopup = new PopupWithForm(
  popupNewAvatar,
  config,
  avatarFormValidator,
  ({avatarInput}) => {
    api.setNewAvatar({ avatar: avatarInput }).then(json => {
      userInfo.setUserInfo({ name: json.name, job: json.about, id: json._id, link: json.avatar });
      avatarPopup.close();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      avatarPopup.setLoading(false);
    });
  },
  () => {
    avatarPopup.setInputValues({
      avatarInput: '',
    });
  }
);

const newCardPopup = new PopupWithForm(
  popupNewCardForm,
  config,
  newCardFormValidator,
  ({ titleInput, urlInput }) => {
    api.createCards({ name: titleInput, link: urlInput }).then(cardData => {
      const newCard = createCard(cardData).getElement();
      cardList.addItem(newCard);
      newCardPopup.close();
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      newCardPopup.setLoading(false);
    });
  }
);

profileEditButton.addEventListener("click", () => {
  profilePopup.open();
});
newCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
newAvatarButton.addEventListener("click", () => {
  avatarPopup.open();
});
