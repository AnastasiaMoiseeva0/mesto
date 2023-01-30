// "Элементы Найдены по id и сохранены в переменные //
const editProfileButton = document.querySelector('#edit-profile-button');

const addNewCardButton = document.querySelector('#add-card-button');
const closeEditFormButton = document.querySelector('#closeEditFormButton');
const closeNewCardFormButton = document.querySelector('#closeNewCardFormButton');
const closePopupImageButton = document.querySelector('#closePopupImageButton');

const popupEditForm = document.querySelector('#popupEditForm');
const popupNewCardForm = document.querySelector('#popupNewCardForm');
const popupImage = document.querySelector('#popupImage');
const formElement = document.querySelector('#formElement');
const cardElement = document.querySelector('#cardElement');

const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const popupPhoto = document.querySelector('#popupPhoto');
const popupCaption = document.querySelector('#popupCaption');

const profileName = document.querySelector('#profileName');
const profileProfession = document.querySelector('#profileProfession');

const placeTitle = document.querySelector('#titlePlace');
const placePhoto = document.querySelector('#urlPlace');

const place = document.querySelector('#place').content; //находим содержимое template
const placesContainer = document.querySelector('#placesContainer'); //сохраняем в переменную контейнер с карточками

function openPopup (popupElement, onOpenCallback) { //аргументом в функцию передаем элемент popup, который мы открываем и коллбэк, выполняемый после открытия
  popupElement.classList.add('popup_opened');

  if (onOpenCallback && typeof onOpenCallback === "function") {
    onOpenCallback();
  }
}

function openEditProfilePopup() {
  openPopup(popupEditForm, () => {
    nameInput.value = profileName.textContent; 
    jobInput.value = profileProfession.textContent;
  });
}

// Функция открытия popup для добавления фото//

function openNewCardFormPopup() {
  openPopup(popupNewCardForm, () => {
    placeTitleInput.value = '';
    urlInput.value = '';
  });
}

function openImagePopup(link, title) {
  openPopup(popupImage, () => {
    popupCaption.textContent = title;
    popupPhoto.src = link;
  });
}
// Функция сохранения изменений, вносимых пользователем, закрытие модального окна при нажатии на кнопку 'сохранить'//

function handleFormSubmit (evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileProfession.textContent = job;

  closeEditFormPopup();
}

// Функция сохранения изменений, вносимых пользователем, закрытие модального окна при нажатии на кнопку 'создать'//

function handleNewCardFormSubmit (evt) {
  evt.preventDefault();

  const titleFromInput = placeTitleInput.value;
  const linkFromInput = urlInput.value;

  const newCard = createNewCard(linkFromInput, titleFromInput);

  placesContainer.prepend(newCard);

  closeNewCardFormPopup();
}

//функция создания новой карточки//

function createNewCard (link, title) {
  const newCard = place.firstElementChild.cloneNode(true);
  const newCardImage = newCard.querySelector('#urlPlace');
  
  newCardImage.src = link;
  newCard.querySelector('#titlePlace').textContent = title;

  newCard.querySelector('#button-like').addEventListener('click', evt => {
    evt.target.classList.toggle('place__icon-like_active');
  });

  newCard.querySelector('#button-trash').addEventListener('click', () => {
    newCard.remove();
  });
  
  newCardImage.addEventListener('click', () => {
    openImagePopup(link, title);
  });

  return newCard;
}

cardElement.addEventListener('submit', handleNewCardFormSubmit); //Обработка событий сохранения изменений при добавлении фото и описания
formElement.addEventListener('submit', handleFormSubmit); //Обработка событий сохранения изменений при изменении поля "о себе" и "имя"
closeEditFormButton.addEventListener('click', closeEditFormPopup);  //Закрытие попапа при нажатии на кнопку Х
closeNewCardFormButton.addEventListener('click', closeNewCardFormPopup);
closePopupImageButton.addEventListener('click', closePopupImage);

/* Функция закрытия popup */
function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
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

editProfileButton.addEventListener('click', openEditProfilePopup);
addNewCardButton.addEventListener('click', openNewCardFormPopup);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//размещение карточек из массива на странице//

const placesElements = initialCards.map((elem) => {
  const newCard = createNewCard(elem.link, elem.name);
  return (newCard);
});

placesContainer.prepend(...placesElements);
