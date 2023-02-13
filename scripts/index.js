/** Элементы Найдены по id и сохранены в переменные */
const profileEditButton = document.querySelector("#edit-profile-button");

const newCardButton = document.querySelector("#add-card-button");

const popupEditForm = document.querySelector("#popupEditForm");
const popupNewCardForm = document.querySelector("#popupNewCardForm");
const popupImage = document.querySelector("#popupImage");
const profileForm = document.querySelector("#profileForm");
const cardForm = document.querySelector("#cardForm");

const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const popupPhoto = document.querySelector("#popupPhoto");
const popupCaption = document.querySelector("#popupCaption");

const profileName = document.querySelector("#profileName");
const profileProfession = document.querySelector("#profileProfession");

const placeTitleInput = document.querySelector("#placeTitleInput");
const urlInput = document.querySelector("#urlInput");

const placeTemplate = document.querySelector("#place").content; //находим содержимое template
const placesContainer = document.querySelector("#placesContainer"); //сохраняем в переменную контейнер с карточками

const config = {
  popupClass: ".popup",
  popupCloseButtonClass: ".popup__close",
  editFormSelector: ".edit-form",
  editFormFieldSelector: ".edit-form__field",
  editFormErrorActiveClass: "edit-form__field-error_active",
  editFormTypeErrorClass: "edit-form__field_type_error",
  editFormSubmitSelector: ".edit-form__submit",
};


const allPopups = [
  popupEditForm,
  popupNewCardForm,
  popupImage,
];

function openPopup(popupElement) {
  //аргументом в функцию передаем элемент popup, который мы открываем и коллбэк, выполняемый после открытия
  popupElement.classList.add("popup_opened");
  
  document.addEventListener("keydown", (evt) => keyHandlerEsc(evt, popupElement));
}

function openEditProfilePopup() {
  openPopup(popupEditForm);

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

/** Функция открытия popup для добавления фото */

function openNewCardFormPopup() {
  openPopup(popupNewCardForm);

  cardForm.reset();
}

function openImagePopup(cardData) {
  openPopup(popupImage);

  popupCaption.textContent = cardData.name;
  popupPhoto.src = cardData.link;
  popupPhoto.alt = cardData.name;
}

/** Функция сохранения изменений, вносимых пользователем, закрытие модального окна при нажатии на кнопку 'сохранить'*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileProfession.textContent = job;

  closeEditFormPopup();
}

/** Функция сохранения изменений, вносимых пользователем, закрытие модального окна при нажатии на кнопку 'создать'*/

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const titleFromInput = placeTitleInput.value;
  const linkFromInput = urlInput.value;

  const cardData = { name: titleFromInput, link: linkFromInput };

  const newCard = createNewCard(cardData);

  placesContainer.prepend(newCard);

  closeNewCardFormPopup();
}

/**функция создания новой карточки*/

function createNewCard(cardData) {
  const newCard = placeTemplate.firstElementChild.cloneNode(true);
  const newCardImage = newCard.querySelector("#urlPlace");

  newCardImage.src = cardData.link;
  newCard.querySelector("#titlePlace").textContent = cardData.name;
  newCardImage.alt = cardData.name;

  const buttonLike = newCard.querySelector("#button-like");

  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("place__icon-like_active");
  });

  newCard.querySelector("#button-trash").addEventListener("click", () => {
    newCard.remove();
  });

  newCardImage.addEventListener("click", () => {
    openImagePopup(cardData);
  });

  return newCard;
}

/** Функция закрытия popup */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  resetValidation(popupElement, config);

  document.removeEventListener("keydown", (evt) => keyHandlerEsc(evt, popupElement));
}

function closeEditFormPopup() {
  closePopup(popupEditForm);
}

function closeNewCardFormPopup() {
  closePopup(popupNewCardForm);
}

function closePopupImage() {
  closePopup(popupImage);
}

/**размещение карточек из массива на странице*/

const placesElements = initialCards.map((elem) => {
  const newCard = createNewCard(elem);
  return newCard;
});

placesContainer.prepend(...placesElements);

/** Функция закрытия попапа при нажатии на кнопку esc */
function keyHandlerEsc(evt, openedPopup) {

  if(evt.key === "Escape"){
     closePopup(openedPopup);
  }
}

/** Функция закрытия попапа при нажатии на кнопку х или overlay */
function initClosePopupListeners(allPopups) {
  allPopups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
  
    closeButton.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  })
}

initClosePopupListeners(allPopups);

cardForm.addEventListener("submit", handleNewCardFormSubmit); //Обработка событий сохранения изменений при добавлении фото и описания
profileForm.addEventListener("submit", handleProfileFormSubmit); //Обработка событий сохранения изменений при изменении поля "о себе" и "имя"

profileEditButton.addEventListener("click", openEditProfilePopup);
newCardButton.addEventListener("click", openNewCardFormPopup);

enableValidation(config);
