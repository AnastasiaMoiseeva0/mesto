let editProfileButton = document.querySelector('#edit-profile-button');
let modalHost = document.querySelector('#host');

function openEditProfilePopup() {
    let closeModalButton = modalHost.querySelector('#closeButton');

    let formElement = modalHost.querySelector('#formElement');
    let nameInput = modalHost.querySelector('#nameInput');
    let jobInput = modalHost.querySelector('#jobInput');

    function closeModal() {
        formElement.removeEventListener('submit', handleFormSubmit);

        closeModalButton.removeEventListener('click', closeModal);
        modalHost.innerHTML = '';
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

    modalHost.innerHTML = `
      <div class="modal">
        <div class="modal__close">
          <button id="closeButton" class="button button_transparent button_size-medium">
            <img class="icon icon_close" src="./images/modal-close_icon.svg" alt="Кнопка 'Закрыть окно'">
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
    closeModalButton.addEventListener('click', closeModal);
}

editProfileButton.addEventListener('click', openEditProfilePopup);