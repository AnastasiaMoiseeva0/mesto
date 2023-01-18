/* "Элементы Найдены по id и сохранены в переменные */
let editProfileButton = document.querySelector('#edit-profile-button');

let closePopupButton = document.querySelector('#closeButton');

let popup = document.querySelector('#popup');
let formElement = document.querySelector('#formElement');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');

let profileName = document.querySelector('#profileName');
let profileProfession = document.querySelector('#profileProfession');

/* Функция открытия popup*/

function openEditProfilePopup() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

/* Функция сохранения изменений, вносимых пользователем, закрытие модального окна при нажатии на кнопку 'сохранить'*/

function handleFormSubmit (evt) {
  evt.preventDefault();

  let name = nameInput.value;
  let job = jobInput.value;

  profileName.textContent = name;
  profileProfession.textContent = job;

  closePopup();
}

/* Добавлена обработка событий с помощью addEventListener */

formElement.addEventListener('submit', handleFormSubmit);
closePopupButton.addEventListener('click', closePopup);

/* Функция закрытия popup */

function closePopup() {
  popup.classList.remove('popup_opened');

}

editProfileButton.addEventListener('click', openEditProfilePopup);