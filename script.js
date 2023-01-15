let editProfileButton = document.querySelector('#edit-profile-button');
let popupHost = document.querySelector('#host');

function openEditProfilePopup() {
    let closePopupButton = popupHost.querySelector('#closeButton');

    let formElement = popupHost.querySelector('#formElement');
    let nameInput = popupHost.querySelector('#nameInput');
    let jobInput = popupHost.querySelector('#jobInput');

    function closePopup() {
        formElement.removeEventListener('submit', handleFormSubmit);

        closePopupButton.removeEventListener('click', closePopup);
        popupHost.innerHTML = '';
    }

    function handleFormSubmit (evt) {
        evt.preventDefault();

        let name = nameInput.value;
        let job = jobInput.value;

        let profileName = document.querySelector('#profileName');
        let profileProfession = document.querySelector('#profileProfession');

        profileName.textContent = name;
        profileProfession.textContent = job;
    }

    popupHost.innerHTML = `
      <div class="popup">
        <div class="popup__close">
          <button id="closeButton" class="button button_transparent button_size-medium">
            <img class="icon icon_close" src="./images/popup-close_icon.svg" alt="Кнопка 'Закрыть окно'">
          </button>
        </div>
        <form id="formElement" class="edit-form">
          <h2 class="edit-form__title">Редактировать профиль</h2>
          <input id="nameInput" class="edit-form__field" value="Жак-Ив Кусто"></input>
          <input id="jobInput" class="edit-form__field" value="Исследователь океана"></input>
          <button class="edit-form__submit button button_size-big">Сохранить</button>
        </form>
      </div>
    `;

    formElement.addEventListener('submit', handleFormSubmit);
    closePopupButton.addEventListener('click', closePopup);
}

editProfileButton.addEventListener('click', openEditProfilePopup);